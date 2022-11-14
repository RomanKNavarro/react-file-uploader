import React, { Fragment, useState } from 'react';    
// what is react fragment? 
/* React Fragment is a React component introduced in React v16. 2.0. This component lets you group (or rather, 
  “parent”) a list of React components without adding an extra node to the DOM.*/
import Message from './Message';    // import our message fom Message.js
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  /* why is this an empty object? look in server.js:
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    this object is what is sent if 200 (success)
  */
  const [message, setMessage] = useState('');   // for the alert
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);         
    // "e.target.files" is an array we can't see. Since we accept only one file as input, we get the first value 
    setFilename(e.target.files[0].name);
    // this array consists of objects that have a "name" property
  };

  const onSubmit = async e => {
    e.preventDefault();             // "so the form doesn't submit"
    const formData = new FormData();    
    // in order to send a file, we need to add it to our "form data" ^
    formData.append('file', file);  
    // 'file' (in quotes pertains to the 'file' var in our backend (in server.js). file is the state var ^

    try {
      // since we added a proxy in client's package.json, we don't have to specify localhost:5000
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;    // pull this data out of res.data, as an obj (see above)

      setUploadedFile({ fileName, filePath });

      // ALL THE ALERT STUFF HERE
      setMessage('File Uploaded');    
    } catch (err) {
      if (err.response.status === 500) {  // error
        setMessage('There was a problem with the server');  
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0)
    }
  };

  return (
    <Fragment>
      {/* MESSAGE STUFF. SUPER COOL LOOKING */}
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {/* if uploadedFile isn't an empty object: show file. Otherwise, don't. */}
      {uploadedFile ? ( 
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;

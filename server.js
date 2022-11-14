const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {   // if there is no req.files given...
    return res.status(400).json({ msg: 'No file uploaded' });   
  }

  const file = req.files.file;

  /* otherwise, move that file to a folder (__dirname refers to current dir; in our case it NEEDS to be the root :)')
    file.mv() takes a callback error function
  */
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    // if there's no issues...send a 200 response (positive). Data sent includes the filename and the file path.
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => console.log('Server Started...'));

// we use "npm run server" to run the backend
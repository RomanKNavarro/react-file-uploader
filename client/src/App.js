import React from 'react';
import FileUpload from './components/FileUpload'; // import the FileUpload component
import './App.css';

const App = () => (
  <div className='container mt-4'>    
  {/* classname changed from "App" to container (to push everything in the middle) mt-4 (to move ev/thing down*/}
    <h4 className='display-4 text-center mb-4'>
      <i className='fab fa-react' /> React File Upload  
      {/* font awsome icon used here */}
    </h4>

    <FileUpload />
  </div>
);

export default App;

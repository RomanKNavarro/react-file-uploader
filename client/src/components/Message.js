import React from 'react';
import PropTypes from 'prop-types'; // this is already part of js. No need for npm i.

const Message = ({ msg }) => {
  return (
    <div className='alert alert-info alert-dismissible fade show' role='alert'>
      {msg}     
      {/* ^ replace dummy text with our msg prop */}
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;

import React, { useState, useEffect } from 'react';
import '../App.css';

function AddData({ addItem, editItem }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setDob(editItem.dob);
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && dob) {
      addItem({ name, dob });
      setName('');
      setDob('');
    }
  };

  return (
    <div className='adddata'>
      <h2 className='title'>{editItem ? 'Edit Birthday' : 'Add Birthday'}</h2>
      <form onSubmit={handleSubmit}>
        <label className='form-content'><h3>Enter Name:</h3></label>
        <input
          className='form-content'
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className='form-content'><h3>Enter Date of Birth:</h3></label>
        <input
          className='form-content'
          type='date'
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        <button className='form-contents' type='submit'>
          {editItem ? 'Update Birthday' : 'Add Birthday Details'}
        </button>
      </form>
    </div>
  );
}

export default AddData;

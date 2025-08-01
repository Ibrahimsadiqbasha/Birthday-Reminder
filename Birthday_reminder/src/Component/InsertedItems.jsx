import React, { useEffect } from 'react';
import '../App.css';

function InsertedItems({ value, deletePerson, setItemToEdit }) {
  const { name, dob, _id } = value;

  const handleDelete = () => {
    deletePerson(_id);
  };

  const handleEdit = () => {
    setItemToEdit(value);
  };

  const isTodayBirthday = () => {
    const today = new Date();
    const birthDate = new Date(dob);
    return (
      today.getDate() === birthDate.getDate() &&
      today.getMonth() === birthDate.getMonth()
    );
  };

  useEffect(() => {
    if (isTodayBirthday()) {
      alert(`🎉 Reminder: Today is ${name}'s Birthday!`);
    }
  }, []); // Runs once when this component renders

  return (
    <div
      className="person-item"
      style={{
        backgroundColor: isTodayBirthday() ? '#fdf0d5' : 'white'
      }}
    >
      <div className="person-name"><strong>Name:</strong> {name}</div>
      <div className="person-dob"><strong>DOB:</strong> {dob}</div>

      {isTodayBirthday() && (
        <div style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
          🎉 It's {name}'s birthday today!
        </div>
      )}

      <div className="button-overlay">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
}

export default InsertedItems;

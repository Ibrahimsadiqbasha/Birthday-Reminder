import React, { useState, useEffect } from 'react';
import AddData from './AddData';
import History from './History';

function WholeContainer() {
  const [birthday, setBirthday] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchBirthday = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/birthdays');
      const data = await response.json();
      setBirthday(data);
    } catch (error) {
      console.error('Failed to fetch', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBirthday();
  }, []);

  const addBirthday = async ({ name, dob }) => {
  if (editItem) {
    // Editing existing birthday
    try {
      const response = await fetch(`http://localhost:3000/birthdays/${editItem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dob })
      });
      if (response.ok) {
        await fetchBirthday(); // ⬅ fetch fresh data from server
        setEditItem(null);
      }
    } catch (error) {
      console.error('Error updating data', error);
    }
  } else {
    // Adding new birthday
    try {
      const response = await fetch('http://localhost:3000/birthdays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, dob })
      });
      if (response.ok) {
        const newItem = await response.json();
        setBirthday(prev => [...prev, newItem]);
      }
    } catch (error) {
      console.error('Error adding data', error);
    }
  }
};


  const deleteBirthday = async (_id) => {
    try {
      const response = await fetch(`http://localhost:3000/birthdays/${_id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setBirthday(prev => prev.filter(item => item._id !== _id));
      }
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const setItemToEdit = (item) => {
    setEditItem(item);
  };

  return (
    <div>
      <AddData addItem={addBirthday} editItem={editItem} />
      <History
        dataList={birthday}
        deleteItem={deleteBirthday}
        setItemToEdit={setItemToEdit}
      />
    </div>
  );
}

export default WholeContainer;

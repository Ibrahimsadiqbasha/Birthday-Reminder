import React from 'react';
import InsertedItems from './InsertedItems';
import '../App.css';

function History({ dataList, deleteItem, setItemToEdit }) {
  // Filter today's birthdays
  const today = new Date();
  const todayBirthdays = dataList.filter(item => {
    const dob = new Date(item.dob);
    return (
      dob.getDate() === today.getDate() &&
      dob.getMonth() === today.getMonth()
    );
  });

  // Others (not today)
  const otherBirthdays = dataList.filter(item => {
    const dob = new Date(item.dob);
    return (
      dob.getDate() !== today.getDate() ||
      dob.getMonth() !== today.getMonth()
    );
  });

  return (
    <div className='history-box'>
      <h2>Birthday Details</h2>

      {dataList.length === 0 ? (
        <p>No birthday details added yet.</p>
      ) : (
        <>
          {todayBirthdays.length > 0 && (
            <>
              <h3 style={{ color: 'green' }}>🎉 Today's Birthdays</h3>
              {todayBirthdays.map(item => (
                <InsertedItems
                  key={item._id}
                  value={item}
                  deletePerson={deleteItem}
                  setItemToEdit={setItemToEdit}
                />
              ))}
            </>
          )}

          {otherBirthdays.length > 0 && (
            <>
              <h3>Other Birthdays</h3>
              {otherBirthdays.map(item => (
                <InsertedItems
                  key={item._id}
                  value={item}
                  deletePerson={deleteItem}
                  setItemToEdit={setItemToEdit}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default History;

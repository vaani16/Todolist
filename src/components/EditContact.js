import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const EditContact = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the contact with the specified id in the contacts array
  const selectedContact = props.contacts.find((contact) => contact.id === id)||null;

  useEffect(() => {
    // If the contact is not found, display an error message
    if (!selectedContact) {
      console.log('Contact not found.');
      return;
    }

    // Populate the input fields with the contact data
    setName(selectedContact.name);
    setEmail(selectedContact.email);
    setDate(selectedContact.date);
  }, [selectedContact]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const update = (e) => {
    e.preventDefault();
    if (name === '' || email === '') {
      alert('All the fields are mandatory!!');
      return;
    }

    // Call the updateContactHandler with the updated data
    props.updateContactHandler({ id, name, email });

    // Clear the input fields and redirect back to the contact list after updating
    setName('');
    setEmail('');
    setDate('');
    navigate('/');
  };

  if (!selectedContact) {
    return <div>Error: data not found.</div>; // Handle the case when contact data is not available
  }

  return (
    <div className="ui main ">
      <br />
      <h2 style={{ fontSize: '20px'}}>Edit Task</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field mx-3 my-3">
          <label style={{ fontSize: '15px' }}>Title</label>
          <input
            type="text"
            name="name"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field mx-3 my-3">
          <label style={{ fontSize: '15px' }}>Details</label>
          <input
            type="text"
            name="email"
            placeholder="Details"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field mx-3 my-3">
          <label style={{ fontSize: '15px' }}>Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button className="ui button brown mx-3 my-3">Update</button>
      </form>
    </div>
  );
};

export default EditContact;

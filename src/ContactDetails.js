// import React from 'react'
// //import user from '/images/user.jpg'
// import contact from './images/contact.jpg'
// //import { Link } from 'react-router-dom';

// const ContactDetails=(props)=>{
//     //console.log(props)
//     const {name,email}=props.location.state.contact
//     return (
//       <div className="main">
//         <div className="ui card centered">
//             <div className="image">
//             <img src={contact} alt="user" />
//             </div>
//             <div className="content">
//                 <div className="header">{name}</div>
//                 <div className="description">{email}</div>
//             </div>
//         </div>
//       </div>
//     )
// }

// export default ContactDetails

import React from 'react';
import contact from './images/contact.jpg';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ContactDetails = ({ contacts }) => {
  // Use useParams to get the id from the URL
  const { id } = useParams();

  // Find the contact with the specified id in the contacts array
  const selectedContact = contacts.find(contact => contact.id === id);

  // If the contact is not found, display an error message
  if (!selectedContact) {
    return <div>Contact not found.</div>;
  }

  // Otherwise, display the contact details
  const { name, email,date } = selectedContact;

  return (
    <div className="main">
      <br/>
      <br/>
      <div className="ui card centered mx-3 my-3">
        <div className="image mx-3 my-3">
          <img src={contact} alt="user" />
        </div>
        <div className="content mx-3 my-3">
          <div className="header">{name}</div>
          <div className="meta" >
          Date: {date}
          </div>
          <div className="description" style={{
              maxWidth: '300px',
              maxHeight: '200px',
              overflow: 'auto',
              wordWrap: 'break-word', // Add word-wrap property
              whiteSpace: 'pre-line', // Preserve newlines and spaces
            }} >{email}</div>
          
        </div>
      </div>
      <div className="center-div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/">
            <button className="ui button brown center"> Task List</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetails;

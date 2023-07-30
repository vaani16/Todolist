import React ,{useRef}from 'react'
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom';

const ContactList = (props) => {
  console.log(props);
  const inputEl=useRef("");
  const deleteContactHandler=(id)=>{
    props.getContactId(id);
  }

  const renderContactList = props.contacts.map((contact) => {
    return (
     <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}/>
    );
  });

  const getsearchTerm=()=>{
    props.searchKeyword(inputEl.current.value)
  };

  return(
    <div className="main" >
      <br/>
      <h2 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Task List
        <Link to="/add">
        <button className="ui button brown right">Add Task</button>
        </Link>
      </h2>
      <div className="ui serach">
        <div className="ui icon input">
          <input ref={inputEl} type="text" placeholder='Search Tasks' className='prompt' value={props.term} onChange={getsearchTerm}/>
        <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList.length >0? renderContactList:"No Task Available"}</div>
    </div>
  )
  // return <div className="ui celled list">{renderContactList}</div>;
};

export default ContactList
// element, we use flexbox to align the "Contact List" header and the "Add Contact" button. justifyContent: 'space-between' ensures that the elements are placed at the beginning and the end of the available space.
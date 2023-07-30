import React from 'react'
import contact from '../images/contact.png'
import { Link } from 'react-router-dom';

const ContactCard = (props) => {
    const {id,name,date}=props.contact;
  return (
    <div className="item" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={contact} alt="user" className="ui avatar image" />
      <div className="content" style={{ flex: '1' }}>
        <Link to={{pathname:`/contact/${id}`,state:{contact:props.contact}}}>
        <div className="header">
          {name}
        </div>
        
        <div>Date: {date}</div>
        </Link>
      </div>
      <i className="trash alternate outline icon" style={{color:"red" , marginLeft:"auto", marginTop:"7px"}} onClick={()=> props.clickHandler(id)}></i>
      <Link to={{pathname:`/edit/${id}`,state:{contact:props.contact}}}>
      <i className="edit alternate outline icon" style={{color:"blue" , marginLeft:"10px", marginTop:"7px"}} ></i>
      </Link>
      </div>
  )
}

// "flex: 1"  --> to allow it to take up the available space in the flex container. This pushes the trash icon to the right end of the item div.


export default ContactCard

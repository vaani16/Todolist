// import React from 'react'
// //import { withRouter } from 'react-router-dom';

// class AddContact extends React.Component{
//     state={
//         name:"",
//         email:""
//     }
    
//     add=(e)=>{
//         e.preventDefault();
//         if(this.state.name===""||this.state.email===""){
//             alert("All the fields are mandatory!!")
//             return
//         }
//         this.props.addContactHandler(this.state);
//         this.setState({name:"",email:""})
//         this.props.history.push("/")
//     }
//     render() {
//         return (
//             <div className="ui main ">
//                 <br />
//                 <h2>Add Contact</h2>
//                 <form className="ui form" onSubmit={this.add}>
//                     <div className="field mx-3 my-3">
//                         <label>Name</label>
//                         <input type="text" name="name" placeholder='Name' value={this.state.name} onChange={(e)=> this.setState({name:e.target.value})}/>
//                     </div>
//                     <div className="field mx-3 my-3">
//                         <label>Email</label>
//                         <input type="text" name="email" placeholder='Email' value={this.state.email} onChange={(e)=> this.setState({email:e.target.value})}/>
//                     </div>
//                     <button className="ui button blue mx-3 my-3">Add</button>
//                 </form>
//             </div>
//         )
//     }
// }

// export default AddContact

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function AddContact({ addContactHandler }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (name === '' || email === '') {
      alert('All the fields are mandatory!!');
      return;
    }
    addContactHandler({ id: uuidv4(), name, email,date});
    setName('');
    setEmail('');
    setDate('');
    navigate('/');
  };

  return (
    <div className="ui main">
      <br />
      <h2 style={{ fontSize: '20px' }}>Add To-Do</h2>
      <form className="ui form" onSubmit={add}>
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
          <label style={{ fontSize: '15px' }}>Detail</label>
          <textarea
            type="text"
            name="email"
            placeholder="Details"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              style={{ resize: 'vertical', minHeight: '100px', maxHeight: '200px' }}
          />
        </div>
        <div className="field mx-3 my-3"> {/* New div for the date input */}
          <label style={{ fontSize: '15px' }}>Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        
        <button className="ui button brown mx-3 my-3">Add</button>
        <Link to='/'>
        <button className="ui button brown mx-3 my-3"> Task List</button>
        </Link>
      </form>
    </div>
  );
}

export default AddContact;


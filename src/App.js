
import './App.css';
import React ,{useState,useEffect} from 'react';
import {v4 as uuidv4} from "uuid";
import Header from './components/Header';
import AddContact from './components/AddContact';
import ContactList from './components/ContactList';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import ContactDetails from './ContactDetails';
//import contacts from './components/api/contacts';
import api from './components/api/contacts'
import EditContact from './components/EditContact';


function App() {
  
  //const LOCAL_STORAGE_KEY='contacts';

   //RetrieveContacts
   const retrieveContacts= async()=>{
    const response=await api.get("/contacts");
    return response.data;
  }

  const[contacts,setContacts]=useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const [searchResults,setSearchResults]=useState("");
  const [searchDate, setSearchDate] = useState("");
  // useState(()=>{ 
  //   // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   // return retrieveContacts || []
  //   const getAllContacts = async () =>{
  //     const allContacts= await retrieveContacts();
  //     return allContacts || []
  //   }
  //   getAllContacts();
  // });
  
  
  const addContactHandler= async(contact)=>{
    console.log(contact)
    const request={
      id : uuidv4(),
      ...contact }
      const response=await api.post("/contacts",request)
    setContacts([...contacts,response.data]);
  };

  const updateContactHandler= async(contact)=>{
    const response =await api.put(`/contacts/${contact.id}`,contact)
      const {id}=response.data;
    setContacts(contacts.map(contact=>{
      return contact.id===id ? {...response.data} :contact
    }))
  }

 const searchHandler=(searchTerm)=>{
     setSearchTerm(searchTerm)
     setSearchDate(searchDate);
     if(searchTerm!==""||searchDate !== ""){
      const newContactList=contacts.filter((contact)=>{
       const nameMatch= Object.values(contact).join("").toLowerCase().includes(searchTerm.toLowerCase());
       const dateMatch =
       searchDate === "" || contact.date === searchDate; // Check if the date matches the search date or searchDate is empty

     return nameMatch && dateMatch;
      })
      setSearchResults(newContactList)
     }
     else{
      setSearchResults(contacts)
     }
 }
  const removeContactHandler= async(id)=>{
    await api.delete(`/contacts/${id}`)
    const newContactList=contacts.filter((contact)=>{return contact.id !==id ;})
    setContacts(newContactList);
  }

  useEffect(()=> {
    const getAllContacts = async () =>{
          const allContacts= await retrieveContacts();
          setContacts( allContacts || [])
        }
     getAllContacts();
   },[]);


  useEffect(()=> {
   //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
    //console.log("storing in local")
  },[contacts]);

  
  
  return (
    <div className="ui container">
      <Router>
      <Header />
        <Routes>
        <Route path="/" element={ <ContactList contacts={searchTerm.length<1? contacts:searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} searchDate={searchDate}/>} />
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />}/>
          <Route path="/contact/:id" element={<ContactDetails contacts={contacts}/>}/>
          <Route path="/edit/:id" element={<EditContact contacts={contacts} updateContactHandler={updateContactHandler} />}/>
        </Routes>
      </Router>
      
      {/* <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
    </div>
  )
}



export default App




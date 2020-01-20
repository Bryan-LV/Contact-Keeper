import React,  {useState, useContext, useEffect} from 'react';
import {contactContext} from '../../context/contact/contactContext';

export default function ContactForm() {
  const [contact, setContact] = useState({});
  const contactState = useContext(contactContext);
  const current  = contactState.contactState.current;
  const { addContact, clearContact, updateContact } = useContext(contactContext);
  const {name, email, phone, type} = contact;

  useEffect(() => {
    if( current != null){
      setContact(current);
    } else{
      setContact({ name:'', email:'', phone:'', type:'personal' })
    }
  }, [contactContext, current]);


  const handleFormInput = (e) => {
    setContact({...contact, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(current === null){
      addContact(contact);
    } else{
      updateContact(contact);
    }

    setContact({ name:'', email:'', phone:'', type:'personal' });
  }

  const clearContactForm = () => {
    clearContact();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">{ current ? 'Edit Contact': 'Add Contact' }</h2>
      <input type="text" name="name" value={name} onChange={handleFormInput} placeholder="name"/>
      <input type="text" name="email" value={email} onChange={handleFormInput} placeholder="email"/>
      <input type="text" name="phone" value={phone} onChange={handleFormInput} placeholder="phone"/>
      <h5>Contact Type</h5>
      <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={handleFormInput} /> {` Personal `}
      <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={handleFormInput} /> {` Professional`}
      <div>
        {/* <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" /> */}
         <button className="btn btn-primary btn-block">{current ? 'Update Contact' : 'Add Contact'} </button> 
        {current && <button className="btn btn-block" onClick={clearContactForm}>Clear</button>}
      </div>
    </form>
  )
}

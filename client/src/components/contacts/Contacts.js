import React, {useContext, useEffect} from 'react'
import {contactContext} from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

export default function Contacts() {
  const {contactState, getContacts} = useContext(contactContext);
  const {filtered, contacts, loading} = contactState;

  const contactList = () => {
    let list;
    if(contactState.filtered !== null){
      list = filtered.map(item => {
        return <ContactItem name={item.name} id={item._id} key={item._id} phone={item.phone} email={item.email} type={item.type}/>
      })
    } else {
      list = contacts.map(item => {
        return <ContactItem name={item.name} id={item._id} key={item._id} phone={item.phone} email={item.email} type={item.type}/>
      })
    }
    return list;
  }

  useEffect(() => {
    console.log('Contacts.js Render');
    // get contacts from db
    getContacts();
  }, [])

  if(contacts.length === 0 && !loading) {
    return <h4 className="m-3">Please Enter Contacts</h4>
  }

  return (
    <div>
        {contactList()}
    </div>
  )
}

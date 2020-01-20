import React, {createContext, useReducer} from 'react'
import contactReducer from './contactReducer';
import axios from 'axios'

export const contactContext = createContext();

const initalState = {
  contacts: [],
  current: null,
  filtered: null,
  error: null,
  loading: true
}

export default function ContactContext(props) {
  const [contactState, contactDispatch] = useReducer(contactReducer, initalState)

  // Get Contacts
  const getContacts = async () => {

    try {
      const res = await axios.get('/api/contacts');
      if(res.data.length > 0){
        contactDispatch({type: 'GET_CONTACTS', payload: res.data})
      }
    } catch (error) {
      contactDispatch({type:'CONTACT_ERROR', payload: error.response.data.msg})
    }
  }

  // Add Contact
  const addContact =  async (contact) => {
    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/contacts', contact, config);
      contactDispatch({type:'ADD_CONTACT', payload: res.data});
    } catch (error) {
      console.log(error);
      contactDispatch({type: 'CONTACT_ERROR', payload: error.response.msg})
    }
  }

  // Delete Contact
  const deleteContact = async (contactID) => {
    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }
    
    try {
      await axios.delete(`/api/contacts/${contactID}`, config)
      contactDispatch({type:'DELETE_CONTACT', payload: contactID});
    } catch (error) {
      contactDispatch({type:'CONTACT_ERROR', payload: error.response.msg})
    }
    // pass id to dispatch, id should filter through state and return only id's not matching contactID
  }

  // Edit Contact
  const editContact = (contact) => contactDispatch({type:'EDIT_CONTACT', payload: contact});

  // Reset Edit Contact State
  const clearContact = () => contactDispatch({type:'CLEAR_CURRENT'});

  // Update Contact
  const updateContact = async (contact) => {

    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }

    try {
      await axios.put(`/api/contacts/${contact.id}`, contact, config)
      contactDispatch({type:'UPDATE_CONTACT', payload: contact})
    } catch (error) {
      console.log('Put contact update did not work');
      contactDispatch({type: 'CONTACT_ERROR', payload: error.response.msg});
    }
    
  }

  // Filter Contacts
  const filterContacts = (text) => contactDispatch({type:'FILTER_CONTACTS', payload:text});

  // Clear Filtered Contacts
  const clearFilter = (text) => contactDispatch({type:'CLEAR_FILTER'});

  return (
    <contactContext.Provider value={
        { contactState,
          addContact,
          deleteContact,
          editContact,
          clearContact,
          updateContact,
          filterContacts,
          clearFilter,
          getContacts,
        }
      }>
      {props.children}
    </contactContext.Provider>
  )
}

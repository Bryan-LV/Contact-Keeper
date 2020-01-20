const contactReducer = (state, action) => {
  if(action.type === 'GET_CONTACTS'){
      return {...state, contacts: [...action.payload], loading: false };
  }

  if(action.type === 'ADD_CONTACT'){
      return {...state, contacts: [...state.contacts, action.payload], loading: false };
  }

  if(action.type === 'DELETE_CONTACT'){
    const filteredContacts = state.contacts.filter(contact => contact._id !== action.payload)
    return {...state, contacts: filteredContacts};
  }

  if(action.type === 'EDIT_CONTACT'){
    return {...state, current: action.payload};
  }

  if(action.type ==='CLEAR_CURRENT'){
    return {...state, current: null};
  }

  if(action.type === 'UPDATE_CONTACT'){
    // map through contacts array, if id's match return the payload, else return the contact as is.
    return {...state, contacts: state.contacts.map(contact => contact._id === action.payload.id ? action.payload : contact) }
  }

  if(action.type === 'FILTER_CONTACTS'){
    const regEx = new RegExp(`${action.payload}`, 'gi');
    const filteredItems = state.contacts.filter(contact => contact.name.match(regEx) || contact.email.match(regEx) );
    return {...state, filtered: filteredItems};
  }

  if(action.type === 'CLEAR_FILTER'){
    return {...state, filtered: null};
  }

  if(action.type === 'CONTACT_ERROR'){
    return {...state, error: action.payload}
  }
} 

export default contactReducer;
import React, {useContext, useState} from 'react';
import {contactContext} from '../../context/contact/contactContext';

export default function ContactFilter(props) {
  const ContactContext = useContext(contactContext);
  const {clearFilter, filterContacts} = ContactContext;
  const [text, setText] = useState('');

  const handleInput = (e) => {
    setText(e.target.value);
    filterContacts(e.target.value);
  }

  const handleClearFilter = (evt) => {
    evt.preventDefault();
    clearFilter();
    setText('');
  }

  return (
    <form>
      <input type="text" value={text} placeholder="Filter Contacts..." onChange={handleInput}/>
      <button onClick={handleClearFilter}>Clear Filter</button>
    </form>
  )
}

import React, { useContext} from 'react'
import PropTypes from 'prop-types';
import {contactContext} from '../../context/contact/contactContext';

 function ContactItem({email, name, id, phone, type}) {
  const contact = {email, name, id, phone, type};

  const {deleteContact, editContact, clearContact} = useContext(contactContext);

  const checkType = type.toLowerCase() === 'professional' ? 'badge-success' : 'badge-primary';
  const capType = type.charAt(0).toUpperCase() + type.slice(1);

  const isEmail = email ? <li><i className="fas fa-envelope-open"/>{` ${email}`}</li> : '';
  const isPhone = phone ? <li><i className="fas fa-phone"/>{` ${phone}`}</li> : '';

  const handleDelete = () => {
    deleteContact(id);
    clearContact();
  }

  console.log(name, 'has been rendered');

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {`${name} `}
        <span style={{float: 'right'}} className={`badge ${checkType}`}>{`${capType}`}</span>
      </h3>
      <ul className="list">
        {isEmail}
        {isPhone}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={() => editContact(contact)}>Edit</button> 
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
      </p>
    </div>
  )
}

ContactItem.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string
}

export default React.memo(ContactItem);

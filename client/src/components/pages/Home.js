import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactForm'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/AuthContext'
import setAuthToken from '../../utils/setAuthToken'

export default function Home(props) {
  
  const authContext = useContext(AuthContext);
  
  useEffect(() => {
    // checks if localstorage token exists and loads user if true
    if(localStorage.token){
      setAuthToken(localStorage.token);
      authContext.loadUser()
    } else{
      props.history.push('/login');
    }
  }, [])

  return (
    <div className="grid-2 m-1">
        <div>
          <ContactForm/>
        </div>
        <div>
          <div className="">
            <ContactFilter/>
          </div>
          <Contacts/>
        </div>
    </div>
  )
}

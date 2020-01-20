import React, {useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'

export default function Register(props) {
  const [user, setUser] = useState({
    name : '',
    email : '',
    password : '',
    password2 : ''
  })

  const {setAlert} = useContext(AlertContext);
  const {registerUser, error, clearErrors, isAuthenticated} = useContext(AuthContext);

  useEffect(() => {
    if(isAuthenticated){
      props.history.push('/');
    }

    if(error){
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated])

  const {name, email, password, password2} = user;

  const handleInputChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(name === '' || email === '' || password === ''){
      setAlert('Please Enter All Fields', 'danger');
    } 
    
    else if(password !== password2){
      setAlert('Passwords do not match', 'danger')
    } 
    
    else{
      // if validation is correct then pass register user
      registerUser({name, email, password})
    }
  }

  return (
    <div className="form-container">
      <h1>Account <span className="text-primary">Register</span></h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} name="name" onChange={handleInputChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" value={email} name="email" onChange={handleInputChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="text" value={password} name="password" onChange={handleInputChange} minLength="6" required/>
        </div>
        <div className="form-group">
          <label htmlFor="password2">Re-type Password</label>
          <input type="text" value={password2} name="password2" onChange={handleInputChange} minLength="6" required/>
        </div>
        <button className="btn btn-primary btn-block
        ">Register</button>
      </form>
    </div>
  )
}

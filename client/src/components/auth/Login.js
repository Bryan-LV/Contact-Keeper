import React, {useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'

export default function Login(props) {
  const [user, setUser] = useState({
    email : '',
    password :''
  })

  const {setAlert} = useContext(AlertContext);
  const {clearErrors, loginUser, isAuthenticated, error}= useContext(AuthContext);

  useEffect(() => {
    if(isAuthenticated){
      props.history.push('/');
    }
    
    if(error){
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated])

  const {email, password} = user;

  const handleInputChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.email !== '' || user.password !== ''){
      loginUser(user)
    }
  }

  return (
    <div className="form-container">
      <h1>Account <span className="text-primary">Login</span></h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" value={email} name="email" onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="text" value={password} name="password" onChange={handleInputChange}/>
        </div>
        <button className="btn btn-primary btn-block">Login</button>
      </form>
    </div>
  )
}

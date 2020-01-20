import axios from 'axios';

function setAuthToken (token) {
  // if token is passed in then set token in header under key 'x-auth-token'
  if(token){
    axios.defaults.headers.common['x-auth-token'] = token;
  } 
  
  // if not then delete the 'x-auth-token' that was a default header
  else{
    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default setAuthToken;
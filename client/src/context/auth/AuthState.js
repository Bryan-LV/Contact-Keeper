import React, {useReducer} from 'react'
import AuthContext from '../auth/AuthContext'
import AuthReducer from '../auth/AuthReducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

export default function AuthState(props) {
  const initState = {
    token: localStorage.token,
    isAuthenticated: false,
    error: null,
    loading:true,
    user:{}
  }

  const [state, dispatch] = useReducer(AuthReducer, initState);

  // Load User
  const loadUser = async () => {
    if(localStorage.token){
      // global axios header for jwt
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get('/api/auth');
      dispatch({type:'LOAD_USER', payload:res.data})

    } catch (error) {
      dispatch({type:'AUTH_ERROR', payload: error});
    }
  }

  // Register User
  const registerUser = async (user) => {

    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }

    try {
      const req = await axios.post('/api/users', user, config);
      dispatch({type:'REGISTER_SUCCESS', payload: req.data});
      loadUser()

    } catch (error) {
      dispatch({type:'REGISTER_FAIL', payload: error.response.data.msg})
    } 
  }

  // Login User
  const loginUser = async (user) => {

    const config = {
      headers:{
        'Content-Type': 'application/json'
      }
    }

    try {
      const req = await axios.post('/api/auth', user, config);

      dispatch({type:'LOGIN_SUCCESS', payload: req.data});
      loadUser()

    } catch (error) {
      dispatch({type:'LOGIN_FAIL', payload: error.response.data.msg})
    } 
  }

  // Logout User
  const logoutUser = () => dispatch({type:'LOGOUT_USER'})

  // Clear Errors
  const clearErrors = () => dispatch({type:'CLEAR_ERRORS'})
  return (
    <AuthContext.Provider value={{
      token: state.token,
      loading: state.loading,
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      error: state.error,
      registerUser,
      loginUser,
      clearErrors,
      loadUser,
      logoutUser
    }
    }>
      {props.children}
    </AuthContext.Provider>
  )
}

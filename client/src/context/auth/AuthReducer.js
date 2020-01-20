export default function(state, action){
  const {type, payload} = action;

  if(type === 'LOAD_USER'){
    return {...state, isAuthenticated:true, loading:false, user: payload}
  }

  if(type ==='REGISTER_SUCCESS'|| type === 'LOGIN_SUCCESS'){
    localStorage.setItem('token', payload.token)
    return {...state, isAuthenticated: true, ...payload, loading:false}
  }

  if(type === 'LOGOUT_USER'){
    localStorage.removeItem('token');
    return {...state, isAuthenticated:false, loading:true, user: {}, token: null}
  }

  if(type ==='REGISTER_FAIL' || type === 'LOGIN_FAIL'){
    localStorage.removeItem('token');
    return {...state, 
      error: payload,
      isAuthenticated: false,
      loading:true,
      user:{}}
  }

  if(type === 'CLEAR_ERRORS'){
    return {...state, error: null}
  }
}
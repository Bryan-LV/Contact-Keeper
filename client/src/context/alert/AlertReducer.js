export default function (state, action) {
  const {type, payload} = action;

  if(type === 'SET_ALERT'){
    return [...state, action.payload];
  }
  if(type ==='REMOVE_ALERT'){
    return state.filter(alert => alert.id !== payload)
  }
}
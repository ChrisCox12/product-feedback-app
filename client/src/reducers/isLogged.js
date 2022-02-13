//reducer
function logReducer(state = false, action) {
    switch (action.type) {
      case 'SIGN_IN':
        return !state;
        //break;
      default:
        return state;
        //break;
    }
}

export default logReducer;
const initialState = {
    username: '',
    name: '',
    image: '',
    userID: ''
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            const payload = action.payload;
            return {
                username: payload.username,
                name: payload.name,
                image: payload.image,
                userID: payload.userID
            };
            //break;
        default:
            return state;
    }
}

export default userReducer;
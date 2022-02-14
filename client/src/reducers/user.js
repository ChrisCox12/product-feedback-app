const initialState = {
    username: '',
    name: '',
    image: '',
    userID: '',
    upvotedPosts: []
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            const payload = action.payload;
            return {
                ...initialState,
                username: payload.username,
                name: payload.name,
                image: payload.image,
                userID: payload._id,
                upvotedPosts: payload.upvotedPosts
            };
        case 'ADD_UPVOTED_POST':
            return {
                ...state,
                upvotedPosts: [...state.upvotedPosts, action.payload.postID]
            }
        case 'REMOVE_UPVOTED_POST':
            return {
                ...state,
                upvotedPosts: state.upvotedPosts.filter(id => id !== action.payload.postID)
            }
            //break;
        default:
            return state;
    }
}

export default userReducer;
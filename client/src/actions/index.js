export function signIn() {
    return {
        type: 'SIGN_IN'
    }
}

export function setUser({ username, name, image, _id, upvotedPosts }) {
    return {
        type: 'SET_USER',
        payload: {
            username, 
            name,
            image, 
            _id,
            upvotedPosts
        }
    }
}

export function addUpvotedPost(postID) {
    return {
        type: 'ADD_UPVOTED_POST',
        payload: {
            postID: postID
        }
    }
}

export function removeUpvotedPost(postID) {
    return {
        type: 'REMOVE_UPVOTED_POST',
        payload: {
            postID: postID
        }
    }
}
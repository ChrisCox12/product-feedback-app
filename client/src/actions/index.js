export function signIn() {
    return {
        type: 'SIGN_IN'
    }
}

export function setUser({ username, name, image, userID }) {
    return {
        type: 'SET_USER',
        payload: {
            username, 
            name,
            image, 
            userID
        }
    }
}
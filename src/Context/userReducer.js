
const userReducer = (state, action) => {
    
    console.log ('USER_REDUCER')
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload
            }
        case 'LOGOUT':
            console.log ('LOGOUT')
            return {
                ...state,
                token: null
            }

        default:
            return state
    }
}

export default userReducer
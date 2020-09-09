const initialState = {
    user: {},
    isAuthenticated: false,
    allPosts: [],
    usersPost: []
}



const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERS_DATA":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case "DELETE_USERS_DATA":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: false
            }
        case "ALL_POSTS":
            return {
                ...state,
                allPosts: action.payload
            }
        case "USERS_POST":
            return {
                ...state,
                usersPost: action.payload
            }
        default:
          return state
    }
}

export default userReducer
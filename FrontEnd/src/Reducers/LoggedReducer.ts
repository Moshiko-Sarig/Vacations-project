import UserModel from "../Models/User";

function LoggedReducer(state = { isLogged: false, userInfo: {} }, action: { type: string, userInfo: UserModel }) {
    switch (action.type) {
        case "Log-In":
            return { isLogged: true, userInfo: action.userInfo }
        case "Log-Out":
            return { isLogged: false, userInfo: {} }
        default:
            return(state)
}
}

export default LoggedReducer;
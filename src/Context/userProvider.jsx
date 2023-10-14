/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { UserContext } from "./userContext";
import userReducer from "./userReducer";

console.log ('USER_PROVIDER')
const funcionInicializadoraDelReducer = () => {
    const tokenLS = localStorage.getItem('token')
    const token = JSON.parse (tokenLS)
    return {token}
}


export const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer (userReducer, null, funcionInicializadoraDelReducer)

    return (
        <UserContext.Provider value={[state, dispatch]}>
            {children}
        </UserContext.Provider>
    )
}
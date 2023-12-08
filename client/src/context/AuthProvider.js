import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState((localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))) || {});

    const updateAuth = (data) => {
        setAuth(data)

        if (data['token']) {
            delete data['token']
        }

        localStorage.setItem('user', JSON.stringify(data))
    }

    return (
        <AuthContext.Provider value={{ auth, updateAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
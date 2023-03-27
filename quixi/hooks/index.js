import {createContext, useContext, useState, useRef, useEffect} from 'react'

export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}) => {
    const [userId, setUserId] = useState(null)

    return (
        <AuthContext.Provider value={{userId, setUserId}}>
            {children}
        </AuthContext.Provider>
    )
}



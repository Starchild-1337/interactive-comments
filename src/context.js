import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext()

export const AppProvider = ({children}) => {
  const [user, setUser] = useState({
    userId: null,
    token: null,
    isAuth: false
  })
  
  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')

    if(!userId || !token) {
      return
    }

    setUser({ userId, token, isAuth: true })
  }, [])

  return <AppContext.Provider value={{
    user,
    setUser
  }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
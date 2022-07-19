import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
  const [values, setValues] = useState({
    name: '',
    password: '',
  });
  const [auth, setAuth] = useState({});

 const login = (user) => {
  setValues({ user });
 }

 const logout = () => {
  setValues({
    name: '',
    password: '',
  })
  localStorage.clear();
  // localStorage.removeItem('Logged-in');
  // localStorage.removeItem('Username');
 }

 return (
  <>
    <AuthContext.Provider value={{ values, login, logout, auth, setAuth }} >
      {children}
    </AuthContext.Provider>
  </>
 )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

import { createContext, useState } from 'react'; 
import { AUTH_BASE_URL } from '../api-config';
import axios from 'axios';

export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {

  const [loginResponse, setLoginResponse] = useState(null);
  const [signupResponse, setsignupResponse] = useState(null);

  const signup = async (user) => {
    let { data } = await axios.post(`${AUTH_BASE_URL}/signup`, user);
    setsignupResponse(data);
  }

  const login = async (user) => {
    let { data } = await axios.post(`${AUTH_BASE_URL}/signin`, user);
    setLoginResponse(data);
  }

  return(
    <AuthContext.Provider value={{signup, login, loginResponse, signupResponse}}>
      {props.children}
    </AuthContext.Provider>
  )
}
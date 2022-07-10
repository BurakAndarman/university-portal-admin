import { useState,createContext,useContext  } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [token, setToken]=useState("orhan");
    const [authority,setAuthority]=useState(null);
    const navigate=useNavigate();
    const location=useLocation();

    const handleLogin = async (userName,password) => {

      const response =await fetch(`http://localhost:5000/user/${userName}/${password}`);

      console.log(response);

      if(!response.ok){
        const message=`An error occurred: ${response.statusText}`
        window.alert(message);
        return;
      }

      const user=await response.json();
      setToken(user.username);
      setAuthority(user.authority);

      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin);

    }
  
    const handleLogout = () => {
      setToken(null);
      setAuthority(null);
    };

    const value={
        token,
        authority,
        onLogin: handleLogin,
        onLogout: handleLogout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

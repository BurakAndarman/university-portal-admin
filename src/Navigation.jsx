import {NavLink} from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Navigation =()=>{
    const {token,onLogout}=useAuth();

    return(
        <nav>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>

          {token && (
                <button type="button" onClick={onLogout}>
                    Log Out
                </button>
          )}
        </nav>
        
    )
}

export default Navigation;
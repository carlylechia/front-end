// import { useAuth } from "../hooks/user-context";
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  // const auth = useAuth();
  const location = useLocation();
  const loggedIn = JSON.parse(localStorage.getItem('Logged-in'));

    if (!loggedIn) return <Navigate to='/login' state={{ path: location.pathname, from: location, }} replace/>
    else {
      return children
    }
  
}

export default PrivateRoute;

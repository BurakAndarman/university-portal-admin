import {Routes,Route} from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import NoMatch from './NoMatch';
import AuthProvider from './AuthProvider';
import ProtectedRoute from './ProtectedRoute';
import Announcement from './Announcement';
import News from './News';
import User from './User';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path="login" element={<Login />}/>
        <Route path="dashboard" element={
                        <ProtectedRoute>
                           <Dashboard/>
                        </ProtectedRoute>
                        }>
            <Route index element={<Announcement/>}/>
            <Route path="announcement" element={<Announcement/>}/>
            <Route path="news" element={<News/>}/>
            <Route path="user" element={<User/>}/>
            <Route path="*" element={<NoMatch/>}/>
        </Route>
        <Route path="*" element={<NoMatch/>}/>
      </Routes>
    </AuthProvider>
  );
}

export default App;

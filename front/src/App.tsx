import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { IAuthContext } from './context/interfaces';


const App = () => {
  const { token, userId, login, logout, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if(!ready){
    return <p>Loading...</p>
  }

  return (
    <AuthContext.Provider value={{
       token, userId, login, logout, isAuthenticated } as IAuthContext}>
      <Router>
        <div>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App

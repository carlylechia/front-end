import React from 'react';
import {BrowserRouter, Routes, Route, } from 'react-router-dom';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { AuthProvider } from './hooks/user-context';
import PrivateRoute from './pages/PrivateRoute';
import SetAvatar from './pages/SetAvatar';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
// import Board from './pages/Board';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/board/:id' element={<Board />} />
          <Route path='/chat' element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
          } />
          <Route path='/avatar' element={
              <PrivateRoute>
                <SetAvatar />
              </PrivateRoute>
          } />
          <Route path='/dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
          } />
          <Route element={NotFound}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

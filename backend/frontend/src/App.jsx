import React from 'react'
import Left from './home/leftside/Left';
import Right from './home/rightside/Right';
import Logout from './home/leftside1/Logout';
import Signup from './components/Signup';
import Login from './components/Login';
import { useAuth } from './context/AuthProvider';
import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";


function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <>

      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Logout />
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
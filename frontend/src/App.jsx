import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth();
  
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div>
        <Routes>
          <Route 
              path="/" 
              element={ authUser ? <Home /> : <Navigate to={"/login"}/>} 
          />
          <Route 
              path="/login" 
              element={authUser ? <Navigate to={"/"}/> : <Login />}
          />
          <Route 
              path="/signup" 
              element={authUser ? <Navigate to={"/"}/> : <Signup />} 
          />
        </Routes>
      </div>
    </>
  );
}

export default App;

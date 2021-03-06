import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import CreateCat from "./Pages/CreateCat";
import EditCat from "./Pages/EditCat";
//import AddPhoto from "./Pages/AddPhoto";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <nav>
      <h1>&#128008; The conCATinator &#128008;</h1>
        <Link to="/"> Home </Link>

        {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>
            <Link to="/createCat"> Add Cat </Link>
            <button onClick={signUserOut}> Log Out</button>
          </>
          
        )}
      </nav>
      
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createCat" element={<CreateCat isAuth={isAuth} />} />
        <Route path="/editCat" element={<EditCat isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;

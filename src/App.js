// import logo from './logo.svg';
import "./App.css";
import { useState } from "react";
import Homepage from "./component/Home/HomePage"
import LoginForm from "./component/loginform/LoginForm";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {isLoggedIn ? (
        <Homepage setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;

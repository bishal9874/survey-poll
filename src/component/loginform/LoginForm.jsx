import React, { useState } from "react";
import "./LoginForm.css";
import Card from "../card/Card";
import { database } from "../../utils/database";
import logo from '../../data.json'

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  var attempt = 0;
  attempt = attemptsLeft - 1;
  const errors = {
    // username: "Invalid username",
    // password: "Invalid password",
    noUsername: "Please enter your username",
    noPassword: "Please enter your password",
    UsernameDatabaseExist: "username does not exist in Database",
    PasswordDatabaseExist: `wrong password,  ${attempt} attempt left `,
    attempted : "you attempted maximum number of submition",
    loginAttemptsExceeded: "Login attempts exceeded. Please try again later.",
  };

  
  const handleSubmit = (e) => {
    // Prevent page from reloading
    e.preventDefault();
  
    if (!username) {
      // Username input is empty
      setErrorMessages({ name: "noUsername", message: errors.noUsername });
      return;
    }
  
    if (!password) {
      // Password input is empty
      setErrorMessages({ name: "noPassword", message: errors.noPassword });
      return;
    }
  
    // Search for user credentials from database
  
    const currentUser = database.find((user) => user.username === username);
  
    if (currentUser) {
      if (currentUser.password !== password) {
        // Wrong password
       
        setAttemptsLeft(attempt);
        setErrorMessages({ name: "password", message: errors.PasswordDatabaseExist });
        console.log(attempt)
        if (attempt === 0) {
          alert(errors.attempted);
          setTimeout(() => window.close(), 1000);
          setErrorMessages({ name: "loginAttempts", message: errors.loginAttemptsExceeded });
        }
      } else {
        // Correct password, log in user
       
        setErrorMessages({});
        setIsLoggedIn(true);
      }
    } else {
      // Username doesn't exist in the database
      setErrorMessages({ name: "username", message: errors.UsernameDatabaseExist });
    }
  };

  // Render error messages
  const renderErrorMsg = (name) =>
    name === errorMessages.name && (
      <p className="error_msg">{errorMessages.message}</p>
    );

  return (
    
    <Card>
     
         <><h1 className="title"> <img className="logo" src={logo.data[0].client_logo} alt="" srcset="" /></h1>
         <p className="subtitle">
          Please log in with refered username and password!
        </p><form onSubmit={handleSubmit}>
            <div className="inputs_container">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              {renderErrorMsg("username")}
              {renderErrorMsg("noUsername")}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              {renderErrorMsg("password")}
              {renderErrorMsg("noPassword")}
            </div>
            <input type="submit" value="Log In" className="login_button" />
          </form></>
         {renderErrorMsg("loginAttempts")}
     
      
    </Card>
  );
};

export default LoginForm;
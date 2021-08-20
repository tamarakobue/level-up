import React, { useState } from "react";

const Register = ({handleLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault() //tries to send a post request
    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
            password_confirmation: passwordConfirmation
        })
    })
    .then(r => r.json())
    .then(user => {
        if (!user.errors) {
          handleLogin(user)
        }
        else {
            setPassword("")
            setPasswordConfirmation("")
            setErrors(user.errors)
        }
        
    })
}


  return (
    <form onSubmit={handleSubmit}>

        <label>Username</label>
        <br/><br/>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>
          
        <br/><br/>

        <label>Password</label>
        <br/><br/>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"/>

        <br/><br/>

        <label>Password Confirmation</label>
        <br/><br/>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"/>

        <br/><br/>

        <button className='button-warning pure-button' type="submit">{isLoading ? "Loading..." : "Register"}</button>

        {errors.map((err) => (
          <h3 key={err}>{err}</h3>
        ))}

    </form>
  );
}

export default Register;
import React, { useState } from "react";

const LoginForm = ({handleLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault() //tries to send a post request
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
    .then(r => r.json())
    .then(user => {
        if (!user.errors) {
          handleLogin(user)
        }
        else {
            setPassword("")
            setErrors(user.errors)
        }
    })
}
  

  return (
    <form className='login-form' onSubmit={handleSubmit}>

        <label>Username: </label>
        <br/><br/>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>
          
          <br/><br/>

        <label>Password: </label>
        <br/><br/>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        <br/><br/>
        <button className='button-warning pure-button' type="submit">{isLoading ? "Loading..." : "Login"}</button>

        {errors.map((err) => (<h3 key={err}>{err}</h3>))}

    </form>
  );
}

export default LoginForm
import { useState } from "react"
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const Login = ({loginUser}) => {
  const [showLogin, setShowLogin] = useState(true)


  
  return (
    <div className='login-container'>
      <div className='logo-form'>Level Up!</div>
      <h4>SIMPLE MATHMATICS</h4>
      {showLogin ? (
        <>
          <LoginForm handleLogin={loginUser} />
          <br />
          <p className='center-p'>
            Don't have an account? &nbsp;
            <button className='button-warning pure-button' onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm handleLogin={loginUser} />
          <br />
          <p>
            Already have an account? &nbsp;
            <button className='button-warning pure-button' onClick={() => setShowLogin(true)}>
              Log In
            </button>
          </p>
        </>
      )}
    </div>
  );
}


export default Login

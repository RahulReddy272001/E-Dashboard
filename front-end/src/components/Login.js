import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const Navigate = useNavigate();



  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      Navigate("/")
    }
  })

  const handleLogin = async () => {

    let result = await fetch('http://localhost:5000/login', {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    result = await result.json();

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));

      Navigate("/")
    } else {
      alert("please provide correct details")
    }

  }



  return (
    <div className='login'>
      <h1>Login</h1>
      <input type="text" className="inputBox" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
      <input type="password" className="inputBox" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter Password' />
      <button onClick={handleLogin} className='appButton' type='button'>Login Up</button>

    </div>
  )
}

export default Login

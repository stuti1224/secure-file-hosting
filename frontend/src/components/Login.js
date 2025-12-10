import axios from "axios";
import { useState } from "react";

function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const n = window.location;

  const doLogin = (e)=> {
    e.preventDefault();
    axios.post("http://localhost:4000/api/auth/login",
      {email:email,password:password})
    .then((res)=>{
      localStorage.setItem("token",res.data.token); alert("ok");
      n.href="/dashboard"
    }).catch((err)=>{
      alert("NO!");
    })
  }

  return (
    <div style={{margin:"100px"}}>
      <h2>LOGIN PAGE</h2>
      <form onSubmit={doLogin}>
        <input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
        <br/><br/>
        <input placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        <br/><br/>
        <button>login</button>
      </form>
      <p onClick={()=>window.location.href="/register"}>register</p>
    </div>
  )
}
export default Login;

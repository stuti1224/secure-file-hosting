import axios from "axios";
import {useState} from "react";

function Register(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [name,setName]=useState("");

  function reg(e){
    e.preventDefault();
    axios.post("http://localhost:4000/api/auth/register",
      {name:name,email:email,password:password})
    .then((r)=>{
      alert("ok reg");
      window.location="/";
    }).catch((er)=>{
      alert("err");
    })
  }

  return(
    <div style={{margin:"100px"}}>
      <h2>REGISTER PAGE</h2>
      <form onSubmit={reg}>
        <input placeholder="name" onChange={(e)=>setName(e.target.value)}/><br/><br/>
        <input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
        <input placeholder="password" onChange={(e)=>setPassword(e.target.value)}/><br/><br/>
        <button>register</button>
      </form>
      <p onClick={()=>window.location="/"}>go to login</p>
    </div>
  )
}
export default Register;

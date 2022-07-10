import { useState } from "react";
import { useAuth } from "./AuthProvider";
import universityLogo from "./universityLogo.png";

const Login=()=>{
    const {onLogin}=useAuth();
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");

    return (
        <>
        <div className="d-flex justify-content-center align-items-center" style={{height:"100vh",backgroundColor:"#8d6c1d"}}>
        <div className="container mt-5" style={{width:"24rem",backgroundColor:"#050d21", padding:"2em", borderRadius:"1em"}}>
         <div>
          <img
                 className="img-fluid mb-4"
                 src={universityLogo}
                 alt="logo"
          />
          <h1 style={{color:"#ca9a29"}}>Üniversite Portalı</h1>
          <form className="mt-4">
            <div className="mb-3">
                <label for="username" className="form-label" style={{color:"#ca9a29"}}>Kullanıcı Adı</label>
                <input 
                   type="text" 
                   value={userName} 
                   onChange={(e)=>{
                        setUserName(e.target.value);
                   }} 
                   className="form-control"
                   id="username"/>
            </div>
            <div className="mb-3">
                <label for="password" className="form-label" style={{color:"#ca9a29"}}>Şifre</label>
                <input 
                   type="password"
                   value={password}
                   onChange={(e)=>{
                        setPassword(e.target.value);
                   }}
                   className="form-control"
                   id="password"/>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <button className="btn btn-primary" style={{width:"50%",backgroundColor:"#ca9a29",border:"none", color:"#050d21"}}
                    type="button"
                    onClick={()=>onLogin(userName,password)}>
                    Giriş
                </button>
            </div>
          </form>
         </div>
        </div>
        </div>        
        </>
    )
}

export default Login;
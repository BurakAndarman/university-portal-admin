import { useState } from "react";


const UserEdit=({handleCompleteClick,handleReturnClick,user})=>{

    const [editedUserName,setEditedUserName]=useState(user.username);
    const [editedPassword,setEditedPassword]=useState(user.password);
    const [editedAuthority,setEditedAuthority]=useState("Admin");


    return(
        <form className="mt-5">
              <div className="mb-3">
                <label for="usernameInput" className="form-label" style={{color:"#11253e"}}>Kullanıcı Adı</label>
                <input type="text"
                    className="form-control"
                    style={{width:"30em"}}
                    id="usernameInput"
                    value={editedUserName}
                    onChange={(e)=>{
                        setEditedUserName(e.target.value);
                    }}/>
              </div>
              <div className="mb-3">
                 <label for="passwordInput" className="form-label" style={{color:"#11253e"}}>Şifre</label>
                 <input type="text"
                     className="form-control"
                     style={{width:"30em"}}
                     id="passwordInput"
                     value={editedPassword}
                     onChange={(e)=>{
                        setEditedPassword(e.target.value);
                     }}/>
              </div>
              <div>
                {
                    user.authority==="Admin" ? ( <></> 
                    )
                    :
                    (<div className="d-flex justify-content-around mt-4 mb-4">
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio" 
                                   name="authority" 
                                   id="engineering"
                                   checked={editedAuthority==="Bilgisayar Mühendisliği"}
                                   onChange = { () => {
                                        setEditedAuthority("Bilgisayar Mühendisliği");
                                   }}/>
                            <label className="form-check-label" for="engineering">
                                Bilgisayar Mühendisliği
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" 
                                   type="radio" 
                                   name="authority" 
                                   id="dentistry" 
                                   checked={editedAuthority==="Diş Hekimliği"}
                                   onChange = { () => {
                                        setEditedAuthority("Diş Hekimliği");
                                     
                                   }}/>
                            <label className="form-check-label" for="dentistry">
                                Diş Hekimliği
                            </label>
                        </div>
                            <div className="form-check">
                            <input className="form-check-input" 
                                   type="radio" 
                                   name="authority" 
                                   id="medicine"
                                   checked={editedAuthority==="Tıp"}
                                   onChange = { () => {
                                         setEditedAuthority("Tıp");
                                   }}/>
                            <label className="form-check-label" for="medicine">
                                Tıp
                            </label>
                        </div>
                    </div>
                    )
                }
              </div>
              <div className="d-flex justify-content-around">
                    <button type="button" className="btn btn-primary" style={{width:"30%",backgroundColor:"#ca9a29",border:"none",color:"#050d21"}} onClick={()=>handleCompleteClick(user._id,editedUserName,editedPassword,editedAuthority)}>
                            Güncelle
                    </button>
                    <button type="button" className="btn btn-primary" style={{width:"30%",backgroundColor:"#ca9a29",border:"none",color:"#050d21"}} onClick={()=>handleReturnClick()}>
                            Geri Dön
                    </button>
              </div>
        </form>
    )
}

export default UserEdit;
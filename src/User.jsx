import { useEffect, useState } from "react";
import UserEdit from "./UserEdit";
import UsersTableRow from "./UsersTableRow";

const User=()=>{
    const [users,setUsers] = useState([]);
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [authority,setAuthority] = useState("Bilgisayar Mühendisliği");
    const [isEditing,setIsEditing] = useState(false);
    const [user,setUser] = useState({});

    const getUsers = async () => {
        const response = await fetch(`http://localhost:5000/users/`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const records = await response.json();
        return records;

    };

    useEffect(() => {
        const fetchAndSet=async()=>{
            const response = await getUsers();
            setUsers(response);
        };
        
        fetchAndSet();

    }, []);


    const handleEditClick=(id)=>{
        setIsEditing(true);

        const data=users.slice();
        
        const index=data.findIndex((object)=>object._id === id);
        setUser(data[index]);
    }

    const handleCompleteClick= async (id,editedUserName,editedPassword,editedAuthority)=>{
        setIsEditing(false);

        const editedUser = {
            authority: editedAuthority,
            password: editedPassword,
            username: editedUserName,
        };
        

        await fetch(`http://localhost:5000/userUpdate/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedUser),
        }).catch(error => {
            window.alert(error);
            return;
        });

        
        const response = await getUsers();
        setUsers(response);
        
        
        setUserName("");
        setPassword("");
        setAuthority("Mühendislik");
    }

    const handleRemoveClick= async (id)=>{
          await fetch(`http://localhost:5000/userDelete/${id}`, {
            method: "DELETE"
          });
        
          const response = await getUsers();
          setUsers(response);
    }

    const handleReturnClick=()=>{
        setUserName("");
        setPassword("");
        setAuthority("Mühendislik");
        setIsEditing(false);
    }

    const handleAddClick= async ()=>{

        const newUser = {
            authority: authority,
            password: password,
            username: userName
        };
       
        await fetch("http://localhost:5000/users/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        const response = await getUsers();
        setUsers(response);

        setUserName("");
        setPassword("");
        setAuthority("Mühendislik");

    }

    return(
        <>
         <div className="d-flex flex-column align-items-center mt-4">
           <h1 style={{color:"#11253e"}}>Kullanıcılar</h1>
            {
               isEditing ? ( <UserEdit
                                handleCompleteClick={handleCompleteClick}
                                handleReturnClick={handleReturnClick}
                                user={user}
                             /> 
               )
               : 
               (
                <form className="mt-5">
                    <div className="mb-3">
                        <label for="usernameInput" className="form-label" style={{color:"#11253e"}}>Kullanıcı Adı</label>
                        <input type="text"
                            className="form-control"
                            style={{width:"30em"}}
                            id="usernameInput"
                            value={userName}
                            onChange={(e)=>{
                                setUserName(e.target.value);
                            }}/>
                    </div>
                    <div className="mb-3">
                        <label for="passwordInput" className="form-label" style={{color:"#11253e"}}>Şifre</label>
                        <input type="text"
                            className="form-control"
                            style={{width:"30em"}}
                            id="passwordInput"
                            value={password}
                            onChange={(e)=>{
                                setPassword(e.target.value);
                            }}/>
                    </div>
                    <div className="d-flex justify-content-around mt-4 mb-4">
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio" 
                                   name="authority" 
                                   id="engineering"
                                   checked={authority==="Bilgisayar Mühendisliği"}
                                   onChange = { () => {
                                        setAuthority("Bilgisayar Mühendisliği");
                                    }
                                   }/>
                            <label className="form-check-label" for="engineering">
                                Bilgisayar Mühendisliği
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" 
                                   type="radio" 
                                   name="authority" 
                                   id="dentistry" 
                                   checked={authority==="Diş Hekimliği"}
                                   onChange = { () => {
                                        setAuthority("Diş Hekimliği");
                                    }
                                   }/>
                            <label className="form-check-label" for="dentistry">
                                Diş Hekimliği
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="radio"
                                   name="authority"
                                   id="medicine"
                                   checked={authority==="Tıp"}
                                   onChange = { () => {
                                        setAuthority("Tıp");
                                    }
                                   }/>
                            <label className="form-check-label" for="medicine">
                                Tıp
                            </label>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center"> 
                        <button type="button" className="btn btn-primary" style={{width:"30%",backgroundColor:"#ca9a29",border:"none",color:"#050d21"}} onClick={()=>handleAddClick()}>
                            Ekle
                        </button>
                    </div>
                </form>
               )
           }

           <div style={{width:"70em",marginTop:"5em",marginBottom:"5em"}}>
            <table className="table">
             <thead>
                <tr>
                    <th scope="col">Kullanıcı Adı</th>
                    <th scope="col">Şifre</th>
                    <th scope="col">Yetki</th>
                </tr>
             </thead>
             <tbody>
                {
                    users.map((val)=>{
                        return   <UsersTableRow user={val}
                                                handleEditClick={handleEditClick}
                                                handleRemoveClick={handleRemoveClick}
                                                key={val._id}
                                 />
                    })
                }
             </tbody>
           </table>
          </div>
         </div>
        </>
    )
}

export default User;
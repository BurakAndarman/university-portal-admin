
const UsersTableRow=({user,handleEditClick,handleRemoveClick})=>{
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.password}</td>
            <td>{user.authority}</td>
            <td><button type="button" className="btn btn-primary" style={{backgroundColor:"#ca9a29",border:"none",color:"#050d21"}} onClick={()=>handleEditClick(user._id)}>Düzenle</button></td>
            {
                user.authority==="Admin" ? ( <></> 
                )
                :
                (
                    <td><button type="button" className="btn btn-primary" style={{backgroundColor:"#ca9a29",border:"none",color:"#050d21",width:"3em"}} onClick={()=>handleRemoveClick(user._id)}>Sil</button></td>
                )
            }
        </tr>
    )
} 

export default UsersTableRow;
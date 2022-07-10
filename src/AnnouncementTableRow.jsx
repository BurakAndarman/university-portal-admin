

const AnnouncementTableRow=({announcement,handleEditClick,handleRemoveClick})=>{

    return(
        <tr>
            <td>{announcement.header}</td>
            <td>{announcement.department}</td>
            <td>{announcement.date}</td>
            <td><button type="button" className="btn btn-primary" style={{backgroundColor:"#ca9a29",border:"none",color:"#050d21"}}  onClick={()=>handleEditClick(announcement._id)}>Düzenle</button></td>
            <td><button type="button" className="btn btn-primary" style={{backgroundColor:"#ca9a29",border:"none",color:"#050d21",width:"3em"}}  onClick={()=>handleRemoveClick(announcement._id)}>Sil</button></td>
        </tr>
    )

}

export default AnnouncementTableRow;
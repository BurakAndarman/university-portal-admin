

const NewsTableRow=({report,handleEditClick,handleRemoveClick})=>{

    return(
        <tr>
            <td>{report.header}</td>
            <td>{report.department}</td> 
            <td>{report.date}</td>
            <td><button type="button" className="btn btn-primary" style={{backgroundColor:"#ca9a29",border:"none",color:"#050d21"}}  onClick={()=>handleEditClick(report.id)}>Düzenle</button></td>
            <td><button type="button" className="btn btn-primary" style={{backgroundColor:"#ca9a29",border:"none",color:"#050d21",width:"3em"}}  onClick={()=>handleRemoveClick(report.id)}>Sil</button></td>
        </tr>
    )

}

export default NewsTableRow;
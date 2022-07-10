import { useState } from "react";

const NewsEdit=({handleCompleteClick,handleReturnClick,report})=>{

    const [editedHeader,setEditedHeader]=useState(report.header);
    const [editedContent,setEditedContent]=useState(report.content);


    return (
              <form className="mt-5">
                   <div className="mb-3">
                    <label for="header" className="form-label" style={{color:"#11253e"}}>Başlık</label>
                    <input type="text"
                             className="form-control"
                             style={{width:"30em"}}
                             id="header"
                             value={editedHeader}
                             onChange={(e)=>{
                                setEditedHeader(e.target.value);
                             }}
                        />
                    </div>
                    <div className="mb-3">
                       <label for="content" className="form-label" style={{color:"#11253e"}}>İçerik</label>
                       <textarea className="form-control"
                                 style={{width:"30em",height:"25em"}}
                                 value={editedContent}
                                 onChange={(e)=>{
                                     setEditedContent(e.target.value);
                                 }}
                        />                       
                    </div>
                    <div className="d-flex justify-content-around">
                        <button type="button" className="btn btn-primary" style={{width:"30%",backgroundColor:"#ca9a29",border:"none",color:"#050d21"}} onClick={()=>handleCompleteClick(report.id,editedHeader,editedContent)}>
                            Güncelle
                        </button>
                        <button type="button" className="btn btn-primary" style={{width:"30%",backgroundColor:"#ca9a29",border:"none",color:"#050d21"}} onClick={()=>handleReturnClick()}>
                            Geri Dön
                        </button>
                    </div>
              </form>
    )
}

export default NewsEdit;
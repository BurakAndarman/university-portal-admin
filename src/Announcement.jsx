import { useEffect, useState } from "react";
import AnnouncementTableRow from "./AnnouncementTableRow";
import AnnouncementEdit from "./AnnouncementEdit";

const Announcement=()=>{
    const [announcements,setAnnouncements]=useState([]);
    const [header,setHeader]=useState("");
    const [content,setContent]=useState("");
    const [isEditing,setIsEditing]=useState(false);
    const [announcement,setAnnouncement]=useState({});

    const getAnnouncements = async () => {
        const response = await fetch(`http://localhost:5000/announcements/`);

        if(!response.ok){
            const message =  `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
        }

        const records = await response.json();
        return records;
    }

    useEffect(()=>{
        const fetchAndSet = async()=>{
            const response = await getAnnouncements();
            setAnnouncements(response);
        };
        
        fetchAndSet();

        return;
      }, []
    )

    const handleEditClick=(id)=>{
        setIsEditing(true);

        const data=announcements.slice();
        
        const index=data.findIndex((object)=>object._id === id);
        setAnnouncement(data[index]);
    }

    const handleCompleteClick= async (id,editedHeader,editedContent)=>{
        setIsEditing(false);

        const editedAnnouncement = {
            header:editedHeader,
            content:editedContent
        };
        

        await fetch(`http://localhost:5000/announcementsUpdate/${id}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedAnnouncement)
        }).catch(error => {
            window.alert(error);
            return;
        });

        
        const response = await getAnnouncements();
        setAnnouncements(response);        
        
        setHeader("");
        setContent("");
    }
    
    const handleReturnClick=()=>{
        setContent("");
        setHeader("");
        setIsEditing(false);
    }

    const handleAddClick= async ()=>{

        const newAnnouncement = {
            header: header,
            content: content
        };
       
        await fetch("http://localhost:5000//announcements/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAnnouncement),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        const response = await getAnnouncements();
        setAnnouncements(response);

        setHeader("");
        setContent("");
    }

    const handleRemoveClick= async (id)=>{
        await fetch(`http://localhost:5000/announcementsDelete/${id}`, {
            method: "DELETE"
        });
        
        const response = await getAnnouncements();
        setAnnouncements(response);
    }

    return(
        <>
           <div className="d-flex flex-column align-items-center mt-4">
           <h1 style={{color:"#11253e"}}>Duyurular</h1>
           { isEditing ? (<AnnouncementEdit handleCompleteClick={handleCompleteClick}
                                            handleReturnClick={handleReturnClick}
                                            announcement={announcement}/>
                )                                            
                :
                (
                <form className="mt-5">
                    <div className="mb-3">
                      <label for="header" className="form-label" style={{color:"#11253e"}}>Başlık</label>
                      <input type="text"
                             className="form-control"
                             style={{width:"30em"}}
                             id="header"
                             value={header}
                             onChange={(e)=>{
                                setHeader(e.target.value);
                             }}/>
                    </div>
                    <div className="mb-3">
                       <label for="content" className="form-label" style={{color:"#11253e"}}>İçerik</label>
                       <textarea className="form-control"
                                 style={{width:"30em",height:"25em"}}
                                 value={content}
                                 onChange={(e)=>{
                                    setContent(e.target.value);
                                }}/>                       
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="button" class="btn btn-primary" style={{width:"30%",backgroundColor:"#ca9a29",border:"none",color:"#050d21"}} onClick={()=>handleAddClick()}>
                            Ekle
                        </button>
                    </div>
                </form>
                )
           }

            <div style={{width:"60%",marginTop:"5em",marginBottom:"5em"}}>
              <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Başlık</th>
                        <th scope="col">Bölüm</th>
                        <th scope="col">Tarih</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        announcements.map((val)=>{
                            return   <AnnouncementTableRow announcement={val} 
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

export default Announcement;
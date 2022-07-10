import { useState,useEffect } from "react";
import NewsTableRow from './NewsTableRow';
import NewsEdit from './NewsEdit';

const News=()=>{
    const [news,setNews]=useState([]);
    const [header,setHeader]=useState("");
    const [content,setContent]=useState("");
    const [isEditing,setIsEditing]=useState(false);
    const [report,setReport]=useState({});

    const getNews = async () => {
        const response = await fetch(`http://localhost:5000/news/`);

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
            const response = await getNews();
            setNews(response);
        };
        
        fetchAndSet();

        return;
      }, []
    )

    const handleEditClick=(id)=>{
        setIsEditing(true);

        const data=news.slice();
        
        const index=data.findIndex((object)=>object.id === id);
        setReport(data[index]);
    }

    const handleCompleteClick=(id,editedHeader,editedContent)=>{
        setIsEditing(false);

        const data=news.slice();
        
        const index=data.findIndex((object)=>object.id === id);

        data[index].header=editedHeader;
        data[index].content=editedContent;

        const today=new Date();
        const date = String(today.getDate()).padStart(2, '0') + "." + String(today.getMonth() + 1).padStart(2, '0') + "." + today.getFullYear();

        data[index].date=date;
        setContent("");
        setHeader("");

        setNews(data);
    }

    const handleReturnClick=()=>{
        setContent("");
        setHeader("");
        setIsEditing(false);
    }

    const handleAddClick=()=>{
        const today=new Date();
        const date = String(today.getDate()).padStart(2, '0') + "." + String(today.getMonth() + 1).padStart(2, '0') + "." + today.getFullYear();

        const data=news.slice();

        let newId=Math.floor(Math.random() * 1000) + 1;
        let flag=true;


        while(flag){
            flag=false;
            for (const object of data) {
                if(object.id === newId) {
                    newId = Math.floor(Math.random() * 1000) + 1;
                    flag=true;
                    break;
                }
            }
        }

        data.push({
            "id":newId,
            "header":header,
            "content":content,
            "date":date
        })

        setNews(data);
    }
    
    const handleRemoveClick=(id)=>{
        const data=news.slice();

        const index=data.findIndex((object)=>object.id === id);

        data.splice(index,1);
        
        setNews(data);
    }

    return(
        <>
           <div className="d-flex flex-column align-items-center mt-4">
           <h1 style={{color:"#11253e"}}>Haberler</h1>
           { isEditing ? (<NewsEdit handleCompleteClick={handleCompleteClick}
                                    handleReturnClick={handleReturnClick}
                                    report={report}/>
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
                        news.map((val)=>{
                            return  <NewsTableRow   report={val}
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

export default News;
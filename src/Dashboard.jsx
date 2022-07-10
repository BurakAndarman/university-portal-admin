import { useAuth } from "./AuthProvider";
import { Link,Outlet } from 'react-router-dom';
import universityLogo2 from "./universityLogo2.jpg"

const Dashboard=()=>{
    const {token,onLogout}=useAuth();

    return (
        <>
          <div>
              <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#11253e",color:"#ca9a29"}}>
                <div class="container-fluid">
                    <span className="navbar-brand ms-5"><img 
                        style={{width:"4.5em"}}
                        src={universityLogo2}
                        alt="logo"/>
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4">
                            <li className="nav-item">
                                <Link to="announcement" className="nav-link" style={{color:"#ca9a29",fontWeight:"bold"}}>Duyurular</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="news" className="nav-link" style={{color:"#ca9a29",fontWeight:"bold"}}>Haberler</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="user" className="nav-link" style={{color:"#ca9a29",fontWeight:"bold"}}>Kullanıcılar</Link>
                            </li>
                        </ul>
                        <span className="navbar-text me-5" style={{color:"#ca9a29"}}>
                            Hoşgeldiniz {token}
                            {token && (
                                <button type="button" onClick={onLogout} className="btn btn-primary btn-sm ms-4" style={{backgroundColor:"#ca9a29",border:"none",color:"#050d21"}}>Çıkış</button>
                            )}
                        </span>
                    </div>
                </div>
              </nav>
            <Outlet/>
          </div>
        </>
    )
}

export default Dashboard;
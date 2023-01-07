import React, {useState} from "react";
import icon2 from "../icon/2.png";
import icon3 from "../icon/3.png";
import icon4 from "../icon/4.png";
import avatar1 from "../img/1.png";
import avatar2 from "../img/2.png";
import avatar3 from "../img/3.png";
import avatar4 from "../img/4.png";

let b=false

const Profile = ()=> {
    const [post, setPost] = useState([])

    if(localStorage.getItem("SNnickName") ===null && localStorage.getItem("SNemail") ===null && localStorage.getItem("SNavatar") ===null && localStorage.getItem("SNpassword") ===null){
        window.open("/registration","_self")
    }else if(localStorage.getItem("SNnickName") ===null &&  localStorage.getItem("SNpassword") ===null){
        window.open("/login","_self")
    }
    else{



        if(!b){
            console.log({user:localStorage.getItem("SNnickName")})
            fetch(`http://185.237.204.110:3001/api/profile`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nick:localStorage.getItem("SNnickName")}),
            }).then(response => {
                return response.text();
            }).then(data => {
                setPost(JSON.parse(data))
                b=true
            });
        }

        let avatar = 0
        let avatarLocal;
        if(Number(localStorage.getItem("SNavatar"))===1){
            avatarLocal=avatar1
        }else if(Number(localStorage.getItem("SNavatar"))===2){
            avatarLocal=avatar2
        }else if(Number(localStorage.getItem("SNavatar"))===3){
            avatarLocal=avatar3
        }else if(Number(localStorage.getItem("SNavatar"))===4){
            avatarLocal=avatar4
        }


        function avatarF(number){
            if(number===1){
                avatar=avatar1
            }else if(number===2){
                avatar=avatar2
            }else if(number===3){
                avatar=avatar3
            }else if(number===4){
                avatar=avatar4
            }
        }


        function newPost(){
            window.open("/NewPost","_self")
        }

        function settings(){
            window.open("/settings","_self")
        }

        function profile(){
            window.open("/profile","_self")
        }

        function up(){
            window.open("/","_self")
        }

        return(
            <div>
                <div className="centreM">
                    <ol className="olM">
                        {post.map((post,i)=>(
                            <div>
                                <br/>
                                <br/>
                                <li key={i} className="liM">
                                    {avatarF(Number(post.avatar))}

                                    <img alt="img" className="avatarM"  src={avatar} />
                                    <span className="nickNameM">{post.nick}</span>
                                    <div className="textM" >{post.mainText}</div>
                                    <br/>
                                    <br/>
                                    <div className="containerPhotoM"><img alt="img" className="imgM" src={post.photo}/></div>


                                </li>
                            </div>
                        ))
                        }
                    </ol>


                </div>


                <div className="topM">
                    <span className="topTextM">SOCIAL NETWORK</span>
                    <button  className="buttonIconM" onClick={settings}> <img alt="img" className="iconM" src={icon4}/></button>
                </div>

                <div className="bottomM">
                    <button  className="buttonIconHomeM"  onClick={up}> <img alt="img" className="iconHomeM" src={icon2}/></button>
                    <button  className="buttonIconPlusM"  onClick={newPost}> <img alt="img" className="iconPlusM" src={icon3}/></button>
                    <button  className="buttonIconProfileM" onClick={profile}> <img alt="img" className="iconProfileM" src={avatarLocal}/></button>
                </div>
            </div>
                )
    }
}
export default Profile;


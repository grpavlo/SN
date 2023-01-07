import React, {useState} from "react";
import icon2 from "../icon/2.png";
import avatarp1 from "../img/1.png";
import avatarp2 from "../img/2.png";
import avatarp3 from "../img/3.png";
import avatarp4 from "../img/4.png";
import "./Settings.css"
import "../Main/Main.css"

let countAvatar1 = false
let countAvatar2 = false
let countAvatar3 = false
let countAvatar4 = false

let nick=""

const Settings = ()=> {
    const [avatar1,seavatar1] = useState("avatar1")
    const [avatar2,seavatar2] = useState("avatar2")
    const [avatar3,seavatar3] = useState("avatar3")
    const [avatar4,seavatar4] = useState("avatar4")
    const [a,setAvatar] = useState("null")
    if(localStorage.getItem("SNnickName") ===null && localStorage.getItem("SNemail") ===null && localStorage.getItem("SNavatar") ===null && localStorage.getItem("SNpassword") ===null){
        window.open("/registration","_self")
    }else if(localStorage.getItem("SNnickName") ===null &&  localStorage.getItem("SNpassword") ===null){
        window.open("/login","_self")
    }
    else{
        let avatarLocal;
        if(Number(localStorage.getItem("SNavatar"))===1){
            avatarLocal=avatarp1
        }else if(Number(localStorage.getItem("SNavatar"))===2){
            avatarLocal=avatarp2
        }else if(Number(localStorage.getItem("SNavatar"))===3){
            avatarLocal=avatarp3
        }else if(Number(localStorage.getItem("SNavatar"))===4){
            avatarLocal=avatarp4

        }



        function profile(){
            window.open("/profile","_self")
        }

        function up(){
            window.open("/","_self")
        }

        function click(a){

            if(a==="avatar1"){
                if(!countAvatar1){
                    countAvatar1=true
                    seavatar1("avatar1Effect")
                    countAvatar2=false
                    seavatar2("avatar2")
                    countAvatar3=false
                    seavatar3("avatar3")
                    countAvatar4=false
                    seavatar4("avatar4")

                    setAvatar("1")
                }else{
                    countAvatar1=false
                    seavatar1("avatar1")
                    setAvatar("null")
                }
            }else if(a==="avatar2"){
                if(!countAvatar2){
                    countAvatar1=false
                    seavatar1("avatar1")
                    countAvatar2=true
                    seavatar2("avatar2Effect")
                    countAvatar3=false
                    seavatar3("avatar3")
                    countAvatar4=false
                    seavatar4("avatar4")

                    setAvatar("2")
                }else{
                    countAvatar2=false
                    seavatar2("avatar2")
                    setAvatar("null")
                }
            }else if(a==="avatar3"){
                if(!countAvatar3){
                    countAvatar1=false
                    seavatar1("avatar1")
                    countAvatar2=false
                    seavatar2("avatar2")
                    countAvatar3=true
                    seavatar3("avatar3Effect")
                    countAvatar4=false
                    seavatar4("avatar4")

                    setAvatar("3")
                }else{
                    countAvatar3=false
                    seavatar3("avatar3")
                    setAvatar("null")
                }
            }else if(a==="avatar4"){
                if(!countAvatar4){
                    countAvatar1=false
                    seavatar1("avatar1")
                    countAvatar2=false
                    seavatar2("avatar2")
                    countAvatar3=false
                    seavatar3("avatar3")
                    countAvatar4=true
                    seavatar4("avatar4Effect")

                    setAvatar("4")
                }else{
                    countAvatar4=false
                    seavatar4("avatar4")
                    setAvatar("null")
                }
            }

        }

       async function change(){

            if(nick!=="" && nick!==localStorage.getItem("SNnickName")){
                await fetch(`http://185.237.204.110:3001/api/change`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({h:"nick",m:nick,d:localStorage.getItem("SNnickName")}),
                }).then(response => {
                    return response.text();
                }).then(data => {
                    if(data==="good"){
                        alert("good change nickname")
                        localStorage.setItem("SNnickName", nick)
                    }else if(data === "clients_nick_key"){
                        alert("Error nick")
                    }
                });

            }
            if(a!==localStorage.getItem("SNavatar") && a!=="null"){
                await fetch(`http://185.237.204.110:3001/api/change`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({h:"avatar",m:a,d:localStorage.getItem("SNavatar")}),
                }).then(response => {
                    return response.text();
                }).then(data => {
                    if(data==="good"){
                        alert("good change avatar")
                        localStorage.setItem("SNavatar", a)
                    }else if(data === "clients_avatar_key"){
                        alert("Error avatar")
                    }
                });
            }

        }

        function ChangePassword(){
            window.open("/ChangePassword","_self")
        }

        return(
            <div>
                <div className="centreM">
                    <button className="buttonS" onClick={ChangePassword}><span  className="buttonIconPlusSB">Change password</span></button>
                    <div className="centreChange">
                        <span className="centreChangeTS">Change nickname</span>
                        <input className="centreChangeI" maxLength="9" type="text" id="changeNick" onChange={e=>{nick=e.target.value}}/>
                    </div>

                    <div className="avatarS">

                        <span className="textAvatar">Change avatar</span>

                        <div className="allAvatar">
                            <button className={avatar1} onClick={() => click("avatar1")}></button>
                            <button className={avatar2} onClick={() => click("avatar2")}></button>
                            <button className={avatar3} onClick={() => click("avatar3")}></button>
                            <button className={avatar4} onClick={() => click("avatar4")}></button>
                        </div>
                    </div>
                </div>


                <div className="topM">
                    <span className="topTextS">SOCIAL NETWORK</span>
                </div>

                <div className="bottomM">
                    <button  className="buttonIconHomeM"  onClick={up}> <img alt="img" className="iconHomeM" src={icon2}/></button>
                    <button  className="buttonIconPlusS" onClick={change} ><span  className="buttonIconPlusSt"  span>SAVE</span></button>
                    <button  className="buttonIconProfileM" onClick={profile}> <img alt="img" className="iconProfileM" src={avatarLocal}/></button>
                </div>
            </div>
        )
    }
}
export default Settings;


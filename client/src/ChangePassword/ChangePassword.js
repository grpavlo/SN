import React from "react";
import icon2 from "../icon/2.png";
import avatarp1 from "../img/1.png";
import avatarp2 from "../img/2.png";
import avatarp3 from "../img/3.png";
import avatarp4 from "../img/4.png";
import "./ChangePassword.css"


let password=""
let passwordOld=""

const ChangePassword = ()=> {

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


        async function change(){

            if(passwordOld!=="" && passwordOld===localStorage.getItem("SNpassword") && password!==localStorage.getItem("SNpassword")){
                await fetch(`http://185.237.204.110:3001/api/change`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({h:"password",m:password,d:localStorage.getItem("SNpassword")}),
                }).then(response => {
                    return response.text();
                }).then(data => {
                    if(data==="good"){
                        alert("good change password")
                        localStorage.setItem("SNpassword", password)
                    }else if(data === "clients_password_key"){
                        alert("Error password")
                    }
                });

            }


        }

        return(
            <div>
                <div className="centreM">
                    <div className="CurrentC">
                        <span className="centreChangeTS">Current password</span>
                        <input className="centreChangeI" type="text" id="changeNick" onChange={e=>{passwordOld=e.target.value}}/>
                    </div>
                    <div className="NewC">
                        <span className="centreChangeTS">New password</span>
                        <input className="centreChangeI" type="text" id="changeNick" onChange={e=>{password=e.target.value}}/>
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
export default ChangePassword;


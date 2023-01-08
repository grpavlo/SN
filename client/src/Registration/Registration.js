import React,{useEffect,useState} from "react";
import  "./Registration.css"
import login from "../icon/1.png"
let countAvatar1 = false
let countAvatar2 = false
let countAvatar3 = false
let countAvatar4 = false

const Registration = ()=>{
    const [n,setNick] = useState("")
    const [p,setPassword] = useState("")
    const [e,setEmail] = useState("")
    const [a,setAvatar] = useState("null")
    const [avatar1,seavatar1] = useState("avatar1")
    const [avatar2,seavatar2] = useState("avatar2")
    const [avatar3,seavatar3] = useState("avatar3")
    const [avatar4,seavatar4] = useState("avatar4")

    function handleChange(e) {
        setNick(e.target.value);
    }

    function handleChangeP(e) {
        setPassword(e.target.value);
    }

    function handleChangeE(e) {
        setEmail(e.target.value);
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

    useEffect(() => {
        getMerchant();
    }, []);

    function getMerchant() {
        fetch('http://185.237.204.110:3001')
            .then(response => {
                return response.text();
            })
    }
    function handleSubmit(){

        let arr = e.split("")
        let email = false
        for(let i = 0; i<arr.length; i++){
            if(arr[i]==="@"){
                email=true
                if(a!=="null") {
                    fetch(`http://185.237.204.110:3001/api/registration`, {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({n, p, e, a}),
                    }).then(response => {
                        return response.text();
                    }).then(data => {
                        if (data === "good") {
                            localStorage.setItem("SNnickName", n)
                            localStorage.setItem("SNpassword", p)
                            localStorage.setItem("SNemail", e)
                            localStorage.setItem("SNavatar", a)
                            window.open("/", "_self")
                        } else {

                            if(JSON.parse(data).constraint === "clients_nick_key"){
                                alert("Error nick")
                            }else if(JSON.parse(data).constraint === "clients_email_key"){
                                alert("Error email")
                            }
                        }
                        getMerchant();
                    });
                }else {
                    alert("choose avatar")
                }
                break
            }
        }
        if(!email){
            alert("email incorrect")
        }

    }

    function loginF(){
        window.open("/login","_self")
    }

    return(
        <div className="mainR">

            <div className="backgroundR"></div>
            <button className="login" onClick={loginF}><img alt="img" className="loginI" src={login}/></button>
            <div className="nickNameR">
                <span className="textNicknameR">Nickname</span>
                <input name="nickname" type="text" className="inputNickNameR" maxLength="9" onChange={handleChange}/>
            </div>

            <div className="emailR">
                <span className="textEmailR">Email</span>
                <input name="email" type="text" className="inputNickEmailR" onChange={handleChangeE}/>
            </div>

            <div className="passwordR">
                <span className="textPasswordR">Password</span>
                <input type="text" className="inputPasswordR" onChange={handleChangeP}/>
            </div>
            <div className="avatar">

                <span className="textAvatarR">Avatar</span>

                <div className="allAvatar">
                    <button className={avatar1} onClick={() => click("avatar1")}></button>
                    <button className={avatar2} onClick={() => click("avatar2")}></button>
                    <button className={avatar3} onClick={() => click("avatar3")}></button>
                    <button className={avatar4} onClick={() => click("avatar4")}></button>
                </div>
            </div>
            <button onClick={handleSubmit} className="buttonR">REGISTRATION</button>
        </div>
    )
}

export default Registration
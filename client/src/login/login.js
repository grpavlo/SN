import React,{useEffect,useState} from "react";
import "./login.css"
const Login = ()=>{

    const [n,setNick] = useState("")
    const [p,setPassword] = useState("")

    function handleChange(e) {
        setNick(e.target.value);
    }

    function handleChangeP(e) {
        setPassword(e.target.value);
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
    function handleSubmit(event){
        fetch(`http://185.237.204.110:3001/api/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({n,p}),
        }).then(response => {
            return response.text();
        }).then(data => {
            console.log(JSON.parse(data))
            if(JSON.parse(data).m==="good"){
                localStorage.setItem("SNnickName",n)
                localStorage.setItem("SNpassword",p)
                localStorage.setItem("SNavatar",JSON.parse(data).a)
                window.open("/","_self")
            }else {
                alert(JSON.parse(data).m)
            }
            getMerchant();
        });
    }

    function forgot(){
        window.open("/forgot","_self")
    }

    return(
        <div className="main">
            <div className="background"></div>
            <div className="nickName">
                <span className="textNickname">Nickname</span>
                <input type="text" className="inputNickName" maxLength="9" onChange={handleChange}/>
            </div>

            <div className="password">
                <span className="textPassword">Password</span>
                <input type="text" className="inputPassword" onChange={handleChangeP}/>
            </div>
            <button onClick={forgot} className="Forgot">Forgot your password?</button>
            <button onClick={handleSubmit} className="button">LOGIN</button>
        </div>

    )
}

export default Login
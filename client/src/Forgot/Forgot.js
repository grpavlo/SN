import React,{useEffect,useState} from "react";
import "./Forgot.css"

const Forgot = ()=>{
    const [p,setPassword] = useState("")
    const [e,setEmail] = useState("")

    function handleChangeP(e) {
        setPassword(e.target.value);
    }

    function handleChangeE(e) {
        setEmail(e.target.value);
    }

    useEffect(()=>{
        getMerchant();
    },[])

    function  getMerchant(){
        fetch('http://185.237.204.110:3001')
            .then((response) =>{
                return response.text()
            })
    }

    function reset(){
        fetch(`http://185.237.204.110:3001/api/forgot`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({e,p}),
        }).then(response => {
            return response.text();
        }).then(data => {
            if(data==="good"){
                localStorage.setItem("SNpassword",p)
                window.open("/login","_self")
            }else {
                alert(data)
            }
            getMerchant();
        });
    }


    return(
        <div className="mainF">
            <div className="cub"></div>

            <div className="divEmail">
                <span className="emailFM">Email</span>
                <input className="emailF" type="text" name="email" onChange={handleChangeE}/>
            </div>
            <div className="divPassword">
                <span className="NewF">New password</span>
                <input className="passwordF" type="text" name="password" onChange={handleChangeP}/>
            </div>

            <button className="reset" onClick={reset}>RESET</button>
        </div>
    )
}

export default Forgot
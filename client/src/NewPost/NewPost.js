import "./NewPost.css"
import icon2 from "../icon/2.png";
import React from "react";
import avatar1 from "../img/1.png";
import avatar2 from "../img/2.png";
import avatar3 from "../img/3.png";
import avatar4 from "../img/4.png";


let id
const NewPost = () =>{


    if(localStorage.getItem("SNnickName") ===null && localStorage.getItem("SNemail") ===null && localStorage.getItem("SNavatar") ===null && localStorage.getItem("SNpassword") ===null){
        window.open("/registration","_self")
    }else if(localStorage.getItem("SNnickName") ===null &&  localStorage.getItem("SNpassword") ===null){
        window.open("/login","_self")
    }
    else{


        function idUser(){
            fetch(`http://185.237.204.110:3001/api/getId`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({nick:localStorage.getItem("SNnickName")}),
            }).then(response => {
                return response.text();
            }).then(data => {
                console.log(data = JSON.parse(data))
                if(data.mes==="good"){
                    id = data.id
                }else {
                    alert(data.mes)
                }

            });
        }
        idUser()

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




        function up(){
            window.open("/","_self")
        }

        function profile(){
            window.open("/profile","_self")
        }

        let img
        let file
        function handleImageChange(e){
            e.preventDefault();

            let reader = new FileReader();
            file = e.target.files[0];
            console.log(file)

            reader.onloadend = () => {
                img= reader.result
                console.log(img)
            }

            reader.readAsDataURL(file)
            function time(){
                document.getElementById("postImgBac").innerHTML=`<img class="postImgBacImg" src="${img}"/>`
            }

            setTimeout(time,500)
        }

        async function newPost(){
            let urlM;
            const formData = new FormData()
            formData.append('image', file)





            let text=""
            text = document.getElementById("textareaText").value
            if(text!==""){

                const url = `https://api.imgbb.com/1/upload?key=d36f9096f78e237c8a7389b2118faef2`
                await fetch(url,
                    {
                        method: "POST",
                        body: formData
                    })
                    .then(res => res.json())
                    .then(result => {
                        urlM = result.data.display_url
                    })

                await fetch(`http://185.237.204.110:3001/api/newPost`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({i:id,t:text,u:urlM}),
                }).then(response => {
                    return response.text();
                }).then(data => {
                    if(data==="good"){
                        window.open("/","_self")
                    }else {
                        alert(data)
                    }

                });
                localStorage.removeItem("newTextPost")
            }else {
                alert("text 0/99")
            }

        }

        return(
           <div>

               <div className="centreM">
                   <div className="postTextM">
                       <div className="postText">
                           <textarea placeholder="text post" id="textareaText" className="textareaText" maxLength="99" onChange={e=>{localStorage.setItem("newTextPost",e.target.value)}} >{localStorage.getItem("newTextPost")}</textarea>
                       </div>

                   </div>
                   <div className="postImg">

                       <div id="postImgBac" className="postImgBac">

                           <input className="postImgButton" type="file" onChange={handleImageChange} />


                       </div>

                   </div>
               </div>
               <div className="topM">
                   <div className="topTextN">SOCIAL NETWORK</div>
               </div>

               <div className="bottomM">
                   <button  className="buttonIconHomeM" onClick={up}> <img alt="img" className="iconHomeM" src={icon2}/></button>
                   <button  className="buttonIconPlusN" onClick={newPost} type={"submit"}>NEW POST</button>
                   <button  className="buttonIconProfileM" onClick={profile}> <img alt="img" className="iconProfileM" src={avatarLocal}/></button>
               </div>
           </div>
        )
    }
}

export default NewPost
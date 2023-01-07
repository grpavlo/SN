const db = require("../db")


const registration = (body) => {
    return new Promise(async function (resolve, reject) {
        const {n, p, e, a} = body
        console.log(n)
        await db.query('INSERT INTO clients (nick, password,email,avatar) VALUES ($1, $2,$3,$4) RETURNING *', [n,p,e,a], (error, results) => {
            if (error) {
                reject(error)
                console.log(error.constraint)
                resolve(error.constraint)
            }else {
                if(n===results.rows[0].nick && p===results.rows[0].password && e===results.rows[0].email && a===results.rows[0].avatar){
                    resolve("good")
                }
            }
        })
    })
}

const login = (body) => {
    return new Promise(async function (resolve, reject) {
        const {n, p} = body
        await db.query(`SELECT EXISTS (SELECT * FROM clients WHERE nick = '${n}')`, async (error, results) => {
            if (error) {
                reject(error)
                console.log(error)
                resolve("error")
            } else {
                if (results.rows[0].exists) {
                    await db.query(`SELECT EXISTS (SELECT * FROM clients WHERE password = '${p}')`, (error, results) => {
                        if (error) {
                            reject(error)
                            console.log(error)
                            resolve({
                                m:"error",
                            })
                        }else{
                            if(results.rows[0].exists) {

                                db.query(`SELECT * FROM clients WHERE nick = '${n}'`,(error, results) => {
                                    console.log("avatar "+results.rows[0].avatar)


                                    resolve(
                                        {
                                            m: "good",
                                            a:results.rows[0].avatar
                                        })
                                })
                            }else {
                                resolve({
                                    m:"password error",
                                })
                            }
                        }
                    })
                } else {
                    resolve({
                        m:"nick error",
                    })
                }
            }
        })
    })
}


const  forgot = body=>{


    return new Promise(async function(resolve, reject){

        const {e,p} = body
        console.log(e,p)
        await  db.query(`SELECT EXISTS (SELECT * FROM clients WHERE email = '${e}')`, async (error,results)=> {
            if(error){
                reject(error)
                console.log(error)
                resolve("error")
            }else {
                console.log(results.rows[0].exists)

                if (results.rows[0].exists) {
                    await db.query(`UPDATE clients SET password = '${p}' WHERE email = '${e}'  `, async (error,results)=> {
                        if (error) {
                            reject(error)
                            console.log(error)
                            resolve("error")
                        }else{
                            resolve("good")
                        }
                    })
                }


            }
        })
    })
}

const  getId = body=>{


    return new Promise(async function(resolve, reject){

        const {nick} = body

        await  db.query(`SELECT * FROM clients WHERE nick = '${nick}'`, async (error,results)=> {
            if(error){
                reject(error)
                console.log(error)
                resolve("error")
            }else {
                    resolve(JSON.stringify({
                        mes:"good",
                        id:results.rows[0].id
                    }))

            }
        })

    })
}

const  newPost = body=>{


    return new Promise(async function(resolve, reject){

        const {i,t,u} = body
        await db.query('INSERT INTO post (clients_id, text,photo) VALUES ($1, $2,$3) RETURNING *', [i,t,u], (error, results) => {
            if (error) {
                reject(error)
                console.log(error.constraint)
                resolve(error.constraint)
            }else {
                resolve("good")
            }
        })

    })
}

const  newPostDB = ()=>{
    return new Promise(async function(resolve, reject){

        await  db.query(`SELECT * FROM post`, async (error,results)=> {
            if (error) {
                reject(error)
                console.log(error.constraint)
                resolve(error.constraint)
            }else {
                console.log(results.rows.length)

                let mainArr=[]

                for(let i = 0;i<results.rows.length;i++){
                    let mainT =results.rows[i].text
                    let ph=results.rows[i].photo
                    let ava
                    let nickName
                    let obj
                    let good="not"
                    for (let prop in results.rows[i]) {

                        if(prop === "clients_id"){

                            await  db.query(`SELECT * FROM clients WHERE id = '${results.rows[i][prop]}'`, async (error,results)=> {
                                if(error){
                                    reject(error)

                                    resolve("error")
                                }else {

                                    ava=results.rows[0].avatar
                                    nickName = results.rows[0].nick
                                    good="good"
                                    console.log(ava,nickName)

                                }

                            })
                        }

                    }
                   function time(){
                       obj = {
                           avatar: ava,
                           nick: nickName,
                           mainText: mainT,
                           photo: ph
                       }

                       mainArr.unshift(obj)
                   }
                    setTimeout(time,500)

                }
                function time2(){
                    resolve(mainArr)
                }
                setTimeout(time2,500)
            }
        })

    })
}

const  profile = body=>{


    return new Promise(async function(resolve, reject){
        const {nick} = body
        console.log("user "+nick)
        await  db.query(`SELECT * FROM clients WHERE nick = '${nick}'`, async (error,results)=> {
            if (error) {
                reject(error)
                console.log(error)
                resolve("error")
            } else {
                console.log(results)
                await  db.query(`SELECT * FROM post WHERE clients_id = '${results.rows[0].id}'`, async (error,results)=> {
                    if (error) {
                        reject(error)
                        console.log(error.constraint)
                        resolve(error.constraint)
                    }else {
                        console.log(results.rows.length)

                        let mainArr=[]

                        for(let i = 0;i<results.rows.length;i++){
                            let mainT =results.rows[i].text
                            let ph=results.rows[i].photo
                            let ava
                            let nickName
                            let obj
                            let good="not"
                            for (let prop in results.rows[i]) {

                                if(prop === "clients_id"){

                                    await  db.query(`SELECT * FROM clients WHERE id = '${results.rows[i][prop]}'`, async (error,results)=> {
                                        if(error){
                                            reject(error)

                                            resolve("error")
                                        }else {

                                            ava=results.rows[0].avatar
                                            nickName = results.rows[0].nick
                                            good="good"
                                            console.log(ava,nickName)

                                        }

                                    })
                                }

                            }
                            function time(){
                                obj = {
                                    avatar: ava,
                                    nick: nickName,
                                    mainText: mainT,
                                    photo: ph
                                }

                                mainArr.unshift(obj)
                            }
                            setTimeout(time,500)

                        }
                        function time2(){
                            resolve(mainArr)
                        }
                        setTimeout(time2,500)
                    }
                })
            }
        })
    })
}

const  change = body=>{


    return new Promise(async function(resolve, reject){
        const {h,m,d} = body
        if(h==="nick"){
            await  db.query(`UPDATE clients SET nick = '${m}' WHERE nick = '${d}'`, async (error,results)=> {
                if (error) {
                    reject(error.constraint)
                    console.log(error.constraint)
                    resolve(error.constraint)
                } else {
                    resolve("good")
                }
            })
        }else if(h==="avatar"){
            await  db.query(`UPDATE clients SET avatar = '${m}' WHERE avatar = '${d}'`, async (error,results)=> {
                if (error) {
                    reject(error.constraint)
                    console.log(error.constraint)
                    resolve(error.constraint)
                } else {
                    resolve("good")
                }
            })
        }else if(h==="password"){
            await  db.query(`UPDATE clients SET password = '${m}' WHERE password = '${d}'`, async (error,results)=> {
                if (error) {
                    reject(error.constraint)
                    console.log(error.constraint)
                    resolve(error.constraint)
                } else {
                    resolve("good")
                }
            })
        }


    })
}


module.exports = {
    registration,
    login,
    forgot,
    newPost,
    getId,
    newPostDB,
    profile,
    change
}
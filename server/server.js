import express, { json } from 'express';
const PORT = 3000
const app = express()
app.use(json())

async function main(){

    app.get('/get', (req,res) =>{
        res.status(200).json({
            message: "hello"
        })
    })
    app.listen(PORT, ()=>{
        console.log(`server start on ${PORT} port`)
    })
}

main()

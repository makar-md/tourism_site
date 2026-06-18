import express, { json } from 'express';
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(json())

async function main(){

    app.get('/get', (req,res) =>{
        res.status(200).json({
            message: "hello"
        })
    })
    app.listen(process.env.PORT || 4200, ()=>{
        console.log(`server start on ${PORT} port`)
    })
}

main()

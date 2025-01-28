const express = require('express')
const mongoose = require('mongoose')
const planRoutes = require('./routes/planRoutes')
const Planner = require('./model/planner')
const app = express()

app.use(express.json())
app.use('/plans', planRoutes)

const port = 3000

app.get('/',(req,res)=>{
    res.send("from the server")
})

async function main() {
    await mongoose.connect('mongodb+srv://entri_user:Kukku00000@cluster0.odat3.mongodb.net/e48db')
}



main()
.then(()=>console.log("DB connected"))
.catch((error)=>console.log(error))

app.listen(port,()=>console.log("server started"))
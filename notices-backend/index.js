const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())

app.use(cors({
    origin:"*",
}))

const routes = require('./routes/route')
app.use(routes)


app.use('/uploads', express.static('uploads'));


const port = process.env.port || 8090;
require('./conn')

app.listen(port,()=>{
    console.log(`server running at port ${port} `);
})
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const BillRoutes = require('./Router/BillRoutes')
const cors = require('cors')


dotenv.config()
app.use(cors())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('database connected')
}).catch((err) => {
    console.log(err);
})

app.use(express.json());
app.use('/api/unplugapp', BillRoutes)


app.listen(7000, () => {
    console.log("Server running in port 7000");
})

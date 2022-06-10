const express = require('express')
const cors = require('cors')

const {deviceController} = require('./controllers')

const app = express()
app.use(express.json());
app.use(cors({
    origin: "*"
}))

app.patch("/devices/:id", deviceController.handlePatch)

const PORT = process.env.PORT || 6789
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

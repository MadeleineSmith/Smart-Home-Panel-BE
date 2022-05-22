const express = require('express')
const cors = require('cors')
const updateDevice = require('./updateDevice');

const app = express()
app.use(express.json());

app.patch("/devices/:id", cors(), async function (req, res) {
    console.log("hit devices endpoint")

    // todo add this back in after hosting
    // const deviceId = req.params.id
    // get device info
    // const deviceInfo = devices.devicesLookUpObject[deviceId]
    // const TuyId = deviceInfo["TuyId"]
    // const TuyKey = deviceInfo["TuyKey"]
    // const IP = deviceInfo["IP"]

    const brightness = req.body.brightness
    const colorTemperature = req.body.colorTemperature

    await updateDevice.updateDevice("i", "s", "s", brightness, colorTemperature);

    res.send('Worked!')
})

const PORT = 6666
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
})

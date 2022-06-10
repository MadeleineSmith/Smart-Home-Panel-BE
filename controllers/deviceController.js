const {deviceService} = require("../services")

const handlePatch = async (req, res, next) => {
    const brightness = req.body.brightness
    const colorTemperature = req.body.colorTemperature

    await deviceService.updateDevice("i", "s", "s", brightness, colorTemperature);

    res.end()
}

module.exports = {
    handlePatch
}
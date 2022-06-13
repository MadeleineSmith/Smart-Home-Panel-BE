const {deviceService} = require("../services")

const handlePatch = async (req, res, next) => {
    const {brightness, colorTemperature} = req.body
    const internalDeviceId = req.query.id

    const device = deviceService.getDevice(internalDeviceId)

    await deviceService.updateDevice(device.id, device.key, device.ip, brightness, colorTemperature);

    res.sendStatus(200)
}

module.exports = {
    handlePatch
}
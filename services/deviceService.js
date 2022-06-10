const TuyAPI = require("tuyapi");

const getDevice = (internalDeviceId) => {
    // The following would be swapped out with a call to a database to retrieve this info.
    // However, this setup is not worth it as I currently only want to control *one* device.

    return {
        id: process.env.DEVICE_ID,
        key: process.env.DEVICE_KEY,
        ip: process.env.DEVICE_IP,
    }
}

const updateDevice = async (deviceId, deviceKey, IP, brightness, colorTemperature) => {
    const device = new TuyAPI({
        id: deviceId,
        key: deviceKey,
        version: 3.3,
        ip: IP
    });

    device.find().then(() => {
        device.connect();
    });

    device.on('connected', () => {
        console.log('Connected to device!');

        device.set({
            multiple: true,
            data: {
                '20': true,
                '21': 'white',
                '22': brightness,      // brightness 10 -> 1000
                '23': colorTemperature // colorTemp 0 -> 1000
            }
        }).then(() => {
            device.disconnect()
        })
    });

    device.on('disconnected', () => {
        console.log('Disconnected from device.');
    });

    device.on('error', error => {
        console.log('Error!', error);
    });

    setTimeout(() => {
        device.disconnect();
    }, 10000);
}

module.exports = {
    getDevice,
    updateDevice,
}
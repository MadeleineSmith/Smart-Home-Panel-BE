const TuyAPI = require("tuyapi");

const updateDevice = async (deviceId, deviceKey, IP, brightness, colorTemperature) => {
    let id = process.env.DEVICE_ID
    let key = process.env.DEVICE_KEY
    let ip = process.env.DEVICE_IP

    const device = new TuyAPI({
        id: id,
        key: key,
        version: 3.3,
        ip: ip
    });

    console.log(id, key, ip)

// Find device on network
    device.find().then(() => {
        // Connect to device
        device.connect();
    });

// Add event listeners
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

// Disconnect after 10 seconds
    setTimeout(() => {
        device.disconnect();
    }, 10000);
}

module.exports = {
    updateDevice
}
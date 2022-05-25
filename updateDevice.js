const TuyAPI = require('tuyapi');

async function updateDevice(deviceId, deviceKey, IP, brightness, colorTemperature) {
    let id = process.env.DEVICE_ID
    let key = process.env.DEVICE_KEY

    const device = new TuyAPI({
        id: id,
        key: key,
        version: '3.3',
    });

    console.log(id, key)

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
                '1': true,
                '2': 'white',
                '3': brightness, // brightness
                '4': colorTemperature // 1 = orange, 255 = blue white
            }
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

module.exports.updateDevice = updateDevice
const TuyAPI = require('tuyapi');

async function updateDevice(deviceId, deviceKey, IP, brightness, colorTemperature) {
    const device = new TuyAPI({
        id: process.env.DEVICE_ID,
        key: process.env.DEVICE_KEY,
        version: '3.3',
    });

// Find device on network
    device.find()
        .then(() => {
            // Connect to device
            device.connect();
        })
        .finally(() => {
            device.disconnect();
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
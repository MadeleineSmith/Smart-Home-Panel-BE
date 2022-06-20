# Smart Home Panel - BE repo

<mark>Insert giphy/video of website in use<mark>

## Background
* I wanted to build out a website to be able to control one of my smart bulbs in my home - instead of being reliant on the 'Smart Life' mobile app. This is the BE repo with the FE repo existing [here](https://github.com/MadeleineSmith/smart-bulbs-fe).
* Although, this solution works exactly as intended, arguably a far easier solution would be to buy a Raspberry Pi and install the [Home Assistant OS](https://www.home-assistant.io/) on it. But hey ho, you live and learn. 

## Running locally:
* Run `npm install` to install dependencies
* This code uses the [TuyAPI](https://github.com/codetheweb/tuyapi) repo as a dependency
* Follow their [setup instructions](https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md) to retrieve information of all your devices existing in the Smart Life/Tuya Smart app e.g:
  * ```
    [{
        name: 'yah',
        id: 'xxxxxxxxxxxxxxxxxx',
        key: 'xxxxxxxxxxxxxxxx'
      },
      {
        name: 'yah2',
        id: 'xxxxxxxxxxxxxxxxxx',
        key: 'xxxxxxxxxxxxxxxx'
      }]
    ```
  * (This is done via running `tuya-cli wizard` in a terminal)
* To specify which device you wish to control, specify the following three pieces of information as environment variables:
  * ```
      DEVICE_ID=xxxxxxxxxxxxxxxxxx;
      DEVICE_KEY=xxxxxxxxxxxxxxxx;
      DEVICE_IP=xxx.xxx.xxx.xxx;
    ```
  * `DEVICE_ID` and `DEVICE_KEY` are retrieved from the `tuya-cli wizard` command above. `DEVICE_IP` is retrieved from <mark>fill this in</mark>
* Run `npm run start` to run the code
* I'm changing the brightness and color temperature of my bulb by running a PATCH request to `/devices/dummy-device-id` e.g:
  * ```
    curl --location --request PATCH '{{local-url}}/devices/1' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "brightness": 500,
    "colorTemperature": 10
    }'
    ```
* My bulb has properties '22' and '23' for adjusting the brightness and color temperature. I don't believe this is standard - you might have to change these numbers within [deviceService.js](https://github.com/MadeleineSmith/smart-bulbs-be/blob/master/services/deviceService.js)
* Likewise, for my bulb, brightness and color temperature exist on a scale of 1 to 1000. I don't believe there is a standard for this (I've seen it 1 to 255 as well) - so you might have to play around with the values you pass in to the PATCH request.

# Smart Home Panel - BE repo

<mark>Insert giphy/video of website in use<mark>

---

## Background:
* I wanted to build out a **website** to be able to control one of my smart bulbs in my home - instead of being reliant on the 'Smart Life' mobile app. This is the BE repo with the FE repo existing [here](https://github.com/MadeleineSmith/smart-bulbs-fe).
* Although, my solution works exactly as intended, arguably a far easier solution would be to buy a Raspberry Pi and install the [Home Assistant OS](https://www.home-assistant.io/) on it. But hey ho, you live and learn. 

---

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
  * `DEVICE_ID` and `DEVICE_KEY` are retrieved from the `tuya-cli wizard` command above. `DEVICE_IP` is retrieved from <mark>fill this in - this is private ip</mark>
* Run `npm run start` to run the code
* I'm changing the brightness and color temperature of my bulb by running a PATCH request to `/devices/dummy-device-id` e.g:
  * ```
    curl --location --request PATCH '{{LOCAL-URL}}/devices/1' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "brightness": 500,
    "colorTemperature": 10
    }'
    ```
* My bulb has properties '22' and '23' for adjusting the brightness and color temperature. I don't believe this is standard - you might have to change these numbers within [deviceService.js](https://github.com/MadeleineSmith/smart-bulbs-be/blob/master/services/deviceService.js)
* Likewise, for my bulb, brightness and color temperature exist on a scale of 1 to 1000. I don't believe there is a standard for this (I've seen it 1 to 255 as well) - so you might have to play around with the values you pass in to the PATCH request.

---

## Hosting the BE:
* I decided to host the BE on [Heroku](https://www.heroku.com/) as it's free 🤑
* If you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed, run the following:
  * ```
    heroku create {{APP-NAME}}
    git push heroku
    ```
* Setting the values of the env vars is a bit more of a challenge than local development:
  * Use `heroku config:set NAME=VALUE` on the command line to set these
  * `DEVICE_ID` and `DEVICE_KEY` are the same as when running locally
  * You can't use the same `DEVICE_IP` as before due to this being private IP i.e. inaccessible outside your home network. See the next section on how to set up port forwarding on your router and then fill this var in.

---

## Setting up port forwarding:
* Port forwarding allows you to [send incoming data from the internet to a specified device on your network](https://portforward.com/). Your router blocks incoming connections by default.
* Essentially, for our use case, port forwarding enables a specific port on a router to forward on traffic to a specific private IP address i.e. the IP address of our device.
* Each router brand will probably have a different way of accomplishing this, but the essential steps are as follows:
  * Log in to your router as admin 
  * Make the private IP of the smart device static
  * Add a 'service' which determines what the start/end port numbers are. The smart device needs to be hit on port 6668
  * Add a 'firewall rule' which determines the destination ip i.e. your device's static IP, as above
* For a Now TV router, the set-up instructions are as [follows](https://community.nowtv.com/t5/Setup-Performance/Port-Forwarding/m-p/552730/highlight/true#M7348)
* Once port forwarding is set up correctly (you can use a site like [Port Checker](https://portchecker.co/check) to check), the value of the `DEVICE_IP` environment variable is {{WAN-ADDRESS}}:{{START-PORT-NUM}}

---

## Using a dynamic DNS service
* However, the issue with using a WAN address for this environment variable is that this is likely to change periodically - which stops the application working. 
* A solution to this would be to set up a static WAN - however my broadband provider doesn't provide this service.
* The solution I used was to use [No-IP](https://www.noip.com)’s (free) dynamic DNS service. This allows you to create a custom hostname which automatically updates its record of the WAN it maps to.
* I initially downloaded their '[Dynamic DNS Update Client (DUC)](https://www.noip.com/download)' for Mac which allowed me to set up a hostname which maps to my IP. 
* However, if I take my Mac out of my house, my IP will change - again breaking the application 😢
* A better solution was to buy a Raspberry Pi which always lives at my house and then installing their [DUC](https://www.noip.com/support/knowledgebase/install-ip-duc-onto-raspberry-pi/) on that instead.
* And then the value of the `DEVICE_IP` environment variable is your custom hostname.

---

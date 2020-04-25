# MMM-ShellyDimmer
MMM-ShellyDimmer is a module for the [MagicMirror](https://github.com/MichMich/MagicMirror) project by [Michael Teeuw](https://github.com/MichMich).

It uses a [ShellyDimmer](https://shelly.cloud/wifi-smart-shelly-rgbw-2/) to control brightness of 4 led strips.

## Installation
Clone the module into your MagicMirror module folder and execute `npm intall` in the module's directory.
```
git clone https://github.com/exKAjFASH/MMM-ShellyDimmer.git
cd MMM-ShellyDimmer
npm install
```

## Configuration
To display the module insert it in the config.js file. Here is an example:

## Minimal configuration
At minimal configuration you should specify ip of your Shelly RGBW2 device.
```js
{
  module: 'MMM-ShellyDimmer',
  position: 'top_left',
  config: {
    ip: "192.168.1.100"
  }
},
```
## Personalized configuration
this is the default configuration defined if you don't define any value

```js
{
  module: 'MMM-NewPIR',
  position: 'top_left',
  config: {
      ip: "192.168.1.100",
      text: "Shelly Dimmer",
      debug: true,
      init_level: 10
  }
},
```

<br>

| Option  | Description | Type | Default |
| ------- | --- | --- | --- |
| ip | IP address of your Shelly RGBW2 device | String | 192.168.1.1 |
| text | Set the text of this component | String | "Shelly Dimmer" |
| debug | Show debug information in log file | Boolean | false |
| init_level | Default brightness level after initialization of the module | Integer | 10 |

## Change Log

### 2020-25-04
- Cleaned up unnecessary code
- Updated readme file

### 2020-17-03
- Initial draft version repo added

const request = require('request')

const weather_key= process.env.weather_key

const forecast = (latitude, longitude, callback) => {
    // const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    const url = 'https://api.tomorrow.io/v4/timelines?location=' + latitude + ',' + longitude + '&fields=temperature&timesteps=1h&units=metric&apikey='+weather_key
    // console.log(url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            // console.log(body.data.timelines[0].intervals[0])
            callback(undefined, body.data.timelines[0].intervals[0].values.temperature + ' degress out.' )
        }
    })
}

module.exports = forecast
const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=760636deb0b83251b5f593234dfc6d99&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({url, json: true}, (error, {body} = {}) =>{
    //console.log(response.body.current)
    if (error) {
        callback('Unable to connect to the Internet!', undefined)
    } else if (body.current.weather_descriptions.length === 0) {
        callback('Unable to find data for given location. Please try again!', undefined)

    } else {
        console.log(body.current)
        callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out.' + ' It feels like ' + body.current.feelslike + ' degrees out.' + ' The humidity is ' + body.current.humidity)
    }
    // console.log(response.body.current.weather_descriptions[0])
    // console.log('It is currently ' + response.body.current.temperature + ' degrees out.')
    // console.log('It feels like ' + response.body.current.feelslike + ' degrees out.')
    })
}

module.exports = forecast
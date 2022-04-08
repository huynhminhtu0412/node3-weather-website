const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
//Define path for Express config
const publicDirectoryPath = path.join(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Minh Tu'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name: 'Minh Tu'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message: 'This is a help page.',
        title: 'Help',
        name:'Minh Tu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must input an address'
        })
    }
    
    //setup default object
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error,forecastData) =>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        })
    })
})

// 
//App.com
//App.com/help
//App.com/about

app.get('/help/*', (req, res) => {
    res.render('404',{
        message: 'Help article not found',
        title: '404',
        name:'Minh Tu'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        message: 'Page not found',
        title: '404',
        name:'Minh Tu'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

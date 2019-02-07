const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require("request");
const apiKey = "a4aaefb7b7783a86af0a40a019a673a7";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'))


app.get('/', (req, res) => {
    res.render('index',{weather: null, error: null})
});




app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, (err, response, body) => {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${(weather.main.temp - 32)/1.8} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
    console.log(req.body.city);
})

app.listen(5000);
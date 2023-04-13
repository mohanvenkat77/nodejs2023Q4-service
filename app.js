const express = require('express')
const app = express()
app.use(express.urlencoded());
app.use(express.json())
const user=require('./routes/user')
const artist=require('./routes/artist')
const album=require('./routes/albums')
const track=require('./routes/track')
const favs=require('./routes/favorites')

app.use('/',user)
app.use('/',artist)
app.use('/',album)
app.use('/',track)
app.use('/',favs)
module.exports = app;
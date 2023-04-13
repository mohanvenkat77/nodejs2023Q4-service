const express=require('express')
const route=express.Router()
const { v4: uuidv4 } = require("uuid");
const Track=require('../models/Track')
const Artist=require('../models/Artist')
const Album=require('../models/Album')
const Favorites=require('../models/Favorites')
const {uuid}=require('uuid')

// Sample data for favorite records
// let favoriteArtists = [];
// let favoriteAlbums = [];
// let favoriteTracks = [];
function isValidUUID(uuid) {
    const uuidv4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9|a|b][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidv4Pattern.test(uuid);
  }
  
// GET /favs - Get all favorite records, split by entity type
route.get('/favs',async (req, res) => {
    let favoriteArtists=await Favorites.find()
  res.status(200).send(favoriteArtists);
});


route.post('/favs/track/:id',async (req, res) => {
    const trackId = req.params.id;
try {
    if (!isValidUUID(trackId)) {
      return res.status(400).json({ message: 'Invalid track ID' });
    }
  
    const track =await Track.findOne({id:trackId});

    if (!track) {
      return res.status(422).json({ message: 'Track not found' });
    }
   let data=await Favorites.find()
   console.log(data[0].tracks);
   let dat=data[0].tracks
   console.log(dat);
let arr=[...dat,track.id];

console.log(arr);
    await Favorites.updateMany({},{"$set":{tracks:arr}},{new:true})
    res.status(201).send(await Favorites.find());

} catch (error) {
    res.status(404).send(error.message)
}
});





route.delete('/favs/track/:id', async(req, res) => {
  const trackId = req.params.id;
try {
    if (!isValidUUID(trackId)) {
        return res.status(400).json({ message: 'Invalid track ID' });
      }
      let data=await Favorites.find()
console.log(data[0].tracks);
let arr=[...data[0].tracks]
      const index = arr.findIndex((track) => track === trackId);
      if (index === -1) {
        return res.status(404).json({ message: 'Track not found in favorites' });
      }
    
      arr.splice(index, 1);
      console.log("jiiii");
      await Favorites.updateMany({},{"$set":{tracks:arr}},{new:true})
      res.status(200).send(await Favorites.find());
} catch (error) {
    res.status(404).send(error.message)
}
});




route.post('/favs/album/:id',async (req, res) => {
  const trackId = req.params.id;
try {
  if (!isValidUUID(trackId)) {
    return res.status(400).json({ message: 'Invalid Album ID' });
  }

  const album =await Album.findOne({id:trackId});

  if (!album) {
    return res.status(422).json({ message: 'Track not found' });
  }
 let data=await Favorites.find()
 console.log(data[0].albums);
 let dat=data[0].albums
 console.log(dat);
let arr=[...dat,album.id];

console.log(arr);
  await Favorites.updateMany({},{"$set":{albums:arr}},{new:true})
  res.status(201).send(await Favorites.find());

} catch (error) {
  res.status(404).send(error.message)
}
});





route.delete('/favs/album/:id', async(req, res) => {
const trackId = req.params.id;
try {
  if (!isValidUUID(trackId)) {
      return res.status(400).json({ message: 'Invalid track ID' });
    }
    let data=await Favorites.find()
console.log(data[0].albums);
let arr=[...data[0].albums]
    const index = arr.findIndex((track) => track === trackId);
    if (index === -1) {
      return res.status(404).json({ message: 'Track not found in favorites' });
    }
  
    arr.splice(index, 1);
    console.log("jiiii");
    await Favorites.updateMany({},{"$set":{albums:arr}},{new:true})
    res.status(200).send(await Favorites.find());
} catch (error) {
  res.status(404).send(error.message)
}
});





route.post('/favs/artist/:id',async (req, res) => {
  const trackId = req.params.id;
try {
  if (!isValidUUID(trackId)) {
    return res.status(400).json({ message: 'Invalid Album ID' });
  }

  const album =await Artist.findOne({id:trackId});

  if (!album) {
    return res.status(422).json({ message: 'Track not found' });
  }
 let data=await Favorites.find()
 console.log(data[0].artists);
 let dat=data[0].artists
let arr=[...dat,album.id];

console.log(arr);
  await Favorites.updateMany({},{"$set":{artists:arr}},{new:true})
  res.status(201).send(await Favorites.find());

} catch (error) {
  res.status(404).send(error.message)
}
});





route.delete('/favs/artist/:id', async(req, res) => {
const trackId = req.params.id;
try {
  if (!isValidUUID(trackId)) {
      return res.status(400).json({ message: 'Invalid track ID' });
    }
    let data=await Favorites.find()

let arr=[...data[0].artists]
console.log(arr);
    const index = arr.findIndex((track) => track === trackId);
    if (index === -1) {
      return res.status(404).json({ message: 'Track not found in favorites' });
    }
  
    arr.splice(index, 1);
    await Favorites.updateMany({},{"$set":{artists:arr}},{new:true})
    res.status(200).send(await Favorites.find());
} catch (error) {
  res.status(404).send(error.message)
}
});





module.exports=route;
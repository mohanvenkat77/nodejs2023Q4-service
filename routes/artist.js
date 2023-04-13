const express = require('express');
const route=express.Router()
const Artist=require('../models/Artist')
const { v4: uuidv4 } = require("uuid");
const { router } = require('../app');

const Track=require('../models/Track')
// const Artist=require('../models/Artist')
const Album=require('../models/Album')
const Favorites=require('../models/Favorites')

function isValidUUID(uuid) {
  const uuidv4Pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9|a|b][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidv4Pattern.test(uuid);
}


route.get('/artist',async (req, res) =>{
    try {
        const data=await Artist.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


route.get('/artist/:id',async (req, res) => {
    const id= req.params.id
    try {
      if (!isValidUUID(id)) {
        return res.status(400).json({ message: "Invalid track ID" });
      }
    
        return res.status(200).send(data);
      } catch (error) {
        return res.status(404).send("Artist id is invalid");
      }
})



route.post('/artist', async (req, res) => {
    const {name,grammy}=req.body
    try {
const uid=uuidv4()
        if(grammy === "" || !name) return res.status(404).send("name and grammy are required")
        const data=new Artist({id:uid,name,grammy})
        await data.save();
        res.status(200).send(data)
    } catch (error) {
 
res.status(404).send(error.message)
    }
})



route.put("/artist/:id", async (req, res) => {
    const id = req.params.id;
    const { name,grammy } = req.body;
    try {
      if (!isValidUUID(id)) {
        return res.status(400).json({ message: "Invalid track ID" });
      }
  
      await Artist.findOneAndUpdate(
        {id:id},
        { name,grammy},
        { new: true }
      );
      res.status(200).send(await Artist.findOne({id:id}));
    } catch (error) {
      res.status(400).send("Artist id is invalid");
    }
  });
  
  route.delete("/artist/:id", async (req, res) => {
    const id = req.params.id;
    try {
      if (!isValidUUID(id)) {
        return res.status(400).json({ message: "Invalid track ID" });
      }
  
      await Album.updateOne({id:id},{"$set":{artistId:null}},{new:true})
      await Track.updateOne({id:id},{"$set":{artistId:null}},{new:true})


      let dat=await Favorites.find()
      let arr=[...dat[0].artists]
      console.log(arr);
          const index = arr.findIndex((track) => track === id);
          if (index === -1) {
            return res.status(404).json({ message: 'Track not found in favorites' });
          }
        
          arr.splice(index, 1);
          await Favorites.updateMany({},{"$set":{artists:arr}},{new:true})

      await Artist.findOneAndDelete({id:id});
  
      res.status(204).send("Artist deleted sucessfully..........");
    } catch (error) {
      res.status(404).send("Artist id is inavlid");
    }
  });



module.exports=route
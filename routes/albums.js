const express = require("express");
const route = express.Router();
const { v4: uuidv4 } = require("uuid");
const Track = require("../models/Track");
const Artist = require("../models/Artist");
const Album = require("../models/Album");
const Favorites = require("../models/Favorites");

function isValidUUID(uuid) {
  const uuidv4Pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9|a|b][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidv4Pattern.test(uuid);
}

route.get("/album", async (req, res) => {
  try {
    const data = await Album.find();

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.get("/album/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid track ID" });
    }
    let data = await Album.findOne({ id: id });

    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("Album id is invalid");
  }
});

route.post("/album", async (req, res) => {
  const { name, year, artistId } = req.body;
  try {
    if (!name || !year || !artistId) {
      return res.status(400).send("name year artist id is required");
    }

    const uid = uuidv4();

    const data = new Album({ id: uid, name, year, artistId });
    await data.save();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.put("/album/:id", async (req, res) => {
  const id = req.params.id;
  const { name, year, artistId } = req.body;
  try {
    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid track ID" });
    }
    let data = await Album.findOne({ id: id });

    await Album.findOneAndUpdate(
      { id: id },
      { name, year, artistId },
      { new: true }
    );
    res.status(200).send(await Album.findById(id));
  } catch (error) {
    res.status(400).send("Artist id is invalid");
  }
});

route.delete("/album/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid track ID" });
    }
    const data = await Album.findOne({id: id });
    console.log(data);

    if (!data) {
      return res.status(400).send("Album does not exist");
    }

    await Track.updateOne(
      { id: id },
      { "$set": { albumId: null } },
      { new: true }
    );

    let dat = await Favorites.find();
console.log(dat);
    let arr = [...dat[0].albums];
    console.log(arr);
    const index = arr.findIndex((track) => track === id);
    if (index === -1) {
      return res.status(404).json({ message: "Track not found in favorites" });
    }
    arr.splice(index, 1);
    console.log(arr);
    await Favorites.updateMany({}, { $set: { artists: arr } }, { new: true });
    console.log("ooo4444444444o");
    await Album.findOneAndDelete({id:id});
    console.log("oo2222222222222222oo");
    res.status(204).send("album deleted sucessfully..........");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = route;

const express = require("express");
const route = express.Router();
const { v4: uuidv4 } = require("uuid");
const Track = require("../models/Track");
function isValidUUID(uuid) {
  const uuidv4Pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8|9|a|b][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidv4Pattern.test(uuid);
}

route.get("/Track", async (req, res) => {
  try {
    const data = await Track.find();

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.get("/Track/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid track ID" });
    }
let data=await Track.findOne({id:id})
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send("Track id is invalid");
  }
});

route.post("/Track", async (req, res) => {
  const { name, artistId, albumId, duration } = req.body;
  try {
    if (!name || !albumId || !duration || !artistId) {
      return res.status(400).send("name albumId artistid duration is required");
    }

    const uid = uuidv4();

    const data = new Track({ id: uid, name, artistId, albumId, duration });
    await data.save();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.put("/Track/:id", async (req, res) => {
  const id = req.params.id;
  const { name, artistId, albumId, duration } = req.body;
  try {
    const data = await Track.findOne({id:id});

    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid track ID" });
    }

    await Track.findByIdAndUpdate(
      id,
      { name, artistId, albumId, duration },
      { new: true }
    );
    res.status(200).send(await Track.findById(id));
  } catch (error) {
    res.status(400).send("Artist id is invalid");
  }
});

route.delete("/Track/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Track.findOne({id:id});

    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid track ID" });
    }

    await Track.findByIdAndDelete(id);

    res.status(204).send("Track deleted sucessfully..........");
  } catch (error) {
    res.status(404).send("Track id is inavlid");
  }
});

module.exports = route;

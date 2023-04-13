const express = require("express");
const route = express.Router();
const { v4: uuidv4 } = require("uuid");
const { UserDto } = require("../dto/userDto");
const { UpdatePasswordDto } = require("../dto/UpdatePasswordDto");
const User = require("../models/User");
const { router } = require("../app");

route.get("/user", async (req, res) => {
  const data = await User.find();
  res.status(200).send(data);
});

route.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findById(id);
    if (!data) {
      return res.status(404).send("User id not exists");
    }

    return res.status(200).send(data);
  } catch (error) {
    return res.status(404).send("User id is invalid");
  }
});

////////////post request-----------------//////////
route.post("/post", async (req, res) => {
  let { login, password } = req.body;
  try {
    if (!login || !password) {
      return res.status(404).send("login and password are required");
    }
    let uid = uuidv4();
    let obj = new UserDto(login, password);

    let nobj = new User({
      id: uid,
      login: obj.login,
      password: obj.password,
      version: 1,
    });
    await nobj.save();
    res.send(nobj).status(201);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

route.put("/user/:id", async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;
  try {
    const obj = new UpdatePasswordDto(oldPassword, newPassword);

    const data = await User.findById(id);

    if (!data) {
      return res.status(404).send("User does not exist");
    }
    if (data.password !== obj.oldPassword) {
      return res.status(403).send("old password is incorect..");
    }
    data.version += 1;

    await User.findByIdAndUpdate(
      id,
      { password: obj.newPassword, version: data.version },
      { new: true }
    );
    res.status(200).send(await User.findById(id));
  } catch (error) {
    res.status(400).send("userid is invalid");
  }
});

route.delete("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await User.findById(id);

    if (!data) {
      return res.status(400).send("User does not exist");
    }

    await User.findByIdAndDelete(id);

    res.status(204).send("user deleted sucessfully..........");
  } catch (error) {
    res.status(404).send("User id is inavlid");
  }
});

module.exports = route;

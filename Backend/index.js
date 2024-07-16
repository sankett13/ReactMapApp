const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const user = require("./models/User");

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

//Jy7Jy9qNjxSxMemD
const uri =
  "mongodb+srv://sanket13052004:Jy7Jy9qNjxSxMemD@cluster0.mgwlyo1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name,email,password);
    const userdoc = await user.create({
      fullName: name,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });
    res.json(userdoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userdoc = await user.findOne({ email });
  const validpass = bcrypt.compareSync(password, userdoc.password);

  if (validpass) {
    res.json(userdoc);
  } else {
    res.status(400).json("Wrong Credential");
  }
});

app.listen(8080, () => {
  console.log("Server Listening to port 8080");
});

const express = require("express")
const multer = require("multer")
const path = require('path')

const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // this is the folder of where to upload it
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    // this gives the uploaded file an unique name
    cb(null, Date.now() + "-" + file.originalname)
  },
})

// uploadStorage is the middleware which accepts a storage engine 
const uploadStorage = multer({ storage: storage })

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// Single file
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  // "file" is the key we have to put in postman in the body, it has to match exactly
  // if we put uploadStorage.single("image") then in postman the key would be "image"
  console.log(req.file)
  return res.send("Single file")
})
//Multiple files
app.post("/upload/multiple", uploadStorage.array("files", 10), (req, res) => {
  // 10 is up to how many files it will accept at the time
  console.log(req.files)
  return res.send("Multiple files")
})

app.listen(5000 || process.env.PORT, () => {
  console.log("Server on...")
})
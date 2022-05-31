const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//------MySQL database-------//
const mysql = require('mysql')

//Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_react_task'
})

//Connect
db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('MySQL Connected...')
})

const app = express()


app.use(cors())
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

// For get Request
app.get('/api/get', (req, res) => {
  const sqlSelect = `SELECT * FROM TASK`
  db.query(
    sqlSelect,
    (err, result) => {
      //
      // console.log("Result are:", result)

      var json = [];
      var tmp;
      //
      for (var i = 0; i < result.length; i++) {
        //
        // console.log("Line no is :", i + 1)
        //
        // var temp = {}
        //
        const trackId = result[i].TRACK_ID
        // console.log("TrackId ARE:", trackId)

        const processName = result[i].PROCESS_NAME
        // console.log("Process Name", processName)

        const workLocation = result[i].WORK_LOCATION
        // console.log("Work Location", workLocation)
        //
        const imgdata = Buffer.from(result[i].PHOTO, 'base64').toString("ascii")
        // console.log("ImageData:", imgdata)
        //
        tmp = { "TRACK_ID": trackId, "PROCESS_NAME": processName, "WORK_LOCATION": workLocation, "PHOTO": imgdata }
        json.push(tmp);

      }
      // console.log("Insert array:", json)
      res.send(json)
      //
      // var stringJson = JSON.stringify(json);
      // console.log("Insert array to json format: ", stringJson)
      //
      // if (err) {
      //   console.log(err);
      //   return res.status(500).json({
      //     success: 0,
      //     message: "Database connection error",
      //   });
      // }
      // return res.status(200).json({
      //   message: "Data sent successfully",
      //   success: 1,
      //   trackId: trackId,
      //   processName: processName,
      //   workLocation: workLocation,
      //   imgdata: imgdata
      // });
      //

    }
  );
});

app.post("/api/insert", (req, res) => {
  let postData = req.body;
  console.log(postData);
  let sqlInsert = `INSERT INTO TASK (TRACK_ID, PROCESS_NAME, WORK_LOCATION, PHOTO) VALUES( ?, ?, ?, ?)`
  db.query(
    sqlInsert,
    [postData.trackId, postData.process_name, postData.work_location, postData.file_base64_string],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: result,
      });
    }
  );
});

app.listen(3001, () => {
  console.log("Running on port 3001")
})
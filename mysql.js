const express = require("express"); //import express
const cors = require("cors");
const app = express();
const mysql = require("mysql");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crms_dbb",
});


//users_table requests

app.get("/user", (req, res) => {
  const SelectQuery = "select * from user";
  db.query(SelectQuery, (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: "sql err" });
    else return res.json({ data });
  });
});

app.post("/createuser", (req, res) => {
  const insertQuery = `insert into user(fname,lname,email,password,police_ID)
    values(?)`;

  const values = [...Object.values(req.body)];
  console.log("insert", values);
  db.query(insertQuery, [values], (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: "sql err" });
    else return res.json({ data });
  });
});

///






//crimes_recods_table requests

app.get("/getCrimeRecods", (req, res) => {
  const SelectQuery = "select * from crimes_records";
  db.query(SelectQuery, (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: "sql err" });
    else return res.json({ data });
  });
});


//create crime record
app.post("/creatCrimeRecord", (req, res) => {
  const insertQuery = `insert into crimes_records(fname,lname,gender,age,dob,address,occupation,nationality,tribe,village,chief,district,contact,offence,date_of_offence,date_reported,date_of_arrest,value_of_property_stolen,court_date,crime_location,image,statement)
    values(?)`;

  const values = [...Object.values(req.body)];
  console.log("insert", values);
  db.query(insertQuery, [values], (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: "sql err" });
    else return res.json({ data });
  });
});


//update crime records
app.put('/updatecrimerecords', (req, res) => {
  const { longitude, latitude ,location} = req.body;
  const sql = `UPDATE crimes_records SET latitude = ${latitude}, longitude = ${longitude} WHERE crime_location = '${location}'`;

  db.query(sql, (error, results, fields) => {
    if (error) throw error;
    res.send({ message: 'User age and surname updated successfully!' });
  });
});

app.put("/update/:userId", (req, res) => {
  const id = req.params.userId;
  console.log("updated " + req.body);
  const data = req.body;
  const updateQuery =
    "update crimes_records set " +
    Object.keys(data)
      .map((k) => `${k} = ?`)
      .join(",") +
    " where id='" +
    id +
    "'";
  console.log(updateQuery);
  db.query(updateQuery, [...Object.values(data)], (err, out) => {
    console.log(err, out);
    if (err) return res.json({ error: err.message });
    else {
      return res.json({ data: out });
    }
  });
});

// app.put("/user/:name", (req, res) => {
//   const id = req.params.userId;
//   console.log("updated " + req.body);
//   const data = req.body;
//   const updateQuery =
//     "update crimes_records set " +
//     Object.keys(data)
//       .map((k) => `${k} = ?`)
//       .join(",") +
//     " where id='" +
//     id +
//     "'";
//   console.log(updateQuery);
//   db.query(updateQuery, [...Object.values(data)], (err, out) => {
//     console.log(err, out);
//     if (err) return res.json({ error: err.message });
//     else {
//       return res.json({ data: out });
//     }
//   });
// });

//delete crime records
app.delete("/deletecrimerecord/:userId", (req, res) => {
  const id = req.params.userId;
  console.log("deleting " + id, req.body);
  const { productThumbnail } = req.body;
  console.log(req.body);
  const deletQuery = `DELETE FROM crimes_records WHERE id= ?`;
  db.query(deletQuery, [id], (err, data) => {
    console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else res.json({data})
  })
})





//

app.listen(8001, () => {
  console.log("listening on port 8001");
});




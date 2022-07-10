const express=require("express");

const usersRoutes=express.Router();

const dbo=require("../db/conn");

const ObjectId=require("mongodb").ObjectId;

usersRoutes.route("/users/:username/:password").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { $and:[{"username":req.params.username},{"password":req.params.password}] };
    db_connect
      .collection("users")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

usersRoutes.route("/users").get(function (req, res) {
    let db_connect = dbo.getDb("school");
    db_connect
      .collection("users")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

usersRoutes.route("/users/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("users")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
});


usersRoutes.route("/users/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      username: req.body.username,
      password: req.body.password,
      authority: req.body.authority,
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

usersRoutes.route("/userUpdate/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {   
      $set: {     
        username: req.body.username,    
        password: req.body.password,   
        authority: req.body.authority
      }
     }
     db_connect.collection("users").updateOne( myquery, newvalues,function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

usersRoutes.route("/userDelete/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("users").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
});

module.exports=usersRoutes;
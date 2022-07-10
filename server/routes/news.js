const express=require("express");

const newsRoutes=express.Router();

const dbo=require("../db/conn");

const ObjectId=require("mongodb").ObjectId;

newsRoutes.route("/news").get(function (req, res) {
    let db_connect = dbo.getDb("school");
    db_connect
      .collection("news")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

newsRoutes.route("/news/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("news")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
});


newsRoutes.route("/news/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      header: req.body.header,
      content: req.body.content,
      date: req.body.date,
    };
    db_connect.collection("news").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

newsRoutes.route("/newsUpdate/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
      $set: {     
        header: req.body.header,    
        content: req.body.content,   
        date: req.body.date,
      }, 
     }
});

newsRoutes.route("/newsDelete/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("news").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
});

module.exports=newsRoutes;
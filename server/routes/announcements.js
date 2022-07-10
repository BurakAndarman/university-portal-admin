const express=require("express");

const announcementsRoutes=express.Router();

const dbo=require("../db/conn");

const ObjectId=require("mongodb").ObjectId;

announcementsRoutes.route("/announcements").get(function (req, res) {
    let db_connect = dbo.getDb("school");
    db_connect
      .collection("announcements")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

announcementsRoutes.route("/announcements/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("announcements")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
});


announcementsRoutes.route("/announcements/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      header: req.body.header,
      content: req.body.content,
      date: req.body.date,
    };
    db_connect.collection("announcements").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

announcementsRoutes.route("/announcementsUpdate/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
      $set: {     
        header: req.body.header,    
        content: req.body.content,   
      }, 
    }
    db_connect.collection("announcements").updateOne( myquery, newvalues,function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

announcementsRoutes.route("/announcementsDelete/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("announcements").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
});

module.exports=announcementsRoutes;
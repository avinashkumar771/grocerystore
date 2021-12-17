var express = require('express');
var router = express.Router();
var {MongoClient,ObjectId} = require("mongodb")
var client = new MongoClient("mongodb+srv://avinash:MSdhoni%40007@cluster0.dchw9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
/* GET home page. */
router.get('/', async function (req, res) {
    try {
        var connection = await client.connect();
        var db = connection.db("grocerystore")
        var foodItems = await db.collection("grocerylist").find({}).toArray()
        res.json(foodItems)
        await connection.close()
    } catch (error) {
        console.log(error)
    }
});

router.get('/res/:id', async function (req, res) {
    try {
        var connection = await client.connect();
        var db = connection.db("grocerystore")
        var foodItem = await db.collection("grocerylist").findOne({_id:ObjectId(req.params.id)})
        res.json(foodItem)
        await connection.close()
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;


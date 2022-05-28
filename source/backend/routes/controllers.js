var express = require('express');
var app = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const { collection } = require('../models/userSchema');

app.get('/test', function (req, res, next) {
    res.send("cc")
});

app.get('/getcollection', async (req, res) => {
    const id = req.session.user_id;
    const info = await User.findById(id);
    const { collectionSet } = info;
    res.send(collectionSet);
})

app.put('/addcollection', async (req, res) => {
    const id = req.session.user_id;
    const {name, favorite} = req.body.collectionSet
    //const collection = await User.findByIdAndUpdate(id, req.body)
    const collection = await User.updateOne({ _id: id },
        {
            $push: 
            {
                collectionSet:
                    [{
                        name: name,
                        favorite: favorite                    
                    }]
            }       
        }    
    )
    res.send(collection)
})

app.put('/deletecollection', async (req, res) => {
    const id = req.session.user_id;
    const {name, favorite} = req.body.collectionSet
    //const collection = await User.findByIdAndUpdate(id, req.body)
    const collection = await User.updateOne({ _id: id },
        {
            $pull: 
            {
                collectionSet:
                    {
                        name: name,                  
                    }
            }       
        }    
    )
    res.send(collection)
})

app.put('/setFavorite', async (req, res) => {
    let setting;
    const id = req.session.user_id;    
    const {name, favorite} = req.body.collectionSet        
    if (favorite) {
        setting = 0
    } 
    else {
        setting = 1
    }    
    const collection = await User.updateOne({ _id: id, "collectionSet.name": name},                    
            {
                $set:{"collectionSet.$":
                    {   
                        name: name,
                        favorite: setting
                    }}
            }                   
    )
    res.send(collection)
})





module.exports = app;
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

app.post('/addcollection', async (req, res) => {
    const id = req.session.user_id;
    const {name} = req.body.collectionSet
    //const collection = await User.findByIdAndUpdate(id, req.body)
    const collection = await User.updateOne({ _id: id },
        {
            $push: 
            {
                collectionSet:
                    [{
                        name: name,
                        favorite: 0                    
                    }]
            }       
        }    
    )
    //It's weird that I can't return 1 in integer, js will consider it as a status code
    res.send("1")
})

app.delete('/deletecollection', async (req, res) => {
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
    res.send("1")
})

app.put('/setfavorite', async (req, res) => {
    let setting;
    const id = req.session.user_id;    
    const {name, favorite} = req.body.collectionSet        
                                
    const collection = await User.updateOne({ _id: id, "collectionSet.name": name},                    
            {
                $set:{"collectionSet.$":
                    {   
                        name: name,
                        favorite: favorite
                    }}
            }                   
    )
    res.send("1")
})





module.exports = app;
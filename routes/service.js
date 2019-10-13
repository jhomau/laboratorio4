const express = require('express');
var USER = require('../database/user');
var router = express.Router();
//INSERSION
/*router.post('/user', (req,res,next)=>{
    var params = req.body;
    params["registerdate"] = new Date();
    //params["rols"] = ["usuario"];
    var user = new USER(params);
    user.save().then(()=>{
        res.status(200).json(params);
    });
});*/
router.post('/user', async(req, res) => {   
    var params = req.body;
    params["registerdate"] = new Date();
    var users = new USER(params);
    var result = await users.save();
    res.status(200).json(result);  
}); 
router.get("/user", (req, res) => {
    var params = req.query;
    var limit = 100;
    var filter = {};
    if (params.limit != null) {  
        limit = parseInt(params.limit);
    }
    var order = 1;
    if (params.order != null) {  
        if (params.order == "desc") {    
            order = -1;  
        } else if (params.order == "asc") {    
            order = 1;  
        }
    }
    var skip = 0;
    if (params.skip != null) {  
        skip = parseInt(params.skip);
    }
    if (params.name != null) {
        filter = params.name;
    }
    if (params.email != null) {
        filter["email"] = params.email;
    }
    if (params.password != null) {
        filter["password"] = params.password;
    }
    if (params.id  != null) {
        filter["_id"] = params.id;
    }
    if (params.search != null){
        var regularexpresion = new RegExp(params.search, "g");
        filter["name"] = regularexpresion;
    }
    USER.find(filter).limit(limit).sort({_id: order}).skip(skip).exec((err, docs) => { 
        if(err){
            res.status(200).json({
                "msn":"Error en la Base de Datos."
            });
        }
        res.status(200).json(docs);
    })
});
router.patch("/user", (req, res) => {
    if (req.query.id == null) {  
        res.status(300).json({    
            msn: "Error no existe id"  
        });  
        return;
    }
    var id = req.query.id;
    var params = req.body;
    USER.findOneAndUpdate({_id: id}, params, (err, docs) => {  
        res.status(200).json(docs);
    })
}); 
router.delete("/user", async(req, res) => {
    if (req.query.id == null) {  
        res.status(300).json({    
            msn: "Error no existe id"  
        }); 
    return;
    }
    var r = await USER.remove({_id: req.query.id});
    res.status(300).json(r);
});
module.exports = router;
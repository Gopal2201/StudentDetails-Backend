const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors")
const jwt = require("jsonwebtoken")
const mongo = require("./DBConnection")
const AuthRoutes = require("./routes/AuthRoutes")
const StudentRoute = require("./routes/StudentRoute")
const Admin = require("./schema/adminSchema")
require("dotenv").config();

async function loadApp () {
    await mongo.connect();
    app.use(cors());
    app.use(express.json())
    
    app.use("/auth", AuthRoutes);

    app.use(async (req,res,next) => {
        if (!req.headers["authorization"]){
            return res.send("Please Login")
        }
        
        const token = await req.headers["authorization"].split(" ")[1];
        try{
            
            const user = await jwt.verify(token, "Gopal123", (err, data)=>{
                if(err){
                    return res.send("Please login");
                }
                const {_id} = data;
                Admin.findById(_id).then(userdata=>{
                    req.user = userdata;
                    next();
                })
            });
        } catch (err) {
            res.sendStatus(401);
        }
    })

    app.use("/student", StudentRoute)

    app.listen(process.env.PORT, () => {
        try {
            console.log("server started")
        } catch (err) {
            console.log("Error Starting App")
        }
    });
}

loadApp();
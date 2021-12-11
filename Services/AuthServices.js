const Admin = require("../schema/adminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.register = async (req,res) => {
    try {
        // To Check if user exist
        req.body.email = req.body.email.toLowerCase();
        const user = await Admin.findOne({email: req.body.email});
        if (user) { return res.send("Message: User Already Exists")};

        // Encrypt Password
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);

        // Creating new object
        const newUser = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        let response = await newUser.save();
        res.send({Message: "SignUp Successful", response});
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

exports.login = async (req,res,next) => {
    try {
        // To Check if id and password present
        if(!req.body.email || !req.body.password) {
            return res.send("Incorrect mail or password");
        }

        // To Check if user exist
        req.body.email = req.body.email.toLowerCase();
        const user = await Admin.findOne({email: req.body.email});
        if (!user) { return res.send("Incorrect mail or password")};

        // To Check password is correct or not
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) { return res.send("Incorrect mail or password") };

        // Generate Token
        const authToken = jwt.sign({_id: user._id}, "Gopal123")
        const {_id, name, email} = user;
        res.send({ Message: "User logged in successfully", authToken, user:{_id,name,email}});

    } catch (err) {
        console.log(err);
        res.send(err);
    }
}
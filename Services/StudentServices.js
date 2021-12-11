const Student = require("../schema/studentSchema");

// to send all student details
exports.list = async (req,res) => {
    try {
        const lists = await Student.find();
        res.send(lists);
    } catch (err) {
        res.send("error getting student list");
    }
}

// to create a new student
exports.create = async (req,res) => {
    try {
        // To check if student already exist 
        req.body.email = req.body.email.toLowerCase();
        const user = await Student.findOne({email: req.body.email});
        if (user) { return res.send("Message: Student Already Exists")};

        // if student doesn't exist 
        let {name,DOB,mobileno,email,department,address} = req.body;
        
        // calculating the Age of student
        DOB = new Date(DOB);
        const age = Math.floor((Date.now() - DOB) / 1000 / 60 / 60 / 24 / 365);
        
        //Creating new object
        const posts = new Student({
            name,
            DOB,
            mobileno,
            age,
            email,
            department,
            address
        })
        posts.save();
        res.send(posts)
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

// to Update the student document
exports.update = async (req,res) => {
    try {
        let {name, mobileno, email, DOB, department, address} = req.body;

        //calculating the age
        DOB = new Date(DOB);
        const age = Math.floor((Date.now() - DOB) / 1000 / 60 / 60 / 24 / 365);

        // updating recored with req.body data
        const response = await Student.findByIdAndUpdate(req.params.ID, {
            name,
            mobileno,
            email,
            DOB,
            department,
            address
        }, {new:true});
        res.send(response);
    } catch (err) {
        console.log(err)
    }
}

// To delete a student record
exports.delete = async (req,res) => {
    try {
        console.log(req.params)
        const response = await Student.findByIdAndRemove(req.params.ID);
        res.send("Record deleted");
    } catch (err) {
        console.log(err);
        res.send("error deleting the record");
    }
}
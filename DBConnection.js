const mongoose = require("mongoose")

exports.connect = () => {
    try {
        mongoose.connect(`${process.env.MONGODB_URL}`, {useNewUrlParser : true, useUnifiedTopology: true})
    } catch (err) {
        console.log(err);
        process.exit()
    }
}
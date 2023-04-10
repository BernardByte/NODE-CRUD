const MONGO_URL = "mongodb+srv://imran:lNVkk6m0uGc7w9Rr@cluster0.uiy5g.mongodb.net/Testing?retryWrites=true&w=majority";
const mongoose = require("mongoose");

const connectDB = async ()=> {
	try{
		const conn = await mongoose.connect(MONGO_URL, {
      		useNewUrlParser: true,
	        useUnifiedTopology: true
    	      });
		console.log(`DB connected: ${conn.connection.host}`);
	  } catch (error) {
	 	console.log(error);
	}
}

// exporting connectDB function
module.exports = connectDB
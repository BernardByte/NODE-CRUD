const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModels");
const app = express();

app.use(express.json());
// if we want form-encoded in postman/ thunder client use below line
app.use(express.urlencoded({extended:false}))


// connecting to MongoDB by mongoose
mongoose
.connect(
	"mongodb+srv://imran:lNVkk6m0uGc7w9Rr@cluster0.uiy5g.mongodb.net/Testing?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then(() => {
		console.log("Connected to Database.");
		app.listen(3000, () => {
			console.log("==== App Server running on port : 3000 ====");
		});
	})
	.catch((error) => {
		console.log(error);
	});

	// simple route
app.get("/", (req, res) => {
	console.log("Hello to NODE.js");
	res.send(req.body);
});

// CRUD operations

// creating product and saved into database
app.post("/product", async (req, res) => {
	try {
		let product = await Product.create(req.body);
		res.status(200).json(product);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

// getting all documents or 'records' from mongoDB
app.get("/product", async (req, res) => {
	try {
		let product = await Product.find({});
		res.status(200).json(product);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});
// getting one documents or 'records' by ID from mongoDB
app.get("/product/:id", async (req, res) => {
	try {
		let { id } = req.params;
		let product = await Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});
// updating one documents or 'records' by ID to mongoDB
app.put("/product/:id", async (req, res) => {
	try {
		let { id } = req.params;
		let product = await Product.findByIdAndUpdate(id, req.body);
		// show error message if nout found a document!
		if (!product) {
			res.status(404).json({ message: `found product with Id: ${id}` });
		} else {
			const updatedProduct = await Product.findById(id);
			res.status(200).json(updatedProduct);
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});

// deleting one documents or 'records' by ID from mongoDB
app.delete("/product/:id", async (req, res) => {
	try {
		let { id } = req.params;
		let product = await Product.findByIdAndDelete(id, req.body);
		// show error message if nout found a document!
		if (!product) {
			res.status(404).json({ message: `found product with Id: ${id}` });
		} else {
			res.status(200).json(product);
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ message: error.message });
	}
});


const express = require("express");
const userSchema = require("../model/userSchema");
const foodSchema = require("../model/foodSchema");
const plateformRoute = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const cors=require('cors');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../frontend/src/FoodImages")
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now()
      cb(null, file.originalname) 
    }
  })
  
  const upload = multer({ storage: storage })

// Food
plateformRoute.post("/create-food", upload.single("image"), async (req, res) => {
    console.log(req.body);
    // res.send("Uploaded");
    const imageName = req.file.filename;
    try{
        await foodSchema.create({
            foodName: req.body.foodName,
            category: req.body.category,
            price: req.body.price,
            serves: req.body.serves,
            stockAvailable: req.body.stockAvailable,
            prepTime: req.body.prepTime,
            image: imageName,
        })
        res.json({ status: "ok" });
    }catch(error){
        res.json({ status: error.response.data });
    }
})

plateformRoute.get("/food-list", async(req, res) => {
    try{
        foodSchema.find({}).then(data => {
            res.send({status: "ok", data: data})
        })
    }
    catch(error){
        res.json({ status: error });
    }
})

// Get food details by ID
plateformRoute.get("/food-details/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const food = await foodSchema.findById(id);
        res.json({ status: "ok", data: food });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});


// Update food
plateformRoute.put("/update-food/:id", upload.single("image"), async (req, res) => {
    const { id } = req.params;
    const { foodName, category, price, serves, stockAvailable, prepTime } = req.body;
    // const imageName = req.file.filename;

    try {
        let imageName;
        if (req.file) {
            imageName = req.file.filename;
        }
        await foodSchema.findByIdAndUpdate(
            id,
            {
                foodName,
                category,
                price,
                serves,
                stockAvailable,
                prepTime,
                image: imageName
            }
        );
        res.json({ status: "ok" });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Delete food
plateformRoute.delete("/delete-food/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the food item by ID and delete it
        const deletedFood = await foodSchema.findByIdAndDelete(id);
        if (!deletedFood) {
            // If the food item with the provided ID is not found, return a 404 status code
            return res.status(404).json({ status: "error", message: "Food item not found" });
        }
        res.json({ status: "ok", message: "Food item deleted successfully" });
    } catch (error) {
        // If an error occurs during the deletion process, return a 500 status code with the error message
        console.error("Error deleting food item:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
})


// --------------------------------------------------------------
// User

const app=express();
// app.use(cookieParser());




plateformRoute.use(cors({
    origin: 'http://localhost:3000', // Specify allowed origin
    credentials: true, // Allow cookies
  }));

  plateformRoute.use(cookieParser());

const maxAge=3*24*60*60;
const createToken = (id) => {
    return jwt.sign({id},'secret1135',{
        expiresIn:maxAge
    })
}

plateformRoute.get("/user-list", (req, res) => {
    userSchema.find((err, data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

plateformRoute.post("/create-user", upload.none(), async (req,res)=> {
    
    console.log(req.body);
    try{
        const user=await userSchema.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            // orders:{},
        })
        const token=createToken(user._id);

        res.cookie('JWT',token,{domain: '.localhost',path:"/",sameSite:'None', maxAge: maxAge*1000,secure:true})
        res.status(201).json({ user: user._id});
        // console.log("HI");
        // res.send("cookie sent successfully");
        
    }catch(error){
        res.json({ status: error.response });
    }
    console.log("hi",res.getHeaders());

})

plateformRoute.get("/set-cookies", async (req,res)=>{
    res.cookie('test5',true);
    res.send("you got the cookies");
    // alert("cookies set");
})



module.exports = plateformRoute;
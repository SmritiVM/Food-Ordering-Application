const mongoose = require("mongoose");
const {isEmail}=require("validator");
const bcrypt=require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please Enter Name'],
        minlength: [2,'Minimum name length is 2 characters']
    },
    email : {
        type:String,
        required: [true, 'Please Enter Email'],
        validate: [isEmail,'Please Enter a Valid Email'],
        unique: true
    },
    phone : {
        type:String, 
        unique: true,
        required: [true, 'Please Enter Phone Number'],
    },
    password: {
        type:String,
        required: [true, 'Please Enter Password'],
        minlength: [6,'Minimum password length is 6 characteres']
    },
    // "orders": {type: Array},
}, {
    collection: "users"
});

userSchema.pre('save',async function(next){
    const salt= await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});

userSchema.statics.login= async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth= await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error("Incorrect Password");
    }
    throw Error('incorrect Email');
}
module.exports = mongoose.model("userSchema", userSchema);
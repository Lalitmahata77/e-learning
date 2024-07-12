import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        publick_id :String,
        url : String
    },
    role : {
        type : String,
        default : "User"
    },
    isverified : {
        type : Boolean,
        default : false
    },
     courses : [{
 courseId : String,

    }]
}, {timestamps : true})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//JWT TOKEN
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id : this._id},
        process.env.JWT_SECRET, {
            expiresIn : "15d"
        }
    )
}
//isPassword correct
userSchema.methods.isPasswordCorrect = function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)
}
const User = mongoose.model("User", userSchema)
export default User
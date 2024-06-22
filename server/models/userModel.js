import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import becrypt from "bcryptjs"
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
    city : {
        type : String,
       
    },
    course:[{type: mongoose.Schema.Types.ObjectId, ref: 'course'}],
    role : {
        type : String,
        default : "user"
    },
    image : {
        type : String
    },
    isPromotion: {
        type : Boolean
    },
    resetPasswordToken : String,
    resetPasswordExpire : String
}, {timestamps : true})

//Encrypting password before saving the password
userSchema.pre("save", async function(next){
if (!this.isModified("password")) {
    next()
}
this.password = await becrypt.hash(this.password, 10)
})

//jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET, {
        expiresIn : "15d"
    })
}
//isPassword correct
userSchema.methods.isPasswordCorrect = function(enteredPassword){
    return becrypt.compare(enteredPassword, this.password)
}
//reset password token
userSchema.methods.getResetPasswordToken = function(){
    //get token
    const resetToken = crypto.randomBytes(20).toString("hex")

    //hash and reset password token failed
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")
      //set token expire time
      this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
      return resetToken
}
const User = mongoose.model("User", userSchema)
export default User
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    courseId : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    payment_info : {
        type : Object,
        // required : true
    }
},{timestamps : true})

const Order = mongoose.model("Order", orderSchema)
export default Order
const { Schema, model } = require("mongoose");


const jobSchema = new Schema(
  {
       jobRole:{
        type:String,
        required:[true,"Job Role is required"],
       },
       companyName:{
        type:String,
        required:[true,"Company Name is required"],
       },
       jobUrl:{
        type:String,
        
       },
       salary:Number,
       interviewStage: {
        type:String,
        enum:["Applied","Technical Round","Non Technical Round","Rejected","Hired"]
       },
       notes:String,
       userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      
  },
  {
   
    timestamps: true,
  }
);

const Job = model("Job", jobSchema);

module.exports = Job;
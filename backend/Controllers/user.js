const User =require("../Models/User");


exports.getUserById = (req,res,next,id) => {
    User.findById(id, (err,user) => {
     if(err || !user){
         return res.status(400).json({
             error:err})
     }
     req.profile = user;
     next();
    })
}
exports.getUser =(req,res)=>{
    console.log(req)
    return res.status(200).json(req.profile);
}
exports.deleteUser =(req,res) => {
    User.findByIdAndDelete(req.profile._id,(err,user) => {
          if(err){
              return res.status(400).json({
                  error:"couldnot delete user"
              })
          }
          return res.status(200).json(user);
    })
}
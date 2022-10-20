import User from '../models/User.js';

 export default async (req,res,next) =>{

    const roles = ["teacher","admin"];
    const user = await User.findOne({_id:req.session.userID});
    const userRole = user.role;

    console.log(` user : ${userRole}`);
    if(roles.includes(userRole)){
        next();
    }else{
        return res.status(401).send("No Permission");
    }
 };


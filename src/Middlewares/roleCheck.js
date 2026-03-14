export const roleCheck=(...roles)=>{
    return(req,res,next)=>{
        // the user role come from authcheck
    if (!req.user.role) {
      return res.status(401).json({status:"Fail",message:"No Token Found"})  
    }
    //if the user role come from authcheck
     if (!roles.includes(req.user.role)) {
      return res.status(401).json({status:"Fail",message:"Not Authorized"})  
    }
    next()
    }
}


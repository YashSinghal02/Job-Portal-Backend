import jwt from "jsonwebtoken"

export const authCheck=(req,res,next)=>{
    try {
        // const token = req.cookies.token;
        // const{token}=req.cookies;

        // header based
        const token = req.headers.authorization.split(" ")[1];

        // If token does not exist
        // User is not logged in
        if(!token){
            return res.status(401).json({status:"Failed",message:"No Token Found"})
        }
        // Checks if token is real (not fake)
        // Checks if token is expired
        // Checks if secret key is correct
        // Decodes payload
        const data=jwt.verify(token,"qwer");
        if(!data){
            return res.status(401).json({status:"Failed",message:"Invalid Token"})
        }
        // We create new key called user
        // for every next route we pass user payload 
        req.user=data;
        // It forwards the request to the next middleware or route handler.
        next()
    } catch (error) {
        console.log(error.message);
        res.status(401).json({status:"Failed",message:error.message})
    }
}


import { CustomError } from "../Utils/ErrorClass.js";



export const testcontroller =async(req,res,next)=>{
const val =false;
if (val) {
    res.status(200).send("Good Response")
}
else{
    throw new CustomError(400,"All Fileds Are Requried")
}
}

export const testcontrollertwo =async(req,res,next)=>{
const val =false;
if (val) {
    res.status(400).send("All Fileds Are Requrieds")
}
else{
    // to avoid repated of next midddelware we creaated a class for error 
    throw new CustomError(501,"Something went wrong")
}
}

// export const testcontrollertwo =async(req,res,next)=>{
// const val =false;
// if (val) {
//     res.send("Good Response")
// }
// else{
//     next("Something Went Wrong")
// }
// }
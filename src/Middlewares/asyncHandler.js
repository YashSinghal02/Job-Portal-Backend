// The main purpose to reduce the repeated code
// HOF Function next is use to forward request whenever use next means it is a middleware 
const asyncHandler =(fn)=>{
    return async (req,res,next) =>{
        try {
            await fn(req,res)
        } catch (error) {
            // it send error forward to error handler
            next(error)
        }
    }
}

export default asyncHandler
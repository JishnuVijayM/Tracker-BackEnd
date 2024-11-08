//handle express erros - serch in web (error middleware in express)

const errorMiddleware = (err,req,res,next)=>{

    const status = err.status || 500
    const message = err.message || "BACKEND ERROR"
    const extraDetails = err.extraDetails || "Error from backend server"

    return res.status(status).json({message ,extraDetails})
}

module.exports = errorMiddleware
const {BadRequest} = require('http-errors')
const errorHandler =  (err, req, res, next) => {
    console.log(err)

    let error = Object.assign(err, {})

    if(err.name === 'CastError') {
        error = new BadRequest('invalid object id provided')
    }
    
    if (err.name === "ValidationError"){
        const message = Object.values(err.errors).map(value => value.message)
        error = new BadRequest(message, 400)
    }

    if (err.code === "NotFound"){
        const message = "Duplicate field value entered"
        error = new BadRequest(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false, 
        message: error.message
    })

}

module.exports = errorHandler
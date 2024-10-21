
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next()
    } catch (error) {
        const status = 404
        const message = "Fill the required fields"
        const extraDetails = error.errors[0].message 

        //pass the value to if the error to error middleware
        const errors = {
            status,
            message,
            extraDetails
        }
        next(errors)
    }
}

module.exports= validate
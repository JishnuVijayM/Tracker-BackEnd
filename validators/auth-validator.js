const {z} = require("zod")

//create an object schema
const signupSchema = z.object({
    username: z.
    string({required_error:"Name is required"})
    .trim()
    .min(3, {message: "Name must be at least 3 characters"})
    .max(100, {message: "Name must not be more than 100 characters"}),

    email: z.
    string({required_error:"Email is required"})
    .trim()
    .email({message: "Invalid email address"})
    .min(1, {message: "Email must be at least 1 characters"})
    .max(100, {message: "Email must not be more than 100 characters"}),
    
    password: z.
    string({required_error:"Password is required"})
    .trim()
    .min(3, {message: "Password must be at least 3 characters"})
    .max(12, {message: "Password must not be more than 12 characters"}),
})

module.exports = signupSchema;
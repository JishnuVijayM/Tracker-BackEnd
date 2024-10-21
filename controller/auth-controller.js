const User = require("../modals/user-model");

//home
exports.home = async (req, res) => {
    try {
        res.status(200).json({message :  "Welcome Home! - Using Controller" });
    } catch (error) {
        console.log("Error: ", error);
    }
};

//register logic here
//1.get data from the req
//2.check the user is exist
//3. create an model -- User.create / Save
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        //password hashing works on pre (schema),
        const newUser = await User.create({
            username,
            email,
            password,
        });

        //JWT token pass to frond -end
        res.status(200).json({
            message: "Registration Successfull",
            token: await newUser.generateToken(),
            userId: newUser._id.toString(),
        });

        console.log(newUser);
    } catch (error) {
        console.log(error);
        
        next(error)
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await User.findOne({ email });

        console.log("User found:", userExist);

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        // Compare password using the schema method
        const isPasswordValid = await userExist.comparePassword(password);

        if (isPasswordValid) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                userName: userExist.username 
            });
        } else {
            res.status(401).json({ message: "Invalid Email or Password." });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


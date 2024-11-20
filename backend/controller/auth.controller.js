const asyncHandler = require("express-async-handler")


const authenticateUser = asyncHandler(async (req, res, next) => {
    const { email, username, imageUrl } = req.body
    try {
        // check if user exist in the database
        const isUserExist = ""
    } catch (error) {
        
    }
});
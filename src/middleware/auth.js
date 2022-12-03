const jwt = require("jsonwebtoken");

module.exports = async (request, response, next) => {
  try {

    // const token = await request.headers.authorization.split(" ")[1];
    // const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    // const user = await decodedToken;
    // request.user = user;

    // const token = await request;
    // console.log('header==>',response)
    next();
    
  } catch (error) {
    console.log(error);
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};


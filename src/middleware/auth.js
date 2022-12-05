const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  const token = req.cookies.jwtoken;
  
  if ( !token )  {
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized!',
    });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: 'Unauthorized!',
    });
  }
};


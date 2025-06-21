import jwt from "jsonwebtoken"

const adminMiddleware = (req, res, next) => {
    if (req.userRole !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only."
      });
    }
    next();
  };
  
  export default adminMiddleware;
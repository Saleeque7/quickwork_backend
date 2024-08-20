import jwt from 'jsonwebtoken';
import config from '../../../config/config.js';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided!' });
  }

  jwt.verify(token.split(' ')[1], config.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err,"errr");
      return res.status(401).json({ message: 'Unauthorized!' });
    }
    console.log(decoded,"role");
    
    req.userRole = decoded.data.role;
    console.log(  req.userRole,"role");
    if (req.userRole ==="user"){
     req.userId = decoded.data.id;
   }else if(req.userRole === "client"){
    req.clientId = decoded.data.id
   }else if (req.userRole === "admin"){
    req.adminId = decoded.data.id
   }else{
    return res.status(403).json({ message: 'Forbidden: Access denied' });
   }
    next();
  });
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.userRole !== role) {
      return res.status(403).json({ message: 'Forbidden!' });
    }
    next();
  };
};

export { verifyToken, requireRole };

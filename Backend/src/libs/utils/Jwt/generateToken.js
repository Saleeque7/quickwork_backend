import jwt from "jsonwebtoken";
import config from "../../../config/config.js";

const generateAccessToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
};
const generateRefreshToken = (data) => {
  return jwt.sign({ data }, config.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const generateToken = (res,data,userRole) => {
  console.log(userRole,"wttttt");
  const payLoad = {
    id:data,
    role: userRole,
  }
  console.log(payLoad ,"payayyaayy");
  const accessToken = generateAccessToken(payLoad);
  const refreshToken = generateRefreshToken(payLoad);

  res.cookie('refreshToken',refreshToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV !== 'development',
      sameSite:'strict',
      maxAge:30 * 24 * 60 * 60 * 1000,
      path: '/'
   })

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};


//     res.cookie('accessToken',accessToken,{
//         httpOnly:true,
//         secure:process.env.NODE_ENV !== 'development',
//         sameSite:'strict',
//         maxAge: 1 * 60 * 1000
//     })

import jwt from 'jsonwebtoken';

export const refreshTokenuseCase = (dependencies) => {
  const { config } = dependencies;
  const {
    repositories: {
      loginRepository: { findUserById, findClientById, findAdminById },
    },
  } = dependencies;

  const executeFunction = async (token, cookieToken) => {
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      const id = decoded.data.id;
      
      const user = await findUserById(id);
      const client = await findClientById(id);
      const admin = await findAdminById(id);
      const person = client || user || admin;

      if (!person.isBlock) {
        if (!cookieToken || cookieToken !== token) {
          return {
            success: false,
            message: 'Forbidden',
          };
        }
      } else {
        return {
          success: false,
          message: 'Forbidden',
        };
      }

      return {
        success: true,
        person,
      };

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return {
          success: false,
          message: 'Token expired',
        };
      } else if (error.name === 'JsonWebTokenError') {
        return {
          success: false,
          message: 'Invalid token',
        };
      }

      console.error('Error in refreshTokenUseCase:', error.message);
      throw new Error('Internal Server Error');
    }
  };

  return { executeFunction };
};

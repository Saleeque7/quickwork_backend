

export const addProfileUseCase = (dependencies) => {
    const { config } = dependencies;
    const {
        repositories: {
            repository: { findUSerByIdAndUpdate },
        },
      } = dependencies;

    const executeFunction = async (userId , userInfo  ) => {
        try {
            const result = await findUSerByIdAndUpdate(userId,userInfo)
            console.log(result ,"result");
            if(!result){
                return {
                    success:false,
                    message:"error in saving userData"
                }            
            }

            return {
                success:true,
                user:result
            }

        } catch (error) {
            console.error('Error in addProfileUseCase:', error.message);
            throw new Error('Failed ');
        }
    };

    return { executeFunction };
};

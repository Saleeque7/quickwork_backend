export const isUserprofileUseCase = (dependencies)=>{
    const {
        repositories: {
            repository: { changeisUserprofile },
        },
      } = dependencies;
    const execute = async(userId )=> {
        try {
            const result  = await changeisUserprofile(userId )
            if (!result) {
                return {
                    success: false,
                    message: "Error in saving isUserprofileUseCase data",
                };
            }

            return {
                success: true,
                user: result,
            };
        } catch (error) {
            console.error(error,"error in isUserprofileUseCase");
        }
    }
    return {execute}
}
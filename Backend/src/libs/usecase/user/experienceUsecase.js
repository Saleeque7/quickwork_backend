export const experienceUsecase = (dependencies)=>{
    const {
        repositories: {
            repository: { saveExperienceInfo },
        },
      } = dependencies;
    const execute = async(userId ,data)=> {
        try {
            const result  = await saveExperienceInfo(userId ,data)
            if (!result) {
                return {
                    success: false,
                    message: "Error in saving experience data",
                };
            }

            return {
                success: true,
                user: result,
            };
        } catch (error) {
            console.error(error,"error in experienceUsecase");
        }
    }
    return {execute}
}
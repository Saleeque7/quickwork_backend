export const editImageUsecase = (dependencies)=>{
    const { repositories: { repository: { editImage } } } = dependencies;

    const execute = async (userId ,image) =>{
        try {
            const result = await editImage(userId , image)
            return result
        } catch (error) {
            console.error(error,"error in useCase");
            
        }
    }
    return { execute }
} 
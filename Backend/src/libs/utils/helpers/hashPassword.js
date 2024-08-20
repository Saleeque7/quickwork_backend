import bcrypt from 'bcrypt'
export const hashuserPassword = async (password) => {
    try {

        if (!password) {
            throw new Error("password is required")
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        return hashPassword

    } catch (error) {
        throw new Error (`Error hashing password: ${error.message}`)

    }
}

export const comparePassword = async(password , checkpassword)=>{
    let result = bcrypt.compare(password , checkpassword)
    return result
}
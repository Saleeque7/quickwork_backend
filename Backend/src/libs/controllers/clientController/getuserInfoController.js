export default (dependencies) => {
    const {use_case : {getuserInfoUsecase}} = dependencies

    const getuserInfoController =async(req ,res) => {
        const {execute} = await getuserInfoUsecase (dependencies)

        try {
            const result  = await execute(req.query)
            if(!result){
                return res.status(401).json({message:"error in get user info"})
            }
            return res.status(200).json(result)
        } catch (error) {
            console.error(error ,"error in getuserInfoController");
            return res.status(500).json(error)
        }
    }
    return getuserInfoController
}
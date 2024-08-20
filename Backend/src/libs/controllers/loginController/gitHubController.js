export default (dependencies) => { 
    const {use_case : {gitHubUsecase}} = dependencies
    const gitHubController =async (req,res)=> {
        const {executeFunction} = gitHubUsecase(dependencies)
        try {

            const code = req.query.code;
            const layout = req.query.layout

            const result = await executeFunction(code,layout);
            if (!result) {
              return res.status(401).json("Data cannot be retrieved");
            }
            return res.status(200).json({ success: true, token: result.access_token });
        } catch (error) {
            console.error("Error in gitHubController:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    return gitHubController
}
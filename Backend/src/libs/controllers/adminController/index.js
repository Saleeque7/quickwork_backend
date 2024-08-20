
import adminAUthController from "./adminAUthController.js";
import registerController from "./registerController.js";
import getUserDataController from "./getUserDataController.js";
import getClientDataController from "./getClientDataController.js";
import blockuserController from "./blockuserController.js";
import unblockuserController from "./unblockuserController.js";
import blockclientController from "./blockclientController.js";
import unblockclilentController from "./unblockclilentController.js";
import searchcontroller from "./searchcontroller.js";
import browseDataController from "./browseDataController.js";
export default (dependencies) => {
    return {
        adminAUthController:adminAUthController(dependencies),
        registerController:registerController(dependencies),
        getUserDataController:getUserDataController(dependencies),
        getClientDataController:getClientDataController(dependencies),
        blockuserController:blockuserController(dependencies),
        unblockuserController:unblockuserController(dependencies),
        blockclientController:blockclientController(dependencies) ,
        unblockclilentController:unblockclilentController(dependencies),
        searchcontroller:searchcontroller(dependencies),
        browseDataController:browseDataController(dependencies)
    }
}
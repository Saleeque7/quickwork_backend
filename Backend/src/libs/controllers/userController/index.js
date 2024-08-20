
import userAuthController from './authRegisterController.js'
import loadUserHome from './loadUserHomeController.js'
import verifyotpController from './verifyotpController.js'
import resendOtpController from './resendOtpController.js'
import addProfileController from './addProfileController.js'
import addProfileSecController from './addProfileSecController.js'
import experienceController from './experienceController.js'
import isUserprofileController from './isUserprofileController.js'
import getJobPostController from './getJobPostController.js'
import browseJobpostController from './browseJobpostController.js'
import applynowController from './applynowController.js'
import notificationController from './notificationController.js'
import markasReadController from './markasReadController.js'
import userContractController from './userContractController.js'
import ContractactionController from './ContractactionController.js'
import acceptedContractController from './acceptedContractController.js'
import submitJobController from './submitJobController.js'
import findWorkController from './findWorkController.js'
import getclientInfoController from './getclientInfoController.js'
import alljobproposalsController from './alljobproposalsController.js'
import viewjobproposalsController from './viewjobproposalsController.js'
import userInfoController from './userInfoController.js'
import edituserInfoController from './edituserInfoController.js'
import saveJobController from './saveJobController.js'
import savedjobController from './savedjobController.js'
import unsaveJobController from './unsaveJobController.js'
import disLikejobController from './disLikejobController.js'
import LikejobController from './LikejobController.js'
import editproposalController from './editproposalController.js'
import deleteproposalController from './deleteproposalController.js'
import editImageController from './editImageController.js'
import quitContractactionController from './quitContractactionController.js'
import ratingController from './ratingController.js'

export default 
(dependencies)=>{
    return{
        loadUserHome:loadUserHome(dependencies),
        userAuthController:userAuthController(dependencies),
        verifyotpController:verifyotpController(dependencies),
        resendOtpController:resendOtpController(dependencies),
        addProfileController:addProfileController(dependencies),
        addProfileSecController:addProfileSecController(dependencies),
        experienceController:experienceController(dependencies),
        isUserprofileController:isUserprofileController(dependencies),
        getJobPostController:getJobPostController(dependencies),
        browseJobpostController:browseJobpostController(dependencies),
        applynowController:applynowController(dependencies),
        notificationController:notificationController(dependencies),
        markasReadController:markasReadController(dependencies),
        userContractController:userContractController(dependencies),
        ContractactionController:ContractactionController(dependencies),
        acceptedContractController:acceptedContractController(dependencies),
        submitJobController:submitJobController(dependencies),
        findWorkController:findWorkController(dependencies),
        getclientInfoController:getclientInfoController(dependencies),
        alljobproposalsController:alljobproposalsController(dependencies),
        viewjobproposalsController:viewjobproposalsController(dependencies),
        userInfoController:userInfoController(dependencies),
        edituserInfoController:edituserInfoController(dependencies),
        saveJobController:saveJobController(dependencies),
        savedjobController:savedjobController(dependencies),
        unsaveJobController:unsaveJobController(dependencies),
        disLikejobController:disLikejobController(dependencies),
        LikejobController:LikejobController(dependencies),
        editproposalController:editproposalController(dependencies),
        deleteproposalController:deleteproposalController(dependencies),
        editImageController:editImageController(dependencies),
        quitContractactionController:quitContractactionController(dependencies),
        ratingController:ratingController(dependencies)
    }
}
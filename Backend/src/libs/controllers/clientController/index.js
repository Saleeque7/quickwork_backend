import clientAuthController from "./clientAuthController.js";
import browseUsersController from "./browseUsersController.js";
import jobSubmitController from "./jobSubmitController.js";
import browseJobController from "./browseJobController.js";
import browseJobPostsController from "./browseJobPostsController.js";
import browseJobProposalsController from "./browseJobProposalsController.js";
import shortListJobProposalsController from "./shortListJobProposalsController.js";
import unshortListJobProposalsController from "./unshortListJobProposalsController.js";
import archiveJobProposalsController from "./archiveJobProposalsController.js";
import unarchiveJobProposalsController from "./unarchiveJobProposalsController.js";
import declineJobProposalsController from "./declineJobProposalsController.js";
import offerLetterController from "./offerLetterController.js";
import createContractController from "./createContractController.js";
import saveAddressController from "./saveAddressController.js";
import paymentController from "./paymentController.js";
import verifypaymentController from "./verifypaymentController.js";
import browseContractsController from "./browseContractsController.js";
import paymentAfterController from "./paymentAfterController.js";
import getContractController from "./getContractController.js";
import getuserInfoController from "./getuserInfoController.js";
import submittedContractController from "./submittedContractController.js";
import deleteJobController from "./deleteJobController.js";
import editjobSubmitController from "./editjobSubmitController.js";
import findProfileController from "./findProfileController.js";
import stripePaymentController from "./stripePaymentController.js";
import transactionController from "./transactionController.js";
import alltransactionController from "./alltransactionController.js";
import browseSubmittedController from "./browseSubmittedController.js";
import acceptJobSubmitController from "./acceptJobSubmitController.js";
import ratingController from "./ratingController.js";
import wallettransactionController from "./wallettransactionController.js";

export default (dependencies) => {
    return {
        clientAuthController:clientAuthController(dependencies),
        browseUsersController:browseUsersController(dependencies),
        jobSubmitController:jobSubmitController(dependencies),
        browseJobController:browseJobController(dependencies),
        browseJobPostsController:browseJobPostsController(dependencies),
        browseJobProposalsController:browseJobProposalsController(dependencies),
        shortListJobProposalsController:shortListJobProposalsController(dependencies),
        unshortListJobProposalsController:unshortListJobProposalsController(dependencies),
        archiveJobProposalsController:archiveJobProposalsController(dependencies),
        unarchiveJobProposalsController:unarchiveJobProposalsController(dependencies),
        declineJobProposalsController:declineJobProposalsController(dependencies),
        offerLetterController:offerLetterController(dependencies),
        createContractController:createContractController(dependencies),
        saveAddressController:saveAddressController(dependencies),
        paymentController:paymentController(dependencies),
        verifypaymentController:verifypaymentController(dependencies),
        browseContractsController:browseContractsController(dependencies),
        paymentAfterController:paymentAfterController(dependencies),
        getContractController:getContractController(dependencies),
        getuserInfoController:getuserInfoController(dependencies),
        submittedContractController:submittedContractController(dependencies),
        deleteJobController:deleteJobController(dependencies),
        editjobSubmitController:editjobSubmitController(dependencies),
        findProfileController:findProfileController(dependencies),
        stripePaymentController:stripePaymentController(dependencies),
        transactionController:transactionController(dependencies),
        alltransactionController:alltransactionController(dependencies),
        browseSubmittedController:browseSubmittedController(dependencies),
        acceptJobSubmitController:acceptJobSubmitController(dependencies),
        ratingController:ratingController(dependencies),
        wallettransactionController:wallettransactionController(dependencies)
    }
}

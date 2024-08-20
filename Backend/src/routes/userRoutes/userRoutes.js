import express from 'express'
import { userController } from '../../libs/controllers/index.js'
import { verifyToken, requireRole } from '../../libs/utils/middleWare.js/authMiddleWare.js'
import { uploadImage, uploadDocument, uploadFile } from '../../libs/utils/multer/multer.js'
import { chatController } from '../../libs/controllers/index.js'
export default (dependencies) => {
  const {
    loadUserHome,
    userAuthController,
    verifyotpController,
    resendOtpController,
    addProfileController,
    addProfileSecController,
    experienceController,
    isUserprofileController,
    getJobPostController,
    browseJobpostController,
    applynowController,
    notificationController,
    markasReadController,
    userContractController,
    ContractactionController,
    acceptedContractController,
    submitJobController,
    findWorkController,
    getclientInfoController,
    alljobproposalsController,
    viewjobproposalsController,
    userInfoController,
    edituserInfoController,
    saveJobController,
    savedjobController,
    unsaveJobController,
    disLikejobController,
    LikejobController,
    editproposalController,
    deleteproposalController,
    editImageController,
    quitContractactionController,
    ratingController
  } = userController(dependencies);

  const {
    createChatcontroller,
    getChatController,
    findchatController,
    messageController,
    getmessageController,
    addImageMessageController,
    unReadmessagesController,
    markAsReadController
  } = chatController(dependencies);

  const router = express.Router()
  router.get('/', loadUserHome)
  router.post('/register', userAuthController)
  router.post('/verify-otp', verifyotpController)
  router.post('/resend-otp', resendOtpController)
  router.post('/addProfile', uploadImage.single("image"), verifyToken, requireRole('user'), addProfileController)
  router.post('/addProfilesec', verifyToken, requireRole('user'), addProfileSecController)
  router.post('/experience', verifyToken, requireRole('user'), experienceController)
  router.post('/isUserprofileApi', verifyToken, requireRole('user'), isUserprofileController)
  router.get('/JobPost', verifyToken, requireRole('user'), getJobPostController)
  router.get('/browseJobpost', verifyToken, requireRole('user'), browseJobpostController)
  router.post('/applynow', verifyToken, requireRole('user'), applynowController)
  router.get('/notification', verifyToken, requireRole('user'), notificationController)
  router.get('/userContract', verifyToken, requireRole('user'), userContractController)
  router.patch('/markasRead', verifyToken, requireRole('user'), markasReadController)
  router.patch('/Contractaction', verifyToken, requireRole('user'), ContractactionController)
  router.post('/quitContractaction', verifyToken, requireRole('user'),quitContractactionController)
  router.get('/acceptedContract', verifyToken, requireRole('user'), acceptedContractController)
  router.get('/findjobs', verifyToken, requireRole('user'), findWorkController)
  router.post('/submit', uploadDocument.single("projectFile"), verifyToken, requireRole('user'), submitJobController)
  router.get('/getclientInfo', verifyToken, requireRole('user'), getclientInfoController)
  router.get('/alljobproposals', verifyToken, requireRole('user'), alljobproposalsController)
  router.get('/viewjobproposal', verifyToken, requireRole('user'), viewjobproposalsController)
  router.get('/userInfo', verifyToken, requireRole('user'), userInfoController)
  router.put('/userInfo', verifyToken, requireRole('user'), edituserInfoController)
  router.post('/saveJob', verifyToken, requireRole('user'), saveJobController)
  router.post('/unsaveJob', verifyToken, requireRole('user'), unsaveJobController)
  router.get('/savedjob', verifyToken, requireRole('user'), savedjobController)
  router.put('/disLikejob', verifyToken, requireRole('user'), disLikejobController)
  router.put('/Likejob', verifyToken, requireRole('user'), LikejobController)
  router.put('/editproposal', verifyToken, requireRole('user'), editproposalController)
  router.delete('/deleteProposal', verifyToken, requireRole('user'), deleteproposalController)
  router.post('/editImage', uploadImage.single("image"), verifyToken, requireRole('user'), editImageController);
  router.post('/rating', verifyToken, requireRole('user'), ratingController)

  // chats
  // router.post('/createChat',verifyToken, requireRole('user'),createChatcontroller)
  router.get('/getchat', verifyToken, requireRole('user'), getChatController)
  router.get('/findchat', verifyToken, requireRole('user'), findchatController)

  router.post('/addmessages', verifyToken, requireRole('user'), messageController)
  router.get('/getmessages', verifyToken, requireRole('user'), getmessageController)
  router.get('/unReadmessages', verifyToken, requireRole('user'), unReadmessagesController)
  router.put('/markAsRead', verifyToken, requireRole('user'), markAsReadController)


  router.post('/addImageFilemessages', uploadFile.single("image"), verifyToken, requireRole('user'), addImageMessageController)
  router.post('/addAudioFilemessages', uploadFile.single("audio"), verifyToken, requireRole('user'), addImageMessageController)
  router.post('/addVideoFilemessages', uploadFile.single("video"), verifyToken, requireRole('user'), addImageMessageController)
  router.post('/addVoiceFilemessages', uploadFile.single("voice"), verifyToken, requireRole('user'), addImageMessageController)



  return router
}
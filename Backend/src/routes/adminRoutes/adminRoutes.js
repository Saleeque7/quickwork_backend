import express from 'express'
import { adminController } from '../../libs/controllers/index.js'
import { verifyToken, requireRole } from '../../libs/utils/middleWare.js/authMiddleWare.js'


export default (dependencies) => {
    const { adminAUthController, registerController, getUserDataController, getClientDataController,
         blockuserController, unblockuserController, blockclientController, unblockclilentController, 
         searchcontroller , browseDataController } = adminController(dependencies)


    const router = express.Router()
    router.post('/login', adminAUthController)
    router.post('/register', registerController)
    router.get('/userData', verifyToken, requireRole('admin'), getUserDataController)
    router.get('/clientData', verifyToken, requireRole('admin'), getClientDataController)
    router.put('/blockUser', verifyToken, requireRole('admin'), blockuserController)
    router.put('/unblockUser', verifyToken, requireRole('admin'), unblockuserController)
    router.put('/blockClient', verifyToken, requireRole('admin'), blockclientController)
    router.put('/unblockClient', verifyToken, requireRole('admin'), unblockclilentController)
    router.put('/search', verifyToken, requireRole('admin'), searchcontroller)
    router.get('/browseData', verifyToken, requireRole('admin'), browseDataController)

    return router
}
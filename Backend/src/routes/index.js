import userRoutes from "./userRoutes/userRoutes.js";
import clientRoutes from "./clientRoutes/clientRoutes.js";
import loginRoute from './loginRoute/loginRoute.js'
import adminRoute from './adminRoutes/adminRoutes.js'
import express  from 'express'

export const routes = (dependencies)=>{

    const route = express.Router()

    route.use('/',loginRoute(dependencies))
    route.use('/user',userRoutes(dependencies))
    route.use('/client',clientRoutes(dependencies)) 
    route.use('/admin',adminRoute(dependencies)) 

    return route
} 



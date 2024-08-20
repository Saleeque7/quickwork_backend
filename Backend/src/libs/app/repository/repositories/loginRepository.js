
import Schema from "../../database/index.js";
const { User , Client ,Admin } = Schema
export const loginRepository = { 
    findUserByEmail:async (email)=> {
        const user = await User.findOne({email:email})
        return user   
    },
    findClientByEmail: async (email)=> {
        const client = await Client.findOne({email:email})
        return client
    },
    changepassword:async (email, password)=>{   
        const user = await User.findOne({email:email}); 
        const client = await Client.findOne({email:email});
        const person = user?user:client;

        if (!person) {
            throw new Error("User not found");
        }

        person.password = password
        await person.save()
        return true
    },
    createUser:async (data , userType)=>{
        const {email , verified_email ,name } = data
        const userData = {
            name:name,
            email:email,
            password:null,
            phone:null,
            job_role:userType,
            isVerified:verified_email,         
            isGoogle:true
        }
        if (userType === "freelancer") {
           return  await User.create(userData);  
        } else if (userType === "client") {
           return  await Client.create(userData);  
        } else {
            throw new Error(`Invalid userType: ${userType}`);
        }
        
    },
    createGituser:async (userinfo , userEmail , userType)=>{
        const { login: name, avatar_url: image } = userinfo;
        const [ { email: email , verified:verified } ] = userEmail;
        const userData = {
            name:name,
            email:email,
            password:null,
            phone:null,
            job_role:userType,
            isVerified:verified,         
            isGithub:true,
            profile:image
        }
        if (userType === "freelancer") {
            return  await User.create(userData);  
         } else if (userType === "client") {
            return  await Client.create(userData);  
         } else {
             throw new Error(`Invalid userType: ${userType}`);
         }
    },

    findUserById:async(userId)=>{
        const user = await User.findOne({_id:userId}); 
        return user
    },
    findClientById:async(userId)=>{
        const client = await Client.findOne({_id:userId}); 
        return client
    },
    findAdminById:async(adminId) => {
        const admin = await Admin.findOne({_id:adminId})
        return admin
    }
  
}
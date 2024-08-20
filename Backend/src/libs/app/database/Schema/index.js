import {User} from './userSchema.js';
import {Client} from './clientSchema.js';
import { Admin } from './adminSchema.js';
import { JobPost } from './jobPostSchema .js';
import { Proposal } from './propsalsSchema.js';
import { Contract } from './jobContrectSchema.js';
import {JobSubmission} from './jobSubmissionSchema.js';
import { Chat } from './chatSchema.js';
import { Message } from './messageSchema.js';
import { QbWallet } from './qbWalletSchema.js';

 const schemas = {
    User,
    Client,
    Admin,
    JobPost,
    Proposal,
    Contract,
    JobSubmission,
    Chat,
    Message,
    QbWallet
  }
  
  export default schemas
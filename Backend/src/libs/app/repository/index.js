import repository from './repositories/userRepository.js';
import { clientRepository } from './repositories/clientRepository.js';
import { loginRepository } from './repositories/loginRepository.js';
import { adminRepository } from './repositories/adminRepository.js';
import { chatRepository } from './repositories/chatrepository.js';
export const repositories = {
    repository,
    clientRepository,
    loginRepository,
    adminRepository,
    chatRepository
};



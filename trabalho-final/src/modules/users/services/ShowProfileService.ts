import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";

interface IRequest{
    user_id: string;
}

export default class ShowProfileService{
    public async execute({user_id}: IRequest) : Promise<User>{
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findById(user_id);
        if(!user){
            throw new AppError('User not found.');
        }
        return user;
        
    }
}
import User from "@modules/users/typeorm/entities/User";
import UsersRepository from "@modules/users/typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import path from 'path';
import uploadConfig from "@config/upload";
import fs from 'fs';

interface IRequest{
    user_id: string;
    avatarFilename: string;
}

export default class UpdateUserAvatarService{
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User>{
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findById(user_id)
        if(!user){
            throw new Error('User not found');
        }
        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFilename;
        await userRepository.save(user);
        return user;
    }
}
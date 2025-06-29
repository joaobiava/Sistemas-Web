import AppError from "@shared/errors/AppError";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";

interface IRequest{
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService{
    public async execute({name, email, password} : IRequest) : Promise<User>{
        const userRepository = getCustomRepository(UsersRepository);
        const emailExists = await userRepository.findByEmail(email);
        if(emailExists){
            throw new AppError('Email address already used.')
        }
        const hashedPassword = await hash(password, 8);
        const user = userRepository.create({
            name, 
            email,
            password: hashedPassword
        });
        await userRepository.save(user);
        return user;
    }
}
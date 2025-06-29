import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { Response, NextFunction, Request } from "express";

export default class UserAvatarController {
    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try{
            const updateUserAvatar = new UpdateUserAvatarService();
            const user = updateUserAvatar.execute({user_id: request.user.id, avatarFilename: request.file?.filename as string});
            return response.json(user);
        } catch(err){
            next(err);
        };
    }
}
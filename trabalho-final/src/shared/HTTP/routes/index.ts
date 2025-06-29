import { Router } from "express";
import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import albumsRouter from "@modules/albums/routes/album.routes";
import musicsRouter from "@modules/musics/routes/music.routes";

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/albums', albumsRouter);
routes.use('/musics', musicsRouter);


export default routes;
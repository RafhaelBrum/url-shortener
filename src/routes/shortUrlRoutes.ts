import { Router } from "express";
import { createShortUrlHandler } from "../controllers/shortUrlHandler";

const shortUrlRouter = Router();

shortUrlRouter.post('/', createShortUrlHandler);

export default shortUrlRouter;
import { Router } from "express";
import { createShortUrlHandler, deleteShortUrlHandler, getOriginalUrlHandler, updateShortUrlHandler } from "../controllers/shortUrlHandler";

const shortUrlRouter = Router();

shortUrlRouter.post('/', createShortUrlHandler);
shortUrlRouter.get('/:shortcode', getOriginalUrlHandler);
shortUrlRouter.put('/:shortcode', updateShortUrlHandler);
shortUrlRouter.delete('/:shortcode', deleteShortUrlHandler);
shortUrlRouter.get('/:shortcode/stats', getOriginalUrlHandler);

export default shortUrlRouter;
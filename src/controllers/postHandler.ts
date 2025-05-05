import { Request, Response } from "express";
import { createShortUrl } from "../models/postModel";
import { shortUrlInput } from "../types/shortUrl";

export async function createShortUrlHandler(req: Request, res: Response) { // FALTA BOTAR UM VALIDATOR NA URL
    try {
        const data: shortUrlInput = req.body;
        if (!data.url) {
            res.status(400).json({ error: 'Invalid URL' });
        }

        const post = await createShortUrl(data);

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log(error);
    }
};
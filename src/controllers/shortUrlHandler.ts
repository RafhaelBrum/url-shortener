import { Request, Response } from "express";
import { createShortUrl } from "../models/shortUrlModel";
import { shortUrlInput } from "../types/shortUrl";
import validator from 'validator';


export async function createShortUrlHandler(req: Request, res: Response) {
    try {
        const data: shortUrlInput = req.body;
        if (!data.url || !validator.isURL(data.url)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }

        const post = await createShortUrl(data);

        return res.status(201).json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
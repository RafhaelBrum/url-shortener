import { Request, Response } from "express";
import { createShortUrl, deleteShortUrl, getOriginalUrl, getShortUrlStats, updateShortUrl } from "../models/shortUrlModel";
import { shortUrlInput } from "../types/shortUrl";
import validator from 'validator';


export async function createShortUrlHandler(req: Request, res: Response) {
    try {
        const data: shortUrlInput = req.body;
        if (!data.url || !validator.isURL(data.url)) {
            res.status(400).json({ error: 'Invalid URL' });
            return;
        }

        const shortUrl = await createShortUrl(data);

        res.status(201).json(shortUrl);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export async function getOriginalUrlHandler(req: Request, res: Response) { // OBSOLETO PELO getShortUrlStats() e pelo redirectHandler()
    try {
        const shortcode = req.params.shortcode;
        const data = await getOriginalUrl(shortcode);
        if (!data) {
            res.status(404).json({ error: 'Shortcode not found' });
            return
        }

        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export async function updateShortUrlHandler(req: Request, res: Response) {
    try {
        const shortcode = req.params.shortcode;
        const url = req.body.url;
        if (!url) {
            res.status(400).json({ error: 'New URL is required' });
            return;
        }

        if (!validator.isURL(url)) {
            res.status(400).json({ error: 'Bad request' });
            return
        }

        const data = await updateShortUrl(shortcode, url);

        if (!data) {
            res.status(404).json({ error: 'Shortcode not found' });
            return;
        }

        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export async function deleteShortUrlHandler(req: Request, res: Response) {
    try {
        const shortcode = req.params.shortcode;
        if (!shortcode) {
            res.status(400).json({ error: 'Bad request' });
            return;
        }

        const result = await deleteShortUrl(shortcode);
        if (!result) {
            res.status(404).json({ error: 'Shortcode not found' });
            return
        }


        res.status(204).send();

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

};

export async function getShortUrlStatsHandler(req: Request, res: Response) {
    try {
        const shortcode = req.params.shortcode;
        if (!shortcode) {
            res.status(400).json({ error: 'Bad request' });
            return;
        }

        const data = await getShortUrlStats(shortcode);
        if (!data) {
            res.status(404).json({ error: 'Shortcode not found' });
            return;
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
import { Request, Response } from "express";
import { getOriginalUrl } from "../models/shortUrlModel";

export async function redirectUrl(req: Request, res: Response) {
    try {
        const shortcode = req.params.shortcode;
        const data = await getOriginalUrl(shortcode);
        if (!data) {
            res.status(404).json({ error: 'Shortcode not found' });
            return;
        }

        res.redirect(data.url);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
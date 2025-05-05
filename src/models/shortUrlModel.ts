import { shortUrlInput } from "../types/shortUrl";
import pool from '../db';

async function generateUniqueShortcode() {
    while (true) {
        const shortcode = Math.random().toString(36).substring(2, 8);

        const QUERY = 'SELECT * FROM urls WHERE short_code = $1;';
        const VALUES = [shortcode];
        const result = await pool.query(QUERY, VALUES);

        if (result.rowCount === 0) return shortcode;
    }
};

export async function createShortUrl(data: shortUrlInput) {
    const date = new Date()
    const url = data.url;
    const shortcode = await generateUniqueShortcode();
    try {
        const QUERY = `INSERT INTO urls (url, short_code, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *;`;
        const VALUES = [url, shortcode, date, date];
        const result = await pool.query(QUERY, VALUES);

        return result.rows[0];
    } catch (error) {
        console.log(error);
    }

};

export async function getOriginalUrl(shortcode: string): Promise<shortUrlInput | undefined> {
    try {
        const selectQUERY = 'SELECT * FROM urls WHERE short_code = $1;';
        const updateQUERY = 'UPDATE urls SET access_count = access_count + 1 WHERE short_code = $1;';

        const values = [shortcode];

        const result = await pool.query(selectQUERY, values);
        if (result.rowCount === 0) return undefined;

        await pool.query(updateQUERY, values);

        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
}

export async function updateShortUrl(shortcode: string, newUrl: string) {
    const date = new Date();
    try {
        const QUERY = `UPDATE urls SET url = $1, updated_at = $2 WHERE short_code = $3 RETURNING *;`;
        const VALUES = [newUrl, date, shortcode];
        const result = await pool.query(QUERY, VALUES);

        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};

export async function deleteShortUrl(shortcode: string) {
    try {
        const QUERY = 'DELETE FROM urls WHERE short_code = $1 RETURNING *;'
        const VALUES = [shortcode];
        const result = await pool.query(QUERY, VALUES);

        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};

export async function getShortUrlStats(shortcode: string) {
    try {
        const QUERY = 'SELECT * FROM urls WHERE short_code = $1;';
        const VALUES = [shortcode];
        const result = await pool.query(QUERY, VALUES);

        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};
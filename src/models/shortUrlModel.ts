import { shortUrlInput } from "../types/shortUrl";
import pool from '../db';

async function generateUniqueShortcode() {
    while (true) {
        const shortcode = Math.random().toString(36).substring(2, 8);

        const query = 'SELECT * FROM urls WHERE short_code = $1;';
        const values = [shortcode];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) return shortcode;
    }
};

export async function createShortUrl(data: shortUrlInput) {
    const date = new Date()
    const url = data.url;
    const shortcode = await generateUniqueShortcode();
    try {
        const INSERT = `INSERT INTO urls (url, short_code, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *;`;
        const VALUES = [url, shortcode, date, date];
        const result = await pool.query(INSERT, VALUES);

        return result.rows[0];
    } catch (error) {
        console.log(error);
    }

};

export async function getOriginalUrl(shortcode: string) {

};

export async function updateShortUrl(shortcode: string, newUrl: string) {

};

export async function deleteShortUrl(shortcode: string) {

};

export async function getShortUrlStats(shortcode: string) {

};
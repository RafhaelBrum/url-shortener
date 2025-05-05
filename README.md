# URL Shortening API

> roadmap.sh backend project – https://roadmap.sh/projects/url-shortening-service

A simple RESTful API that allows users to shorten long URLs, retrieve the original URLs, update existing URLs, delete short URLs, and view access statistics.

✅ **Features**

- Create short URLs with unique shortcodes
- Retrieve original URLs by shortcode
- Redirect directly using the shortcode path
- Update a short URL with a new destination
- Delete short URLs
- Track and view number of accesses (`access_count`)

📦 **Tech Stack**

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Validator.js

🚀 **Getting Started**

### 1. Clone the repository

```bash
git clone https://github.com/RafhaelBrum/url-shortener.git
cd url-shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file in root

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/your_database
```

### 4. Start the server

```bash
npx ts-node src/server.ts
```

📘 **Endpoints**

#### Create short URL

```
POST /shorten
Body: { "url": "https://example.com/long/url" }
```

#### Get original URL by shortcode

```
GET /shorten/:shortcode
```

#### Redirect to original URL

```
GET /:shortcode
```

#### Update short URL

```
PUT /shorten/:shortcode?newUrl=https://new-url.com
```

#### Delete short URL

```
DELETE /shorten/:shortcode
```

#### Get stats for a short URL

```
GET /shorten/:shortcode/stats
```

📌 **Notes**

- All shortcodes are generated randomly and uniquely.
- Redirection endpoint (`/:shortcode`) is handled separately from the API routes.
- URL validation is performed before creation or update.

📄 **License**

This project is for educational purposes only. Free to use and modify.

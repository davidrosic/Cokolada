# Cokolada

Backend for a Cyrillic CMS built at a hackathon in November 2023 (the *Cyrillic CMS Challenge*, a competition for content management services for Serbian Cyrillic content).

It is a REST API that stores and serves publications, accepts comments and user reports, and includes web scrapers that collect Cyrillic fonts from other sites.

## Stack

Node.js, Express, MongoDB (Mongoose), Axios and Cheerio for scraping.

## Features

- Publications in four categories (`razvoj`, `dizajn`, `resursi`, `magazin`): create, fetch by id, and list the first *n* in a category with optional ordering.
- Comments on publications (guest name by default).
- Reports: users can submit an email and a message, and the stored reports can be listed.
- Font scrapers for [fontesk.com](https://fontesk.com/tag/cyrillic/) and [tipometar.org](https://www.tipometar.org/tipometar/Fontovi.html) that collect Cyrillic fonts and store them.

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/publication/:category/:number/:order?` | List publications in a category |
| GET | `/publication/:id` | Get one publication |
| POST | `/publication/create` | Create a publication |
| POST | `/publication/comment` | Add a comment |
| GET / POST | `/report` | List / create reports |
| GET / POST | `/scraper` | List scraped fonts / run the scrapers |

## Run it

```bash
cd cokolada-back
npm install
echo 'DB_URI=mongodb://localhost:27017/' > .env   # the app appends the database name "cokoladadb"
node server.js                                     # listens on http://localhost:8000
```

## Notes

Built in a weekend, so it has no authentication, no tests and minimal input validation. Dependencies were updated in November 2026 to clear known vulnerabilities.

MIT licensed.

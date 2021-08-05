module.exports = {
    "development": {
        "dialect": "sqlite",
        "storage": "/home/adrien/manga_dbs/site_manga.db"
    },
    "test": {
        "dialect": "sqlite",
        "storage": ":memory"
    },
    "production": {
        "dialect": "sqlite",
        "storage": "/databases/fuckjapscan.db"
    }
}
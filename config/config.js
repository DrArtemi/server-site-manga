module.exports = {
    "development": {
        "dialect": "sqlite",
        "storage": "/home/ubuntu/databases/fuckjapscan.db"
    },
    "test": {
        "dialect": "sqlite",
        "storage": ":memory"
    },
    "production": {
        "dialect": "sqlite",
        "storage": "/home/ubuntu/databases/fuckjapscan.db"
    }
}
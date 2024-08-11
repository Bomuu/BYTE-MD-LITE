 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUFPaWxYMUpDcWNkQ1g1WVJDZjJ0OVo0ZjFsVEE3UkFFYkR3U2pHR3dsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiendVMWZMTVF3YllobnJvVkpGWlVRZ1hHUHRmZjZVMUg3M2tSRHZFWjUwWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPQVFxdi9nVWxRUkp6L3BqTGFlOWYwVm1LMnVxYVByZDh5bUZNNzBQcm5nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIxcUUvVy9ZYytOa3drd2NGd3hnaXlpdUp5My96ZUx0NzdpZDhJNExwT3hFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdBUUxFc1VuSmlSYjJaVmVxa3FvTmlxYjVnQm5GUG1IV3gxcjBJQlNqa0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdqT1NCRDIyemxJSFM5MDZxcEEybUd1VjJHbFE4cU1sbG1OQU9mUFBWU1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUM4Q3JIWXNDVmlCRE1TdFM3ZFdxeXdiaEoyZW9zSnRXRG1YNW0rcVVYQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjlqTVU1NWpoaFRPRkRDOGtJaU5IMURmTjRmNUNBcHFNa0laL0tEQTVDdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImYzYWVzYnhBZFN5d0UrQ1laTFlySFhwZ21aUHJZczZuVjVTb3Q0dGVBWC9MMkptR3p3N29pRUNtTkRaeitGVkhQTW1jUW16dCs4aG5kTENIckFGZmd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE5LCJhZHZTZWNyZXRLZXkiOiIvam5JVWNoOUY2RTh0YlVTUGVZNnhvaDdubFIvRHNBcUtrUEJYQ2lsenA4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJsN0d5bl9UUFRzMmk4dHROV1pPdFRnIiwicGhvbmVJZCI6IjBjYzc5MzFjLTQ2MzUtNDZkOC1iZmQ4LTVhZDEyMGQzYjU0YiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRdFlUTmd4YUVEWnZtT2ZZY3JpMmZCeWVYc2M9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFnY1QzRXNrSjE3VTNTQ2s5U2VnRnA4RDlzOD0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BDYnh1b0NFTUhqNDdVR0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InRHdVkzYTV5ZUoyREl5T3g3bnlFUjY3OWZWN2l3aVFiTEpYWVY4OGp3ME09IiwiYWNjb3VudFNpZ25hdHVyZSI6IlZaQWpubEtIRFdsSm94YkVWaGQ4SjZWdWtpa3VhWHpoc1I5VlZnQzZjSzMxYjFWNE93dCsvY0RxMHdoRHBtMmVoVUdkV2d4RzlRY0dpYlloeUlYb0RRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJheWt1TUQrR2R5ZTZEb3VpUEJ4T3g0UDdIRTlKdnBoWC9xSi9wZzE4MWhIQm5vd1JFaGE3ZmJYM0JsZkY5QnNsUmNmWUdIMVdieWhHZWpOTVNYTHhndz09In0sIm1lIjp7ImlkIjoiMjM3NjU0NzY1MTE1OjU4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlN0YXJrIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY1NDc2NTExNTo1OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiUnJtTjJ1Y25pZGd5TWpzZTU4aEVldS9YMWU0c0lrR3l5VjJGZlBJOE5EIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzMzk2NTU4fQ==',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "Edward Stark👾",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "237654765115",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

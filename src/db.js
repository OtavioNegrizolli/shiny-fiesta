import mysql from "mysql2/promise";
const { createPool } = mysql;

import logger from "./utils/logger.js";

logger.info(process.env.DB_CONNETION);
/** @type {mysql.Pool} */
const pool = createPool(
    process.env.DB_CONNETION || {
        host: process.env.DB_HOST || "localhost", // substitua pelo host do seu banco de dados
        user: process.env.DB_USER || "root",
        port: process.env.DB_PORT || "3306", // substitua pelo seu usuário do MySQL
        password: process.env.DB_PASSWORD || "senhasecreta", // substitua pela sua senha do MySQL
        database: process.env.DB_NAME || "sem_base", // substitua pelo nome do seu banco de dados
        ssl: false,
    }
);

/**
 * @param {string} query - sql to be executed
 * @param {any[]} params - positional parameters of the query
 * @returns {Promise<mysql.QueryResult | null>}
 **/
export async function query(query, params) {
    try {
        const result = await pool.query(query, params);
        if (result) {
            return result[0];
        }
        return null;
    } catch (e) {
        logger.error(e);
        throw e;
    }
}

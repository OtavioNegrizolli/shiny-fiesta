import { query } from "../db.js";
import logger from "../utils/logger.js";

export class Product {
    /** @type {string} - Stock keeping unit */
    id;
    /** @type {string} - breif about the course */
    description;
    /** @type {number} - current seling price of the product */
    price;
    /** @type {string} */
    manufacturer;
    /** @type {string} */
    details;
    /** @type {string} */
    category;
    /** @type {string} */
    measurementUnity;

    constructor({
        id = null,
        price,
        description,
        details,
        manufacturer,
        category,
        measurementUnity,
    }) {
        this.id = id;
        this.description = description?.trim();
        this.price =
            price && Number(price.replace?.call(".", "").replace(",", "."));
        this.manufacturer = manufacturer?.trim();
        this.details = details?.trim();
        this.category = category?.trim();
        this.measurementUnity = measurementUnity && Number(measurementUnity);
    }

    /**
     * @returns {string[] | null}
     */
    hasErrors() {
        /** @type {string[]} */
        const errors = [];
        if (this.description == null || this.description.length == 0) {
            errors.push("Descrição não informada!");
        }

        if (this.price == null) {
            errors.push("Preço de venda não informado");
        } else if (isNaN(this.price)) {
            errors.push("Preço em formato inválido");
        }

        if (this.manufacturer == null || this.manufacturer.length == 0) {
            errors.push("Fabricante não informada!");
        }

        if (this.category == null || this.category.length == 0) {
            errors.push("Categoria não informada!");
        }

        if (this.measurementUnity < 1 || this.measurementUnity > 2) {
            errors.push("Tipo de medida inválido!");
        }
        return errors.length > 0 ? errors : null;
    }

    /**
     * @returns {Promise<void>} - awitable operation
     */
    async save() {
        const params = [this.title, this.description];
        let queryString;
        if (this.id) {
            queryString = `
                UPDATE
                    products
                SET
                    price=?,
                    description=?,
                    details=?,
                    manufacturer=?,
                    category=?,
                    measurementUnity=?
                WHERE
                    id=?;`;
            params.push(this.id);
        } else {
            queryString = `
                INSERT INTO
                    products (price, description, details, manufacturer, category, measurementUnity)
                VALUES
                    (?, ?, ?, ?, ?, ?);`;
        }

        const result = await query(queryString, params);
        // when inserting
        if (result) this.id = result.insertId;
    }
    /**
     *
     * @param {string} id
     * @returns {Promise<Product|null>} returns the product that has the informed id, or null if not found
     */
    static async getById(id) {
        try {
            const result = await query(
                "SELECT id, price, description, details, manufacturer, category, measurementUnity FROM products WHERE id=?;",
                [id]
            );
            if (result != null) {
                const [first] = result;
                return new Product({
                    id: first["id"],
                    price: first["price"],
                    description: first["description"],
                    details: first["details"],
                    manufacturer: first["manufacturer"],
                    category: first["category"],
                    measurementUnity: first["measurementUnity"],
                });
            }
            return null;
        } catch (e) {
            logger.error(e.message);
            throw e;
        }
    }

    static async getAll() {
        try {
            const result = await query(
                "SELECT id, price, description, details, manufacturer, category, measurementUnity FROM products;"
            );
            if (result != null) {
                const products = result.map(
                    (tableLine) =>
                        new Product({
                            id: tableLine["id"],
                            price: tableLine["price"],
                            description: tableLine["description"],
                            details: tableLine["details"],
                            manufacturer: tableLine["manufacturer"],
                            category: tableLine["category"],
                            measurementUnity: tableLine["measurementUnity"],
                        })
                );
                return products;
            }
            return null;
        } catch (e) {
            logger.error(e.message);
            throw e;
        }
    }
}

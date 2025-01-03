const express = require("express");
const ItemController = require("../controllers/item_controller.js");
const busboy = require("../middlewares/busboy_middleware");

const itemRouter = express.Router();

/**
 * @openapi
 * tags:
 *   name: Item
 *   description: Item management
 */

/**
 * @openapi
 * /item:
 *   post:
 *     summary: Create a new item
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item
 *               description:
 *                 type: string
 *                 description: A description of the item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the item
 *               sub_category_id:
 *                 type: string
 *                 description: The ID of the sub-category the item belongs to
 *               main_category_id:
 *                 type: string
 *                 description: The ID of the main category the item belongs to
 *               files:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: A list of files (images) associated with the item
 *             required:
 *               - name
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item
 *               description:
 *                 type: string
 *                 description: A description of the item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the item
 *               sub_category_id:
 *                 type: string
 *                 description: The ID of the sub-category the item belongs to
 *               main_category_id:
 *                 type: string
 *                 description: The ID of the main category the item belongs to
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The file URLs associated with the item
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Bad request, invalid data or file upload error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.post('/', busboy.bus, ItemController.create);


/**
 * @openapi
 * /item:
 *   get:
 *     summary: Get a list of items
 *     tags: [Item]
 *     parameters:
 *       - name: main_category_id
 *         in: query
 *         description: The ID of the main category
 *         schema:
 *           type: string
 *       - name: sub_category_id
 *         in: query
 *         description: The ID of the sub category
 *         schema:
 *           type: string
 *       - name: max_price
 *         in: query
 *         description: Maximum price of items
 *         schema:
 *           type: number
 *           format: float
 *       - name: min_price
 *         in: query
 *         description: Minimum price of items
 *         schema:
 *           type: number
 *           format: float
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                     format: float
 *       404:
 *         description: No items found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.get("/", ItemController.index);

/**
 * @openapi
 * /item/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Item]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.get("/:id", ItemController.get);

/**
 * @openapi
 * /item/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Item]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item deleted successfully
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
itemRouter.delete("/:id", ItemController.remove);

/**
 * @openapi
 * /item/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Item]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item
 *               description:
 *                 type: string
 *                 description: A description of the item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the item
 *               discount:
 *                  type: number
 *                  format: float
 *                  description: The discount of the item
 *               sub_category_id:
 *                 type: string
 *                 description: The ID of the sub-category the item belongs to
 *               main_category_id:
 *                 type: string
 *                 description: The ID of the main category the item belongs to
 *               files:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: A list of files (images) associated with the item
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item
 *               description:
 *                 type: string
 *                 description: A description of the item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the item
 *               discount:
 *                  type: number
 *                  format: float
 *                  description: The discount of the item
 *               sub_category_id:
 *                 type: string
 *                 description: The ID of the sub-category the item belongs to
 *               main_category_id:
 *                 type: string
 *                 description: The ID of the main category the item belongs to
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

itemRouter.put("/:id", busboy.bus, ItemController.update);

module.exports = itemRouter;

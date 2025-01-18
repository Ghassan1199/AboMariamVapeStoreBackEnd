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
 *               ar_name:
 *                 type: string
 *                 description: The Arabic name of the item
 *               description:
 *                 type: string
 *                 description: A description of the item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the item
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The discount on the item (optional)
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
 *               ar_name:
 *                 type: string
 *                 description: The Arabic name of the item
 *               description:
 *                 type: string
 *                 description: A description of the item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the item
 *               discount:
 *                 type: number
 *                 format: float
 *                 description: The discount on the item (optional)
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
 *                 ar_name:
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
 *     summary: Get a list of items with optional filters and pagination
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
 *       - name: cursor
 *         in: query
 *         description: Cursor for pagination, representing the last item's ID from the previous page
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Number of items to retrieve per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: A list of items with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: float
 *                 cursor:
 *                   type: string
 *                   description: Cursor for the next page of results
 *       404:
 *         description: No items found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message explaining the issue
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item
 *               ar_name:
 *                 type: string
 *                 description: The Arabic name of the item
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
 *                 ar_name:
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
itemRouter.put("/:id", ItemController.update);


/**
 * @openapi
 * /item/{item_id}/{index}:
 *   delete:
 *     summary: Delete a specific photo from a item entry by ID and index
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the FAQ entry to update
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the photo to delete within the FAQ entry
 *     responses:
 *       204:
 *         description: Item entry photo deleted successfully
 *       404:
 *         description: Photo not found or Item entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the photo or item entry was not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue
 */
itemRouter.delete('/:item_id/:index',ItemController.remove_item_photo);

/**
 * @openapi
 * /item/{item_id}:
 *   post:
 *     summary: Add photos to an existing item
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to which photos will be added
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: The files (photos) to be added to the item
 *             required:
 *               - files
 *     responses:
 *       201:
 *         description: Photos added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the item
 *                 photos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The list of photo URLs associated with the item
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request, invalid data or file upload error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message explaining the failure
 */
itemRouter.post('/:item_id', busboy.bus, ItemController.add_item_photo);

/**
 * @openapi
 * /item/{item_id}/{index}:
 *   put:
 *     summary: Edit a specific photo of an item
 *     tags: [Item]
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the item to which the photo belongs
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: The index of the photo to be replaced
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: file
 *                   format: binary
 *                 description: The updated photo file to replace the existing one
 *             required:
 *               - files
 *     responses:
 *       200:
 *         description: Photo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the item
 *                 photos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The updated list of photo URLs associated with the item
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request, invalid data, or file upload error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message explaining the failure
 */
itemRouter.put('/:item_id/:index', busboy.bus, ItemController.edit_item_photo);


module.exports = itemRouter;

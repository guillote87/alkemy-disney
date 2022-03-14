const express = require('express');
const router = express.Router();


const characterController = require('../controllers/characterController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *      Character:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              description: Character name
 *            age:
 *              type: integer
 *              description: Character age
 *            weight:
 *              type: number
 *              description: Character weight
 *            history:
 *              type: string
 *              description: Character history
 *            image:
 *              type: string
 *              description:  Character image (.jpg)
 *          required:
 *            - name
 *            - age
 *            - weight
 *            - history
 *            - image
 *          example:
 *            name : Donald Duck
 *            age: 15
 *            weight: 40 
 *            history: Born in USA 1983
 *            image: DonaldDuck.jpg
 */



/* GET users listing. */
/**
 * @swagger
 * /characters:
 *    get:
 *      summary: return all characters
 *      tags: [Character]
 *      responses:
 *        200:
 *          description : all characters
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items :
 *                $ref: '#/components/schemas/Character'
 */
router.get("/characters", auth, characterController.listCharacters)

/**
 * @swagger
 * /characters/{id}:
 *    get:
 *      summary: return one character
 *      tags: [Character]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           description: Character id
 *      responses:
 *        200:
 *          description: a character
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Character'
 
 */
router.get("/characters/:id", auth, characterController.detail)

/* POST creacion personaje/ */


/**
 * @swagger
 * /characters:
 *    post:
 *      summary: create a new character
 *      tags: [Character]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Character'
 *      responses:
 *        200:
 *          description: new character created
 *        404:
 *          description: not character found
 */
router.post("/characters", auth, characterController.create)
/* PUT edicion personaje/ */
/**
 * @swagger
 * /characters/{id}:
 *    put:
 *      summary: update one character
 *      tags: [Character]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  $ref: '#/components/schemas/Character' 
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           description: Character id
 *      responses:
 *        200:
 *          description: character updated
 
 */
router.put("/characters/:id", auth, characterController.edit)

/* DELETE elimina personaje */

/**
 * @swagger
 * /characters/{id}:
 *    delete:
 *      summary: delete one character
 *      tags: [Character]
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           description: Character id
 *      responses:
 *        200:
 *          description: character delete
 
 */
router.delete("/characters/:id", auth, characterController.delete)

module.exports = router;
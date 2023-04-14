import { Router } from "express";
import { User } from "../models";
import {
  user_create_post,
  user_login_post,
  user_logout_post,
  get_user_byId,
  get_all_user,
  delete_user,
  getUsersByRol,
  user_seed,
  put_user_password_byId,
  put_user_byId
} from "../controllers/user_controller";
import { validateAuth, validateRolChecker } from "../middleware/auth";

const router = Router();

/**
 * @openapi
 * /users/register:
 *    post:
 *      tags:
 *      - users
 *      summary: Create new user on the db
 *
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/bodyUsersRegisterPost'
 *        required: true
 *      responses:
 *        201:
 *          description: (OK) Created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/bodyUsersRegisterPost'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *       responses:
 *
 *          Unauthorized:
 *            description: (Unauthorized) No hay autorizaciÃ³n para llamar al servicio
 *
 *          NotFound:
 *            description: (NotFound) No se encontrÃ³ informaciÃ³n
 *
 *          BadRequest:
 *            description: (Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados
 *
 *          ServerError:
 *            description: Error en servidor
 */
router.post("/register", user_create_post);

router.post("/seed", user_seed);

/**
 * @openapi
 * /users/login:
 *    post:
 *      tags:
 *      - users
 *      summary: To login a user
 *
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/bodyUsersLoginPost'
 *        required: true
 *      responses:
 *        200:
 *          description: (OK) 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/bodyUsersLoginPost'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *       responses:
 *
 *          Unauthorized:
 *            description: (Unauthorized) No hay autorizaciÃ³n para llamar al servicio
 *
 *          NotFound:
 *            description: (NotFound) No se encontrÃ³ informaciÃ³n
 *
 *          BadRequest:
 *            description: (Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados
 *
 *          ServerError:
 *            description: Error en servidor
 */
router.post("/login", user_login_post);

/**
 * @openapi
 * /users/logout:
 *    post:
 *      tags:
 *      - users
 *      summary: To logout a user
 *
 *      responses:
 *        200:
 *          description: (OK) 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/bodyUsersLoginPost'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *       responses:
 *
 *          Unauthorized:
 *            description: (Unauthorized) No hay autorizaciÃ³n para llamar al servicio
 *
 *          NotFound:
 *            description: (NotFound) No se encontrÃ³ informaciÃ³n
 *
 *          BadRequest:
 *            description: (Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados
 *
 *          ServerError:
 *            description: Error en servidor
 */
router.post("/logout", user_logout_post);

/**
 * @openapi
 * /users/{id}:
 *    get:
 *      tags:
 *      - users
 *      summary: To get the information of a specific user
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *
 *      responses:
 *        200:
 *          description: (OK) 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Success'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *       responses:
 *
 *          Unauthorized:
 *            description: (Unauthorized) No hay autorizaciÃ³n para llamar al servicio
 *
 *          NotFound:
 *            description: (NotFound) No se encontrÃ³ informaciÃ³n
 *
 *          BadRequest:
 *            description: (Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados
 *
 *          ServerError:
 *            description: Error en servidor
 */
router.get("/:id", get_user_byId);

// ----- ADMIN ------

/**
 * @openapi
 * /users:
 *    get:
 *      tags:
 *      - users
 *      summary: To get all registered users
 *
 *      responses:
 *        200:
 *          description: (OK) 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Success'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *       responses:
 *
 *          Unauthorized:
 *            description: (Unauthorized) No hay autorizaciÃ³n para llamar al servicio
 *
 *          NotFound:
 *            description: (NotFound) No se encontrÃ³ informaciÃ³n
 *
 *          BadRequest:
 *            description: (Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados
 *
 *          ServerError:
 *            description: Error en servidor
 */
router.get("/", get_all_user);

/**
 * @openapi
 * /users/{id}:
 *    put:
 *      tags:
 *      - users
 *      summary: To update one user
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/bodyUsersUpdatePut'
 *        required: true
 *      responses:
 *        200:
 *          description: (OK) Updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Success'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *       responses:
 *
 *          Unauthorized:
 *            description: (Unauthorized) No hay autorizaciÃ³n para llamar al servicio
 *
 *          NotFound:
 *            description: (NotFound) No se encontrÃ³ informaciÃ³n
 *
 *          BadRequest:
 *            description: (Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados
 *
 *          ServerError:
 *            description: Error en servidor
 */
router.put("/:id", put_user_byId);

/**
 * @openapi
 * /users/{id}:
 *    delete:
 *      tags:
 *      - users
 *      summary: To delete one user
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *
 *      responses:
 *        200:
 *          description: (OK) Deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Success'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *       responses:
 *
 *          Unauthorized:
 *            description: (Unauthorized) No hay autorizaciÃ³n para llamar al servicio
 *
 *          NotFound:
 *            description: (NotFound) No se encontrÃ³ informaciÃ³n
 *
 *          BadRequest:
 *            description: (Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados
 *
 *          ServerError:
 *            description: Error en servidor
 */
router.delete("/:id", validateAuth, validateRolChecker, delete_user);

router.put("/password/:id", put_user_password_byId);

/**
 * @openapi
 * /users/superAdmin:
 *    get:
 *      tags:
 *      - users
 *      summary: To get the information of a specific user
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *
 *      responses:
 *        200:
 *          description: (OK) 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Success'
 *        400:
 *          $ref: '#/components/responses/BadRequest'
 *        401:
 *          $ref: '#/components/responses/Unauthorized'
 *        404:
 *          $ref: '#/components/responses/NotFound'
 *        500:
 *          $ref: '#/components/responses/ServerError'
 * components:
 *       responses:
 *
 *          Unauthorized:
 *            description: (Unauthorized) No hay autorizaciÃ³n para llamar al servicio
 *
 *          NotFound:
 *            description: (NotFound) No se encontrÃ³ informaciÃ³n
 *
 *          BadRequest:
 *            description: (Bad Request) Los datos enviados son incorrectos o hay datos obligatorios no enviados
 *
 *          ServerError:
 *            description: Error en servidor
 */
router.get("/rol/:rol", getUsersByRol);

export default router;

import { Router } from "express";
import { generateToken } from "../config/token";
import { User } from "../models";
import {user_create_post} from "../controllers/user_controller"

const router = Router();

/**
 * @openapi
 * /users/register:
 *    post:
 *      tags:
 *      - users
 *      summary: Create new user on te db
 *
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/bodyUsersRegisterPost'
 *        required: true
 *      responses:
 *        200:
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
router.post("/register", user_create_post );



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
*          description: (OK) Created
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
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (!user)
      return res.status(401).send({
        message: "invalid credentials",
      });

    user.validatePassword(password).then((passwordMatches) => {
      if (!passwordMatches)
        return res.status(401).send({
          message: "invalid credentials",
        });

      const payload = {
        email: user.email,
        fullName: user.fullName,
      };
      const token = generateToken(payload);
      res.cookie("token", token, { httpOnly: true });
      res.send(payload);
    });
  });
});

router.post("/logout", async (req, res, next) => {
  res.clearCookie("token");
  res.sendStatus(204);
});




/**
* @openapi
* /users/{email}:
*    get:
*      tags:
*      - users
*      summary: To get the information of a specific user
*      parameters:
*      - name: email
*        in: path
*        required: true
*        schema:
*          type: string  
*  
*      responses:
*        200:
*          description: (OK) Created
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
router.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ where: { email } });
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

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
*          description: (OK) Created
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
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});




/**
* @openapi
* /users/{email}:
*    put:
*      tags:
*      - users
*      summary: To update one user
*      parameters:
*      - name: email
*        in: path
*        required: true
*        schema:
*          type: string 
*  
*      responses:
*        200:
*          description: (OK) Created
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
router.put("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const userUpdated = await User.update(req.body, {
      where: { email },
      returning: true,
    });
    res.status(200).send(userUpdated[1][0]);
  } catch (error) {
    console.log(error);
  }
});




/**
* @openapi
* /users/{email}:
*    delete:
*      tags:
*      - users
*      summary: To update one user
*      parameters:
*      - name: email
*        in: path
*        required: true
*        schema:
*          type: string 
*  
*      responses:
*        200:
*          description: (OK) Created
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
router.delete("/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const userToDelete = await User.findOne({ where: { email } });
    const userDeleted = await User.destroy({ where: { email } });
    res.status(200).send(userToDelete);
  } catch (error) {
    console.log(error);
  }
});

export default router;

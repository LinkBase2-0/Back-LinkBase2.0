import { Router } from "express";
import { categorie_create, categorie_get_all } from "../controllers/categorie_controller";

const router = Router();

/**
* @openapi
* /categories:
*    post:
*      tags:
*      - categories
*      summary: To create a new categorie
*  
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/bodyCategoriesPost'
*        required: true
*      responses:
*        201:
*          description: (OK) Created
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/bodyCategoriesPost'
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
*            description: (Unauthorized) 
*          
*          NotFound:
*            description: (NotFound)
*          
*          BadRequest:
*            description: (Bad Request) 
*            
*          ServerError:
*            description: (Server Error)
*/ 
router.post("/", categorie_create)



/**
* @openapi
* /categories:
*    get:
*      tags:
*      - categories
*      summary: To get all categories
*  
*      responses:
*        200:
*          description: (OK) 
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/bodyCategoriesPost'
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
router.get("/", categorie_get_all)

export default router;

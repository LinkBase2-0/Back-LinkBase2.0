import { Router } from "express";

import { Categorie } from "../models";
import User from "../models/Users";

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
*        200:
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
router.post("/", async (req, res, next) => {
  try {
    const newCategorie = await Categorie.create(req.body);
    res.status(201).send(newCategorie);
  } catch (error) {
    console.log(error);
  }
});



/**
* @openapi
* /categories/{name}:
*    delete:
*      tags:
*      - categories
*      summary: To delete one categorie
*      parameters:
*      - name: name
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
router.delete("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const categorieToDelete = await Categorie.findOne({ where: { name } });
    const categorieDeleted = await Categorie.destroy({ where: { name } });
    res.status(200).send(categorieToDelete);
  } catch (error) {
    console.log(error);
  }
});




/**
* @openapi
* /categories/{name}:
*    put:
*      tags:
*      - categories
*      summary: To update one categorie
*      parameters:
*      - name: name
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
router.put("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const categorieUpdated = await Categorie.update(req.body, {
      where: { name },
      returning: true,
    });
    res.status(200).send(categorieUpdated[1][0]);
  } catch (error) {
    console.log(error);
  }
});




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
    const categories = await Categorie.findAll();
    res.status(200).send(categories);
  } catch (error) {
    console.log(error);
  }
});

export default router;
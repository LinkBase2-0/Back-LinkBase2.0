import { Router } from "express";

import { Services } from "../models";
import User from "../models/Users";

const router = Router();


/**
* @openapi
* /services:
*    post:
*      tags:
*      - services
*      summary: To create a new service
*  
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/bodyServicesPost'
*        required: true
*      responses:
*        200:
*          description: (OK) Created
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/bodyServicesPost'
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
    const newService = await Services.create(req.body);
    res.status(201).send(newService);
  } catch (error) {
    console.log(error);
  }
});



/**
* @openapi
* /services/{name}:
*    delete:
*      tags:
*      - services
*      summary: To delete one service
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
*                $ref: '#/components/schemas/bodyServicesPost'
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
    const serviceToDelete = await Services.findOne({ where: { name } });
    const serviceDeleted = await Services.destroy({ where: { name } });
    res.status(200).send(serviceToDelete);
  } catch (error) {
    console.log(error);
  }
});




/**
* @openapi
* /services/{name}:
*    put:
*      tags:
*      - services
*      summary: To update one service
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
*                $ref: '#/components/schemas/bodyServicesPost'
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
    const serviceUpdated = await Services.update(req.body, {
      where: { name },
      returning: true,
    });
    res.status(200).send(serviceUpdated[1][0]);
  } catch (error) {
    console.log(error);
  }
});




/**
* @openapi
* /services:
*    get:
*      tags:
*      - services
*      summary: To get all services
*
*      responses:
*        200:
*          description: (OK) Created
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/bodyServicesPost'
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
    const services = await Services.findAll();
    res.status(200).send(services);
  } catch (error) {
    console.log(error);
  }
});

export default router;
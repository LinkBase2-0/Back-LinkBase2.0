import { Router } from "express";

import { Company, User } from "../models";

const router = Router();


/**
* @openapi
* /companies:
*    post:
*      tags:
*      - companies
*      summary: To create a new companie
*  
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/bodyCompanyPost'
*        required: true
*      responses:
*        200:
*          description: (OK) Created
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/bodyCompanyPost'
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
router.post("/", async (req, res) => {
  const { email } = req.body.user;
  const { name } = req.body.company;
  try {
    const newCompany = await Company.findOrCreate({ where: { name } });
    const user: any = await User.findOne({ where: { email } });
    await newCompany[0].addUser(user);
    res.status(200).send(newCompany[0]);
  } catch (error) {
    console.log(error);
  }
});



/**
* @openapi
* /companies/{name}:
*    get:
*      tags:
*      - companies
*      summary: To get all user from one companie
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
*                $ref: '#/components/schemas/bodyCompanyPost'
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
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const users = await Company.findOne({
      where: { name },
      include: { model: User, as: "users" },
    });
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
});



/**
* @openapi
* /companies:
*    get:
*      tags:
*      - companies
*      summary: To get all companies
*  
*      responses:
*        200:
*          description: (OK) Created
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/bodyCompanyPost'
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
router.get("/", async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).send(companies);
  } catch (error) {
    console.log(error);
  }
});

export default router;

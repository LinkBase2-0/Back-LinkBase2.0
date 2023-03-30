import { Router } from "express";

import { Services, Provider,Categories, User } from "../models";

const router = Router();



/**
* @openapi
* /providers:
*    post:
*      tags:
*      - providers
*      summary: To create a new provider
*  
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/bodyProvidersPost'
*        required: true
*      responses:
*        200:
*          description: (OK) Created
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/bodyProvidersPost'
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
  const { provider } = req.body;
  const { services } = req.body;
  const {categories} = req.body;
  const {user} = req.body
  try {
    const newProvider = await Provider.create(provider);

    services.map((service: string) => {
      Services.findOrCreate({
        where: { name: service },
      }).then((service) => {
        newProvider.addService(service[0])
      } );
    });

    categories.map(async (categoryName: string) => {
      const category = await Categories.findOne({
        where: { name: categoryName },
      })
      category && await newProvider.addCategorie(category)
    });

    User.findOne({where:{email: user.email}})
    .then(user => user && newProvider.setTo(user)) 

    res.status(201).send(newProvider);
  } catch (error) {
    console.log(error);
  }
});






/**
* @openapi
* /providers/{name}:
*    put:
*      tags:
*      - providers
*      summary: To update a new provider
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
*                $ref: '#/components/schemas/bodyProvidersPost'
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
    const providerUpdated = await Provider.update(req.body, {
      where: { name },
      returning: true,
    });
    res.status(200).send(providerUpdated[1][0]);
  } catch (error) {
    console.log(error);
  }
});



/**
* @openapi
* /providers/{name}:
*    put:
*      tags:
*      - providers
*      summary: To update a new provider
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
*                $ref: '#/components/schemas/bodyProvidersPost'
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
    const providerToDelete = await Provider.findOne({ where: { name } });
    const providerDeleted = await Provider.destroy({ where: { name } });
    res.status(200).send(providerToDelete);
  } catch (error) {
    console.log(error);
  }
});



/**
* @openapi
* /providers/{name}:
*    get:
*      tags:
*      - providers
*      summary: To get one provider
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
*                $ref: '#/components/schemas/bodyProvidersPost'
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
router.get("/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const provider = await Provider.findOne({ where: { name } });
    res.status(200).send(provider);
  } catch (error) {
    console.log(error);
  }
});




/**
* @openapi
* /providers:
*    get:
*      tags:
*      - providers
*      summary: To get all providers
*  
*      responses:
*        200:
*          description: (OK) Created
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/bodyProvidersPost'
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
    const providers = await Provider.findAll();
    res.status(200).send(providers);
  } catch (error) {
    console.log(error);
  }
});

router.get("/pendingF", async (req, res, next) => {
  try {
    const providers = await Provider.findAll({ where: { isPending: false } });
    res.status(200).send(providers);
  } catch (error) {
    console.log(error);
  }
});

router.get("/pendingT", async (req, res, next) => {
  try {
    const providers = await Provider.findAll({ where: { isPending: true } });
    res.status(200).send(providers);
  } catch (error) {
    console.log(error);
  }
});




/**
* @openapi
* /providers/filter/{categorieName}:
*    get:
*      tags:
*      - providers
*      summary: To get all the providers of a certain categorie
*      parameters:
*      - name: categorieName
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
router.get("/filter/:categorieName", async (req, res, next) => {
  const name = req.params.categorieName;
  try {
      const providers = await Categories.findOne({
          where: { name },
          include: { model: Provider, as: "providers" },
      });
      res.status(200).send(providers?.providers);
  } catch (error) {
      console.log(error);
  }
});




/**
* @openapi
* /providers/filter/{serviceName}:
*    get:
*      tags:
*      - providers
*      summary: To get all the providers of a certain service
*      parameters:
*      - name: serviceName
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
*                $ref: '#/components/schemas/bodyProvidersPost'
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
router.get("/filter/:serviceName", async (req, res, next) => {
  const name = req.params.serviceName;
  try {
    const providers = await Services.findOne({
      where: { name },
      include: { model: Provider, as: "providers" },
    });
    res.status(200).send(providers?.providers);
  } catch (error) {
    console.log(error);
  }
});

export default router;

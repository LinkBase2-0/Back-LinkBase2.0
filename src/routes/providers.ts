import { Router } from "express";

import {provider_create_post, provider_update, provider_delete, provider_get_one, provider_get_all, 
    provider_filter_by_categorie, provider_filter_by_service, provider_filter_by_categorieName, provider_get_one_name,
    provider_pending_false, provider_pending_true, provider_seed} from "../controllers/provider_controller"

import { validateRolAdminProviders, validateAuth, validateRolSuperAdmin } from "../middleware/auth";

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
*        201:
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
router.post("/", provider_create_post)

router.post("/seed", provider_seed)



/**
* @openapi
* /providers/{id}:
*    put:
*      tags:
*      - providers
*      summary: To update a provider
*      parameters:
*      - name: id
*        in: path
*        required: true
*        schema:
*          type: string  
*  
*      responses:
*        200:
*          description: (OK) Updated
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
router.put("/:id",provider_update)


/**
* @openapi
* /providers/{id}:
*    delete:
*      tags:
*      - providers
*      summary: To delete a provider
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
router.delete("/:id", provider_delete)


/**
* @openapi
* /providers/find/{id}:
*    get:
*      tags:
*      - providers
*      summary: To get one provider
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
router.get("/findId/:id", provider_get_one)

router.get("/find/:name", provider_get_one_name)


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
*          description: (OK) 
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
router.get("/", provider_get_all)



/**
* @openapi
* /providers/pendingF:
*    get:
*      tags:
*      - providers
*      summary: To get all providers with pending false
*  
*      responses:
*        200:
*          description: (OK) 
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
router.get("/pendingF",provider_pending_false)


/**
* @openapi
* /providers/pendingT:
*    get:
*      tags:
*      - providers
*      summary: To get all providers with pending true
*  
*      responses:
*        200:
*          description: (OK) 
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
router.get("/pendingT", provider_pending_true)

/**
* @openapi
* /providers/filterByCategorie/{categoryId}:
*    get:
*      tags:
*      - providers
*      summary: To get all the providers of a certain categorie
*      parameters:
*      - name: categoryId
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
router.get("/filterByCategorieId/:categoryId", provider_filter_by_categorie)

router.get("/filterByCategorie/:categoryName", provider_filter_by_categorieName)
/**
* @openapi
* /providers/filterByService/{serviceId}:
*    get:
*      tags:
*      - providers
*      summary: To get all the providers of a certain service
*      parameters:
*      - name: serviceId
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
router.get("/filterByService/:serviceId", provider_filter_by_service)

export default router;

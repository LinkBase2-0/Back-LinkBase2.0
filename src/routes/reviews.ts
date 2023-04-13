import { Router } from "express";
import { review_create, review_delete, review_get_all, review_get_of_provider, review_get_of_user, review_get_one, review_seed } from "../controllers/review_controller";

import { Provider, Review, User } from "../models";
import { validateAuth, validateRolAdminReviews } from "../middleware/auth";

const router = Router();


/**
* @openapi
* /reviews:
*    post:
*      tags:
*      - reviews
*      summary: To create a new review
*  
*      requestBody:
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/bodyReviewsPost'
*        required: true
*      responses:
*        201:
*          description: (OK) Created
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/bodyReviewsPost'
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
router.post("/",validateAuth, review_create)

router.post("/seed", review_seed)

/**
* @openapi
* /reviews/userReviews/{userId}:
*    get:
*      tags:
*      - reviews
*      summary: To get the reviews of a specific user
*      parameters:
*      - name: userId
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
*                $ref: '#/components/schemas/bodyReviewsPost'
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
router.get("/userReviews/:userId", review_get_of_user)


/**
* @openapi
* /reviews/providerReviews/{providerId}:
*    get:
*      tags:
*      - reviews
*      summary: To get the reviews of a specific provider
*      parameters:
*      - name: providerId
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
*                $ref: '#/components/schemas/bodyReviewsPost'
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
router.get("/providerReviews/:providerId", review_get_of_provider)


/**
* @openapi
* /reviews/{reviewId}:
*    delete:
*      tags:
*      - reviews
*      summary: To delete a review
*      parameters:
*      - name: reviewId
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
*                $ref: '#/components/schemas/bodyReviewsPost'
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
router.delete("/:reviewId", review_delete)


/**
* @openapi
* /reviews/{reviewId}:
*    get:
*      tags:
*      - reviews
*      summary: To get one review
*      parameters:
*      - name: reviewId
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
*                $ref: '#/components/schemas/bodyReviewsPost'
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
router.get("/:reviewId", review_get_one)


/**
* @openapi
* /reviews:
*    get:
*      tags:
*      - reviews
*      summary: To get all reviews from all users
*  
*      responses:
*        200:
*          description: (OK) 
*          content:
*            application/json:
*              schema:
*                $ref: '#/components/schemas/bodyReviewsPost'
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
router.get("/", review_get_all)

export default router;

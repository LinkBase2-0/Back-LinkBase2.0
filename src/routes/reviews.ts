import { Router } from "express";

import { Provider, Review, User } from "../models";

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
*        200:
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
router.post("/", async (req, res, next) => {
  const { review } = req.body;
  const { email } = req.body.user;
  const { name } = req.body.provider;
  try {
    const newReview = await Review.create(review);
    const user = await User.findOne({ where: { email } });
    const provider = await Provider.findOne({ where: { name } });

    await user?.addReview(newReview);
    await provider?.addReview(newReview);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
});



/**
* @openapi
* /reviews/userReviews/{email}:
*    get:
*      tags:
*      - reviews
*      summary: To get the reviews of a specific user
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
router.get("/userReviews/:email", async (req, res, next) => {
  const { email } = req.params;
  try {
    const userReviews = await User.findOne({
      where: { email },
      include: { model: Review, as: "reviews" },
    });
    res.status(200).send(userReviews);
  } catch (error) {
    console.log(error);
  }
});


/**
* @openapi
* /reviews/providerReviews/{name}:
*    get:
*      tags:
*      - reviews
*      summary: To get the reviews of a specific provider
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
router.get("/providerReviews/:name", async (req, res, next) => {
  const { name } = req.params;
  try {
    const providerReviews = await Provider.findOne({
      where: { name },
      include: { model: Review, as: "reviews" },
    });
    res.status(200).send(providerReviews);
  } catch (error) {
    console.log(error);
  }
});


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
router.delete("/:reviewId", async (req, res, next) => {
  const id = req.params.reviewId;
  try {
    const reviewToDelete = await Review.findByPk(id);
    const reviewDeleted = await Review.destroy({
      where: { text: reviewToDelete?.text },
    });
    res.status(200).send(reviewToDelete);
  } catch (error) {
    console.log(error);
  }
});



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
router.get("/:reviewId", async (req, res, next) => {
  const id = req.params.reviewId;
  try {
    const review = await Review.findByPk(id);
    res.status(200).send(review);
  } catch (error) {
    console.log(error);
  }
});



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
router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
  }
});

export default router;

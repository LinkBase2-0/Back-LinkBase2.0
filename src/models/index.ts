import Sequelize from "sequelize";
import Services from "./Services";
import Provider from "./Providers";
import Review from "./Reviews";
import User from "./Users";
import Company from "./Company";
import Categories from "./Categories";

export { Services, Provider, Review, User, Company, Categories };

/**
* @openapi
* components:
*   schemas:
*     bodyUsersRegisterPost:
*       type: object
*       properties:
*         user:
*           type: object
*           properties:
*             fullName:
*                type: string
*             email:
*                type: string
*             password:
*                type: string
*             rol:
*                type: enum
*             charge:
*                type: string
*             isPending: 
*                type: boolean
*         company:
*            type: object
*            properties:
*              name: 
*                 type: string 
*
*
*     bodyUsersLoginPost:
*       type: object
*       properties:
*         email:
*            type: string
*         password:
*            type: string
*
*
*     bodyProvidersPost:
*       type: object
*       properties:
*          provider:
*             type: object
*             properties:
*               name:
*                  type: string
*               email:
*                  type: string
*               latitude:
*                  type: string
*               address:
*                  type: string
*               longitude:
*                  type: string
*               phone:
*                  type: bigint
*               web:
*                 type: string
*               photoURL:
*                  type: string
*               isPending:
*                  type: boolean
*               time:
*                  type: string   
*          services:
*             type: enum
*             description: Array of strings
*          categories:
*             type: enum
*             description: Array of strings
*          user:
*             type: object
*             properties:
*                email:
*                    type: string
*
*
*     bodyReviewsPost:
*       type: object
*       properties:
*          review:
*             type: object
*             properties:
*               text:
*                 type: string
*               starts:
*                 type: number
*          user:
*             type: object
*             properties:
*               email:
*                 type: string
*          provider:
*             type: object
*             properties:
*               name:
*                 type: string
*
*     bodyCategoriesPost:
*       type: object
*       properties:
*         name:
*           type: string
*     bodyServicesPost:
*       type: object
*       properties:
*         name:
*           type: string
*     bodyCompanyPost:
*       type: object
*       properties:
*         user:
*           type: object
*           properties:
*             email:
*                type: string 
*         company:
*           type: object
*           properties:
*             name:
*                type: string 
*
*     Success:
*       type: object
*       properties:
*         respuesta:
*           type: integer
*           enum: [1]
*           description: successful
*
*
*
*
*/

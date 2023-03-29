import Sequelize from "sequelize";
import Services from "./Services";
import Provider from "./Providers";
import Review from "./Reviews";
import User from "./Users";
import Company from "./Company";

export { Services, Provider, Review, User, Company };


/**
 * @openapi
 * components: 
 *  schemas:
 *   bodyUsersRegisterPost:
 *     type: object
 *     properties:
 *       fullName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       rol:
 *         type: enum
 *       charge:
 *         type: string
 *       isPending: 
 *         type: boolean
 *
 *   
 *   bodyUsersLoginPost:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         description: Apellido del usuario
 *       password:
 *         type: string
 *         description: Contrasena del usuario
 *  
 *   bodyUsersLogoutPost:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         description: Apellido del usuario
 *       password:
 *         type: string
 *         description: Contrasena del usuario
 *
 *   bodyProvidersPost:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       latitude:
 *         type: string
 *       address:
 *         type: string
 *       longitude:
 *         type: string
 *       phone:
 *         type: bigint
 *       web:
 *         type: string
 *       photoURL:
 *         type: string
 *       isPending:
 *         type: boolean
 *       time: 
 *         type: string    
 *   
 *   bodyReviewsPost:
 *     type: object
 *     properties:
 *       text:
 *         type: string
 *       starts:
 *         type: number
 *
 *   bodyCategoriesPost:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *   bodyCompanyPost:
 *     type: object
 *     properties:
 *       name:
 *         type: string       
 *
 *   Success:
 *     type: object
 *     properties:
 *       respuesta:
 *         type: integer
 *         enum: [1]
 *         description: successful
 * 
 * 
 * 
 * 
 */


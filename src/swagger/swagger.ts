import { Express, Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LinkBase",
      version: "2.0",
      description:
        "Para instalar el Backend de LinkBase, siga estos pasos:<br/><br/> <b/> <br/> 1)Clonar el repositorio. <br/> 2)En la raíz del proyecto, ejecute el comando npm install para instalar las dependencias del proyecto.<br/> 3)Crear una base de dato de nombre linkBase.<br/> 4)Ejecute el comando npm start para iniciar la aplicación.<br/> 5)Ejecute el comando npm run deletedb para borrar la db y npm run seed para sedear la base de datos",
    },
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app: Express, port?: string) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "applicaion/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Hey this api has documentation at http://localhost:${port}/docs`
  );
}

export default swaggerDocs;

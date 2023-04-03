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
        "Para instalar el Backend de LinkBase, siga estos pasos:<br/><br/> <b/> <br/> 1)En la raíz del proyecto, ejecute el comando npm install para instalar las dependencias del proyecto.<br/> 2)Crear una base de dato de nombre linkBase.<br/> 3)Ejecute el comando npm start para iniciar la aplicación.<br/> 4)Ejecute el comando npm run deletedb para borrar la db y npm run seed para sedear la base de datos  <b/>  <br/><br/> Roles: <br/> <br/> <b/> 1)cliente: <b/>  Es el usuario comun que puede proponer proveedores, dejar reviews y obtener informacion de proveedores <br/> <br/>2)checker: Hay un verificador por empresa que se encarga de checkear que el usuario nuevo pertenece a su empresa ademas de lo mismo que el cliente <br/><br/>3)admin: Colabora con una tarea como verificar provedores ('admin(providers) o controlar que los comentarios no se vayan del tono profesional ('admin(reviesw)') <br/><br/>4)superAdmin: Tiene control total incluye borrar usuarios y provedores y asignar admins",
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

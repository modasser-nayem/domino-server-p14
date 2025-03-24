import express from "express";
import cors from "cors";
import { notfound } from "./app/middlewares/notFound";
import routers from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.handleErrors();
  }

  private config() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    // home route
    this.app.get("/", (req, res) => {
      res
        .status(200)
        .send(
          '<div style="height:80vh; width:100vw; display:flex; justify-content:center;align-items:center;font-size:4rem;font-style: oblique;font-weight: bold;font-family:system-ui;color:purple;">Domino Server is Running...</div>',
        );
    });

    // app routes
    this.app.use("/api/v1", routers);
  }

  private handleErrors() {
    this.app.use(notfound);
    this.app.use(globalErrorHandler);
  }
}

export default new App().app;

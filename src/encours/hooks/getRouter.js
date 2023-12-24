import { Router } from "../router/Router";

export const getRouter = () => {
  const router = Router.getInstance();
  return router;
};

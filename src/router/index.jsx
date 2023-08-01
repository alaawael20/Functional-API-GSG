import { routes } from "./routes";
import { useRoutes } from "react-router-dom";

const Router = () => {
  const handleRoles = () => {
    return [...routes]
  };
  const router = useRoutes(handleRoles());
  return router;
};

export default Router;

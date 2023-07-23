import { useState } from "react";
import { adminPages, routes, userPages } from "./routes";
import { useRoutes } from "react-router-dom";

const Router = () => {
  const [role, setRole] = useState('admin');

  const handleRoles = () => {
    if (role === 'user') {
      return [...routes, ...userPages];
    }
    return [...routes, ...adminPages(role)];
  };
  const router = useRoutes(handleRoles());

  return router;
};

export default Router;

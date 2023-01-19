import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import UserForm from "./views/UserForm";
import Users from "./views/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" /> // this will navigate to the path
        // element: <Users />             // this will render <Users /> for this path
      },
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/users/new",
        element: <UserForm key="userCreate" />
      },
      {
        path: "/users/:id",
        element: <UserForm key="userUpdate" />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      }
    ]
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;

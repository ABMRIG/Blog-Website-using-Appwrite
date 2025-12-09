import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import { AuthLayout, Login } from "./components/index.js";

import AddPost from "./components/pages/AddPost.jsx";
import Signup from "./components/pages/Signup.jsx";
import EditPost from "./components/pages/EditPost.jsx";

import Post from "./components/pages/Post.jsx";

import AllPosts from "./components/pages/AllPosts.jsx";
import MyPosts from "./components/pages/MyPosts.jsx";

//authentication is set to false by default when a page should strictly be shown to a user if he/she is not logged in otherwise the default value of authenticaion is set to true inside of AuthlLayout.jsx

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: (
        <AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
      )
    },
    {
      path: "/signup",
      element: (
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      )
    },
    {
      path: "/all-posts",
      element: (
        <AuthLayout authentication>
          {" "}
          <AllPosts />
        </AuthLayout>
      )
    },
    {
      path: "/add-post",
      element: (
        <AuthLayout authentication>
          {" "}
          <AddPost/>
        </AuthLayout>
      )
    },
    {
      path: "/edit-post/:slug",
      element: (
        <AuthLayout authentication>
          {" "}
          <EditPost/>
        </AuthLayout>
      )
    },
    {
      path: "/post/:slug",
      element: <Post/>
    },
    {
        path:"/my-posts",
        element: <MyPosts/>
    }
  ]
}]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);


import { createBrowserRouter } from "react-router-dom"

import HomePage from "../Pages/HomePage"

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <HomePage/>,
        children: [
            {path: "homePage", element: <HomePage/>}
        ]
    }
])
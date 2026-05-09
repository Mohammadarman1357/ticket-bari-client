import { createBrowserRouter } from "react-router";
import MyLayout from '../layouts/MainLayout';


export const router = createBrowserRouter([
    {
        path: "/",
        Component: MyLayout,
        children: [
            {
                index: true,
                
            }]
    }])
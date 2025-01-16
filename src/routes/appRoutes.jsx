import { createBrowserRouter } from "react-router-dom";
import Books from "./Books";
import Root from "./Root";
import Book from "./Book";
import AddBook from "./AddBook";

export const router = createBrowserRouter(
    [
        {
         path: '/', 
         element: <Root/> ,
         errorElement: <div>404</div>,
         children: [
                    {path:'/', element: <Books/>},
                    {path:'/book/:id', element: <Book/>},
                    {path: '/addBook', element: <AddBook/>},
                   ]
        }
    ]
);
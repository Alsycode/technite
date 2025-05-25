import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MortgageCalculator from './pages/MortgageCalculator';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MortgageCalculator/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)

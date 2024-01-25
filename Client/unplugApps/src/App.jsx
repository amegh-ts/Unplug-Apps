import './App.scss'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Print from './Pages/Print';
import Home from './Pages/Home';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    }, {
      path: '/print',
      element: <Print />
    },
  ])

  return (
    <div className='App'>
      <RouterProvider router={router}></RouterProvider>
    </div>

  )
}

export default App

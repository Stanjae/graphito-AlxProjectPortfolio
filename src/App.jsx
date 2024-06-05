
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Products from './Pages/Products'
import { ErrorPage } from './Components/ErrorPage'
import DefaultLayout from './Layout/DefaultLayout'
import ContactUs from './Pages/ContactUs'
import { DataContext } from './Context/DataContext'
import GraphyPage from './Pages/GraphyPage'

const router = createBrowserRouter([
  {path:'/', element:<HomePage/>, errorElement:<ErrorPage/>},
  {path:'/products', element:<DefaultLayout/>, errorElement:<ErrorPage/>, children:[
    {index:true, element:<Products/>},
    {path:'contact-us', element:<ContactUs/>},
    {path:'graph', element:<GraphyPage/>}
  ]}
])


function App() {


  return (
    <>
    <DataContext>
      <RouterProvider router={router}/>
    </DataContext>
      
    </>
  )
}

export default App

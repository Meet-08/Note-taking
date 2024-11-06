import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar, Home, Notes, View } from './Components';


const route = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path:"/notes",
      element:
      <div>
        <Navbar />
        <Notes />
      </div>
    },
    {
      path:"/notes/:id",
      element:
      <div>
        <Navbar />
        <View />
      </div>
    }
  ]
);

const App = () => {
  return (
    <div>
      <RouterProvider router={route}/>
      <h1 className='bg-red-500 text-6xl text-center text-blue-500'>Note taking app</h1>
    </div>
  )
}

export default App
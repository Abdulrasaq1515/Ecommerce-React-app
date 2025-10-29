import React from 'react'
import { RouterProvider } from 'react-router'
import router from './route/router'
import './App.css'

function App() {
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App

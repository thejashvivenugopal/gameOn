import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes.ts'
import { ToastContainer } from 'react-toastify'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18.ts';

export default function App() {
  return (
    <div><I18nextProvider i18n={i18n}>
    <RouterProvider router={routes} />
    {/* Toast container is rendered globally to show toast notifications */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      closeButton={true}
      className="Toastify__toast-container"  // Custom class to style it
    />
  </I18nextProvider></div>
    
  )
}

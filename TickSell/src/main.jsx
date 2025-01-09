import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import { Header } from './components/index.js'
import Signup from './components/Signup.jsx'
import Home from './components/Home.jsx'
import Sell from './components/Sell.jsx'
import Buy from './components/Buy.jsx'
import TicketDisplay from './Pages/TicketDisplay.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Home />
        ),
      },
      {
          path: "/login",
          element: (
              <Login />
          ),
      },
      {
          path: "/signup",
          element: (
              <Signup />
          ),
      },
      {
          path: "/sell",
          element: (
              <Sell />
          ),
      },
      {
          path: "/buy",
          element: (
              <Buy />
          ),
      },
      {
          path: "/ticketDisplay",
          element: (
              <TicketDisplay />
          ),
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)

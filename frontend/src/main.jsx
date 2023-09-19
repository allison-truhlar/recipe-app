import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App"
import {RecipesContextProvider} from './context/RecipeContext'
import {AuthContextProvider} from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipesContextProvider>
        <App/>
      </RecipesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)

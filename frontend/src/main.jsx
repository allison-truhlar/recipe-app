import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "./App"
import {RecipesContextProvider} from './context/RecipeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecipesContextProvider>
      <App/>
    </RecipesContextProvider>
  </React.StrictMode>,
)

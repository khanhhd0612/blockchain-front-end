import "./assets/fonts/tabler-icons.min.css"
import "./assets/fonts/fontawesome.css"
import "./assets/fonts/material.css"
import "./assets/css/style.css"
import "./assets/css/style-preset.css"
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import routes from './routes/routes'

function AppRoutes() {
  const element = useRoutes(routes)
  return element
}
function App() {
  return (
      <Router>
            <AppRoutes />
          </Router>
  );
}

export default App;

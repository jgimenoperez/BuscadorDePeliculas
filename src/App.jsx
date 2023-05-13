import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { Movie } from "./pages/movie";

function App() {
  return (
    <Router>
      <div>
       
     
        <Routes>
          <Route path="/" element={<Home/>} exact />
          <Route path="/movie/:id" element={<Movie/>} />
          
          {/* <Route path="/series" element={<Items typeItem={'series'}/>} />
          // <Route path="/movies" element={<Items typeItem={'movie'}/>} /> */}
          {/* cualquier otra ruta al home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App;

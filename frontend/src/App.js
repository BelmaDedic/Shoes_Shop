import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import './App.css';
import Shoes from './Shoes';
import AddShoes from './AddShoes';
import NotFound from './NotFound';
import EditShoes from './EditShoes';

function App() {
  return (
    <Router>
      <div className="App">
        < Navbar />
        <Routes>
          <Route exact path='/' element={ < Shoes />} />
          <Route path='/Shoes/new' element={< AddShoes />} />
          <Route path='/Shoes/edit/:id' element={< EditShoes />} />
          <Route path='*' element={< NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Book from './components/Book';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/Book' element={<Book/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;

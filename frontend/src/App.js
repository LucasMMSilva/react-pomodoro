import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Pomodoro from './Pages/Pomodoro/Pomodoro';

import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

import Welcome from './components/Welcome/Welcome';
import Clock from './components/Clock/Clock'

import CreateTask from './components/CreateTask/CreateTask'
import EditTask from './components/EditTask/EditTask';

import ErrorPage from './components/ErrorPage/ErrorPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Pomodoro><Welcome/></Pomodoro>}/>
            <Route path='/createnewtask' element={<Pomodoro>
              <CreateTask/>
            </Pomodoro>}/>
            <Route path='/edittask/:id' element={<Pomodoro>
              <EditTask/>
            </Pomodoro>}/>
            <Route path='/task/:id' element={<Pomodoro>
              <Clock/>
            </Pomodoro>}/>
            <Route path='/error' element={<Pomodoro>
              <ErrorPage/>
            </Pomodoro>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

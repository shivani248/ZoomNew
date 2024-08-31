import './App.css';
import {Route , Routes} from 'react-router-dom'
import About from './page/About';
import Contact from './page/Contact';
import Policy from './page/Policy';
import PageNotFound from './page/PageNotFound';
import Register from './page/Auth/Register';
import Login from './page/Auth/Login';
import Dashboard from './page/Dashboard';
import CreateMeeting from './page/CreateMeeting'
import EditMeeting from './page/EditMeeting';

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/create' element={<CreateMeeting/>}/>
        <Route path='/edit' element={<EditMeeting/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/policy' element={<Policy/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;

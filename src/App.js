import {Route,Switch} from 'react-router-dom'
import Home from './components/Home/home'
import './App.css';
import Transaction from './components/Transaction/transaction';
import NavBar from './components/NavBar/nav';

function App() {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/addtransaction' component={Transaction}/>
      </Switch>
    </>
  );
}

export default App;

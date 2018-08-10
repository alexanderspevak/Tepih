import 'antd/dist/antd.css'
import {Wrap} from './context';
import * as React from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import './App.css';
import Products from './components/products/products';
import Basket from './components/buy/basket';
import Login from './components/login/Login';
import Hvala from './components/hvala/Hvala';
import { ApolloProvider} from 'react-apollo';
import {client} from './client';
import {AUTH_TOKEN} from './constants';
import {Redirect} from 'react-router';
import Administration from './components/administration/orders';

interface IProps{
  history:any
}
interface IState{
  admin:boolean
  redirect:boolean
}
class App extends React.Component <IProps,IState>{
  constructor(props:any){
    super(props)
    this.state={
      admin:false,
      redirect:false
    }
    this.checkLocalStorage=this.checkLocalStorage.bind(this);
    this.logOut=this.logOut.bind(this);
  }

  componentDidMount(){
    console.log('local storage', localStorage.getItem(AUTH_TOKEN))
    this.checkLocalStorage()
  }
  logOut(){
    localStorage.removeItem(AUTH_TOKEN);
    this.checkLocalStorage();
  }
  checkLocalStorage(){
    if(localStorage.getItem(AUTH_TOKEN)){
      this.setState({admin:true})
    }else{
      this.setState({admin:false})
    }
  }
  public render() {
    if(this.state.redirect){
      return (
        <Redirect to="/login"/>
      )
    }
    return (
      <ApolloProvider client={client as any}>
        <div className="App">
          <header className="App-header">
          <ul>
            <li onClick={()=>this.props.history.push('/')}>Početna</li>
            <li onClick={()=>this.props.history.push('/products')}>Proizvodi</li>
            <li onClick={()=>this.props.history.push('/basket')}>Koš</li>
            <li>
                {this.state.admin?<div onClick={this.logOut}>Logout</div>:
                <div onClick={()=>this.props.history.push('/login')}>Login</div>}
            </li>
          </ul>
          
            
          </header>
          <p className="App-intro">
            To get started, edit eee<code>src/App.tsx</code> and save to reload.
            </p>
            <Switch>
              <Route exact={true} path="/products" render={(props:any)=><Products {...props} admin={this.state.admin }/>} />
              <Route exact={true} path="/context" component={Wrap} />
              <Route exact={true} path="/basket" component={Basket} />
              <Route exact={true} path="/hvala" component={Hvala} />
              <Route exact path="/login" render={(props:any)=><Login {...props} admin={this.state.admin} checkLocalStorage={this.checkLocalStorage}/>} />
              <Route exact path="/admin"render={(props:any)=><Administration {...props} admin={this.state.admin}/>}/>
            </Switch>
        </div>
      </ApolloProvider>
    );
  }
}

export default withRouter(App);

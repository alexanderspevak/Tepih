import React, { Component } from 'react'
import { AUTH_TOKEN } from '../../constants'
import {LOGIN} from '../../queries/queries';
import {graphql,compose} from 'react-apollo'
import {Redirect} from 'react-router';
//import {message} from 'antd';

interface IProps{
  login(params:{variables:{login:string,password:string}}):Promise<string>
  admin:boolean
  checkLocalStorage():void
}

interface IState{
  login:string,
  password:string
  redirect:boolean
}

class Login extends Component <IProps,IState>{
  constructor(props:any){
    super(props)
    this.state = {
      redirect:false,
      login: '', 
      password: '',
  
    }
  }


  render() {
    if(this.props.admin){
    return (<div>
      vec ste prijavljeni
    </div>)
    }
    if(this.state.redirect){
      return <Redirect to="/"/>
  }

    const { login, password} = this.state
    return (
      <div>
        <h4 className="mv3">Login</h4>
        <div >
          {
            <input
              value={login}
              onChange={e => this.setState({ login: e.target.value })}
              type="text"
              placeholder="Korisnicko ime"
            />
          }

          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Lozinka"
          />
        </div>
        <button onClick={this._confirm}>Potvrdi</button>

      </div>
    )
  }

  _confirm = async () => { 
    this.props.login({variables:{login:this.state.login,password:this.state.password}})
    .then((promise:any)=>{
      console.log('promise',promise.data.login)
      this._saveUserData(promise.data.login)
      this.props.checkLocalStorage()
    })
    .catch((err)=>{
       alert(err) 
      
    })
  }

  _saveUserData = (token:any) => {  
    localStorage.setItem(AUTH_TOKEN, token)
    this.setState({redirect:true})

  }
}

export default compose(graphql(LOGIN,{name:'login'}))(Login)
import 'antd/dist/antd.css'
import {Wrap} from './context';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Products from './components/products/products';
import { ApolloProvider } from 'react-apollo';
import {client} from './client';



class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            hello
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
            </p>
            <Switch>
              <Route exact={true} path="/products" render={(props:any)=><Products {...props} admin="false"/>} />
              <Route exact={true} path="/context" component={Wrap} />
            </Switch>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;


import  * as React from 'react';


// interface ProviderState {
//   number: number
// }


// interface ProviderStore {
//   value:any

// }


export const Context = React.createContext({} as any)

export class Provider extends React.Component {
  state={
    item:'hello munchmallow'
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}


export class Item extends React.Component {
  
      render(){
        return (
          <Context.Consumer>
            {(context)=>  (
              <p> Ceo is {context.item}</p>
            )}
          </Context.Consumer>
        )
  
      }
  }
  

export class Wrap extends React.Component {

    render(){
      return (
        <Provider>
          <Item/>
        </Provider>
      )

    }
}















   
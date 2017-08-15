import React, { Component } from 'react';
import firebase from 'firebase';
import './App.css';

class App extends Component {
 
constructor(){
    super();

      this.state = {
        user:null
      };


 this.handleAuth = this.handleAuth.bind(this);
 this.handleLogout = this.handleLogout.bind(this);

} 

 componentWillMount = () => {
   firebase.auth().onAuthStateChanged(user =>{

      this.setState({ user:user})

   })
 }
 


  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));

}

  handleLogout(){
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha salido`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

renderLoginButton(){
  //Si está logueado
    if(this.state.user != null){

        return(
          <div className="App-info">
          <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <h1>
            Hola {this.state.user.displayName} 
            <br/>
            Tu Email es {this.state.user.email}
          </h1>
                 <button onClick={this.handleLogout}>Salir</button>

          </div>

        );

    }else{
      return(
       <button onClick={this.handleAuth}>Login con Google</button>
      );
    }
  //Si no está logueado
}


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>CloneGram</h2>
        </div>
        <p className="App-intro">{ this.renderLoginButton() }</p>
      </div>
    );
  }
}

export default App;

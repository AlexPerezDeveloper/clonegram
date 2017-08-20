import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './yourface.png';

import './App.css';
import './BeautyReactivo.css';
import FileUpload from './FileUpload';


class App extends Component {
  constructor () {
    super();
    this.state = {
      user: null,
      pictures: [],
      uploadValue: 0

    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleUpload (event) {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`fotos/${file.name}`);
    const task = storageRef.put(file);
    task.on('state_changed', snapshot => {
 
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      console.error(error.message);
    }, () => {
     
      const record = {
        photoURL: this.state.user.photoURL,
        displayName: this.state.user.displayName,
        image: task.snapshot.downloadURL
      }
      const dbRef = firebase.database().ref('pictures');
      const newPicture = dbRef.push();
      newPicture.set(record);
    });
  }

  renderLoginButton () {
    if (!this.state.user) {
      return (
        <button onClick={this.handleAuth} className="App-btn">
          Iniciar sesión con Google
        </button>
      );
    } else  {
      return (
        <div>
        <div className="row">
        <div className="container profile">
        
          <img className="grid-4-sm" src={this.state.user.photoURL} alt={this.state.user.displayName} />
          <p className="grid-8-sm">¡Hola, { this.state.user.displayName }!</p>
        
          <button onClick={this.handleLogout} className="">
            Salir
          </button>

          </div>
          </div>
          <div className="row">
          <div className="container">
          <FileUpload onUpload={ this.handleUpload }  uploadValue={ this.state.uploadValue } />

          {
            this.state.pictures.map(picture => (
              <div className="">
                <figure className="">
                  <img className="" width="auto" src={picture.image} alt={picture.displayName}/>
                  <figCaption className="">
                    <img className="" src={picture.photoURL} alt={picture.displayName} />
                    <span className="">{picture.displayName}</span>
                  </figCaption>
                </figure>
              </div>
            )).reverse()
          }

    </div>  
</div>
</div>
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="container header">
          <img src={logo} className="grid-4-sm" alt="CloneGram" />
          <h2 className="grid-8-sm">CloneGram</h2>
        </div>
        { this.renderLoginButton() }
      </div>
    );
  }
}

export default App;
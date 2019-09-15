import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

import {
    getFromStorage,
    setInStorage,
} from '../utils/storage'

firebase.initializeApp({
    apiKey: "AIzaSyCM2ceD0rNpjg0NM3lFCvyCGSHrqF2K-1w",
    authDomain: "fir-auth-bbb94.firebaseapp.com"
})

export default class Login extends Component {

    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => false
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            counters: [],
            isLoading: true,
            token: '',
            error: '',
            usuario: '',
            password: '',
            password2: '',
            masterError: '',
            isSignedIn: false
        };

        this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangePassword2 = this.handleChangePassword2.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {

        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            console.log("user", user);
          })

        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
            const { token } = obj;
            fetch('http://3.224.113.218:4000/api/users/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: token,
                            isLoading: false
                        })
                    } else {
                        this.setState({
                            isLoading: false
                        })
                    }
                });
        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    handleChangeUsuario(e) {
        this.setState({
            usuario: e.target.value,
        });
    }

    handleChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleChangePassword2(e) {
        this.setState({
            password2: e.target.value,
        });
    }

    signIn() {
        const {
            usuario,
            password,
            password2
        } = this.state;

        fetch('http://3.224.113.218:4000/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: usuario,
                password: password,
                password2: password2
            }),
        }).then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.success) {
                    setInStorage('the_main_app', { token: json.token });
                    window.localStorage.setItem('usuario', usuario);
                    window.localStorage.setItem('key', json.token);
                    this.props.history.push("/tweets");
                    this.setState({
                        error: json.message,
                        token: json.token,
                    });
                } else {
                    this.setState({
                        error: json.message
                    });
                }
            });
    }

    render() {

        const {
            isLoading,
            error,
            usuario,
            password,
            password2
        } = this.state;

        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }

        return (

            <div className="container">
                {
                    (error) ? (
                        <center><p style={{ color: 'red' }}>{error}</p></center>
                    ) : (null)
                }

                {this.state.isSignedIn ? (
                    window.localStorage.setItem("firebase", true),
                    //console.log(window.localStorage.getItem('firebase'))
                    window.localStorage.setItem("usuario", firebase.auth().currentUser.displayName),
                    this.props.history.push("/tweets")
                ) : (
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <div className="login-form">

                                    <h2 className="text-center">Ingresar</h2>
                                    <br />
                                    <StyledFirebaseAuth
                                        uiConfig={this.uiConfig}
                                        firebaseAuth={firebase.auth()}
                                    />
                                    <br /><br />
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                            <input type="text" className="form-control" name="username" placeholder="Usuario" required="required" value={usuario} onChange={this.handleChangeUsuario}></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                            <input type="password" className="form-control" name="password" placeholder="Contraseña" required="required" value={password} onChange={this.handleChangePassword}></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                            <input type="password" className="form-control" name="password" placeholder="Confirmar contraseña" required="required" value={password2} onChange={this.handleChangePassword2}></input>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-block login-btn" onClick={this.signIn}>Ingresar</button>
                                    </div>
                                    <center><Link className="pull-right text-success" to="/signup">Crear cuenta nueva</Link></center>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        )
    }
}
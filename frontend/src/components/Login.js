import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {
    getFromStorage,
} from '../utils/storage'

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counters: [],
            isLoading: true,
            token: '',
            error: '',
            usuario: '',
            password: ''
        };

        this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        const token = getFromStorage('the_main_app');
        if (token) {
            fetch('http://192.168.10.225:4000/api/users/verify?token=' + token)
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

    signIn() {
        const {
            usuario,
            password
        } = this.state;

        fetch('http://192.168.10.225:4000/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario: usuario,
                password: password
            }),
        }).then(res => res.json())
            .then(json => {
                console.log(json);
                if (json.success) {
                    window.localStorage.setItem('usuario', usuario);
                    this.props.history.push("/tweets");
                    this.setState({
                        error: json.message,
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
            password
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
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <div className="login-form">

                                    <h2 className="text-center">Ingresar</h2>
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
            </div>
        )
    }
}
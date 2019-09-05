import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counters: [],
            error: '',
            usuario: '',
            password: ''
        };
        this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.signUp = this.signUp.bind(this);
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

    signUp() {
        const {
            usuario,
            password
        } = this.state;

        fetch('http://192.168.10.225:4000/api/users/signup', {
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
                    this.setState({
                        error: json.message,
                        usuario: '',
                        password: ''
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
            error,
            usuario,
            password
        } = this.state;

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
                                    <h2 className="text-center">Crear cuenta</h2>
                                    <br />
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
                                        <button type="submit" className="btn btn-success btn-block login-btn" onClick={this.signUp}>Crear cuenta</button>
                                    </div>
                                    <center><Link className="pull-right text-success" to="/">Iniciar sesión</Link></center>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

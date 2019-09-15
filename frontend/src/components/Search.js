import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            tweets: [],
            _id: '',
            buscar: '',
            usuario: '',
            token: '',
            isLoading: true,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const obj = window.localStorage.getItem('key');
        console.log(obj);
        const auth = window.localStorage.getItem('firebase');
        if (auth) {
            this.setState({
                token: "key",
                isLoading: false
            })
        } else if (obj) {
            fetch('http://3.224.113.218:4000/api/users/verify?token=' + obj)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: obj,
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
        const usuario = window.localStorage.getItem('usuario');
        this.setState({ usuario: '@' + usuario });

        const busqueda = window.localStorage.getItem('busqueda');
        this.setState({ buscar: busqueda });
        if (busqueda == null) {
            
        } else if (busqueda.includes('@')) {
            this.getTweetsUser(busqueda);
        } else {
            this.getTweets(busqueda);
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    async getTweetsUser(busqueda) {
        const res = await axios.get('http://3.224.113.218:4000/api/tweets/search_user/' + busqueda);
        this.setState({ tweets: res.data });
    }

    async getTweets(busqueda) {
        const res = await axios.get('http://3.224.113.218:4000/api/tweets/search_tweet/' + busqueda);
        this.setState({ tweets: res.data });
    }

    deleteTweet(id) {
        const busqueda = this.state.buscar
        fetch('http://3.224.113.218:4000/api/tweets/' + id, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (busqueda.includes('@')) {
                    this.getTweetsUser(busqueda);
                } else {
                    this.getTweets(busqueda);
                }
            });

    }

    render() {

        const {
            isLoading,
            token
        } = this.state;

        if (isLoading) {
            return (<div><p>Loading...</p></div>);
        }

        console.log("token: " + token);
        if (!token) {
            this.props.history.push("/");
        }

        return (
            <div>
                <nav className="navbar navbar-dark bg-primary mb-4 h1">
                    <span className="navbar-brand mx-auto">Twitter</span>
                </nav>

                <center><h4>Resultados de la búsqueda:</h4></center>
                <br />

                <div className="row">
                    {
                        this.state.tweets.map(tweet => (
                            <div className="col-md-6 offset-md-3 mb-4" key={tweet._id}>
                                <div className="card">
                                    <div className="card-header text-center">
                                        <h5>{tweet.usuario}</h5>
                                    </div>
                                    <div className="card-body text-center">
                                        <p>{tweet.tweet}</p>
                                    </div>
                                    <div className="card-footer text-muted text-center">
                                        <button disabled={tweet.usuario !== this.state.usuario} type="submit" className="btn btn-primary" onClick={() => this.deleteTweet(tweet._id)} style={{ margin: '4px' }}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <br /><br />
                <div className="row">
                    <div className="col-md-6 offset-3 mb-4">
                        <center><Link to="/tweets"><button className="btn btn-primary" type="submit">Regresar</button></Link></center>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios';
import firebase from "firebase"

export default class TweetsList extends Component {

    constructor() {
        super();
        this.state = {
            usuario: '',
            tweet: '',
            tweets: [],
            _id: '',
            buscar: '',
            token: '',
            isLoading: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTweet = this.addTweet.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        //this.setState({ usuario: "@ccruzvi" });
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
        this.getTweets();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    async getTweets() {
        const res = await axios.get('http://3.224.113.218:4000/api/tweets');
        this.setState({ tweets: res.data });
    }

    addTweet(e) {
        if (this.state._id) {
            fetch('http://3.224.113.218:4000/api/tweets/' + this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    //M.toast({ html: 'Tweet Updated' });
                    this.setState({ tweet: '', _id: '' });
                    this.fetchTweets();
                })
        } else {
            fetch('http://3.224.113.218:4000/api/tweets', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    //M.toast({ html: 'Tweet Saved' });
                    this.setState({ tweet: '' });
                    this.fetchTweets();
                })
                .catch(err => console.error(err));
        }
        e.preventDefault();
    }

    editTweet(id) {
        fetch('http://3.224.113.218:4000/api/tweets/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    usuario: data.usuario,
                    tweet: data.tweet,
                    _id: data._id
                })
            });
    }

    deleteTweet(id) {
        //if (confirm('¿Estás seguro de querer eliminar el tweet?')) {
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
                //M.toast({ html: 'Tweet Deleted' });
                this.fetchTweets();
            });
        //}
    }

    async fetchTweets() {
        const res = await axios.get('http://3.224.113.218:4000/api/tweets');
        this.setState({ tweets: res.data });
    }

    handleClick = () => {
        if (this.state.buscar === "") {

        } else if (this.state.buscar.includes('#')) {

        } else {
            console.log(this.state.buscar);
            window.localStorage.setItem("busqueda", this.state.buscar);
            this.props.history.push("/search");
        }
    }

    logout() {
        this.setState({
            isLoading: true,
        })
        const obj = window.localStorage.getItem('key');
        console.log(obj);
        const auth = window.localStorage.getItem('firebase');
        if (auth) {
            window.localStorage.setItem("firebase", false)
            firebase.auth().signOut()
        } else if (obj) {
            fetch('http://3.224.113.218:4000/api/users/logout?token=' + obj)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: '',
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
        this.props.history.push("/");
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
                    <button onClick={this.logout} className="btn btn-light" type="submit">Salir</button>
                </nav>

                <div className="form-inline col-md-6 offset-md-3 mb-4">
                    <input className="form-control mr-sm-2 col-md-6 offset-md-3" onChange={this.handleChange} type="text" name="buscar" placeholder="Buscar" value={this.state.buscar} aria-label="Search"></input>
                    <button className="btn btn-primary" onClick={this.handleClick} type="submit">Buscar</button>
                </div>

                <br /><br />

                <div className="col-md-6 offset-md-3 mb-4">
                    <div className="card card-body">
                        <center><h4>Tweetear</h4></center>
                        <br />
                        <form onSubmit={this.addTweet}>
                            <div className="form-group">
                                <input type="text" onChange={this.handleChange} className="form-control" placeholder="tweet" name="tweet" value={this.state.tweet}>
                                </input>
                            </div>

                            <center>
                                <button type="submit" className="btn btn-primary">Tweetear</button>
                            </center>
                        </form>
                    </div>
                </div>

                <br /><br /><br />
                <center><h4>Tweets:</h4></center>
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
                                        <button disabled={tweet.usuario !== this.state.usuario} type="submit" className="btn btn-primary" onClick={() => this.editTweet(tweet._id)}>Editar</button>
                                        <button disabled={tweet.usuario !== this.state.usuario} type="submit" className="btn btn-primary" onClick={() => this.deleteTweet(tweet._id)} style={{ margin: '4px' }}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        )
    }
}

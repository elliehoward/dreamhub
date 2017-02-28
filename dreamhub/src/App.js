import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const dreams = [
    {
        id: 1,
        title: 'Galvanize is really the matrix',
        description: 'On-demand sand castle construction expertise.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
        submitterAvatarUrl: 'images/avatars/green.jpg',
        dreamImageUrl: 'images/dreams/guard.jpg',
        dreamDate: '2/22/17'
    },
    {
        id: 2,
        title: 'Michael was a kid again',
        description: 'Earn points when your favorite politicians pass legislation. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
        submitterAvatarUrl: 'images/avatars/green.png',
        dreamImageUrl: 'images/dreams/lilmichael.jpg',
        dreamDate: '2/23/17'
    },
    {
        id: 3,
        title: 'my sister almost melted',
        description: 'We already have your measurements and shipping address. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
        submitterAvatarUrl: 'images/avatars/green.jpg',
        dreamImageUrl: 'images/dreams/sista.jpg',
        dreamDate: '2/24/17'
    },
    {
        id: 4,
        title: 'Inside of a blackhole',
        description: 'High-minded or absent-minded? You decide. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
        submitterAvatarUrl: 'images/avatars/green.png',
        dreamImageUrl: 'images/dreams/spaceee.jpeg',
        dreamDate: '2/25/17'
    },
];
const ROOT_URL = 'http://dreamhubapi.herokuapp.com/api/dreams/'
async function fetchAllDreams() {
    let url = `${ROOT_URL}`
    try {
        let fetched = await fetch(url);
        let data = await fetched.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
async function fetchUsersDreams(userid) {
    let url = `${ROOT_URL}`+ 'user/' + userid
    try {
        let fetched = await fetch(url);
        let data = await fetched.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}


class DreamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dreamdata: []
        }
        this.populateAllDreams = this.populateAllDreams.bind(this);
        this.populateUsersDreams = this.populateUsersDreams.bind(this);
    }
    async populateAllDreams() {
        let dreamJson = await fetchAllDreams();
        this.setState({dreamdata: dreamJson});
    }
    async populateUsersDreams() {
        let dreamJson = await fetchAllDreams();
        this.setState({dreamdata: dreamJson});
    }
    render() {
        if(this.state.dreamdata.length === 0){
            <h1>Loading</h1>
        }
        this.populateAllDreams();
        const dreamComponents = this.state.dreamdata.map((dream) => (
            <Dream
                key={'dream-' + dream.id}
                dreamDate={dream.date}
                id={dream.id}
                userid={dream.user_id}
                title={dream.name}
                description={dream.description}
                dreamImageUrl={dream.dream_image_url}
            />
        ));
        return (
            <div className='ui justified container'>
                <div className='ui divided items'>
                    {dreamComponents}
                </div>
            </div>
        );
    }
}

class Dream extends React.Component {
    render() {
        return (

            <div className="item">
                <div className="ui small image">
                    <img src={this.props.dreamImageUrl} alt='dream' />
                </div>
                <div className="content">
                    <div className="header">{this.props.title}</div>
                    <div className='meta'>
                        <span>{this.props.dreamDate}</span>
                    </div>
                    <div className="description">
                        <p>{this.props.description}</p>
                    </div>
                </div>
            </div>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500);
    }

    render() {
        const {loading} = this.state;
        if(loading){
            return null;
        }
        return (
            <div className="App">
                <div className="App-header">
                    <h1>&#9729; Welcome to Dreamhub </h1>
                    <h4>What a strange dream...</h4>
                </div>
                <h2 className="ui header">
                    <i className="Cloud icon"></i>
                    <div className="content">
                        Keep track of all your dreams here, read the dreams of others, and keep the conversation going in waking life.
                    </div>
                </h2>

                <DreamList/>
                <h2>Made with React JS </h2> <img src={logo} className="App-logo" alt="logo" />
            </div>
        );
    }
}

export default App;

import React from 'react';
import logo from '../assets/logo.svg';
import './Login.css';

interface IProps { }
interface IState { username: string }

export default class Login extends React.Component<IProps, IState>{
    constructor(props: Readonly<IProps>){
        super(props);
        this.state = {username: ''};
    }

    handleUsernameChange = (event: any) => {
        this.setState({ username: event.target.value });
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(this.state.username);
    }

    render() {
        return (
            <div className="login-container">

                <form onSubmit={this.handleSubmit}>
                    <img src={logo} className="App-logo" alt="logo" />
                    <input
                        type="text"
                        placeholder="Enter with your github username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                    />
                    <button type="submit">Send!</button>
                </form>
            </div>
        );
    }
}
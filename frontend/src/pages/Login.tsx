import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import './Login.css';
import api from '../services/api';

export default function Login(props: any) {
    const [ username, setUsername ] = useState('');

    const handleSubmit = async (event: any) =>{
        event.preventDefault();
        
        const response = await api.post('/devs', {username});
        const { _id } = response.data;

        props.history.push(`/dev/${_id}`);
    }

    return(
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} className="login-logo" alt="logo" />
                <input
                    type="text"
                    placeholder="Enter with your github username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Send!</button>
            </form>
        </div>
    )
}
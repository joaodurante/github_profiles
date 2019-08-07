import React, { useEffect, useState } from 'react';
import './Main.css';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import api from '../services/api';

export default function Main(props: any){
    const [ users, setUsers ] = useState([]);

    useEffect(()=>{
        const loadUsers = async () => {
            const response = await api.get('/devs', {
                headers: {
                    user: props.match.params.id
                }
            });
            setUsers(response.data);
        }

        loadUsers();
    }, [props.match.params.id]);

    return (
        <div className="main-container">
            <img src={logo} className="App-logo" alt="logo" />

            <ul>
                <li>
                    <img src="https://avatars1.githubusercontent.com/u/1041?v=4" alt="user-img"/>
                    <footer>
                        <strong>Joao Antunes</strong>
                        <p>Bio bio bio bio bio</p>
                    </footer>

                    <div className="buttons">
                        <button type="button">
                            <img src={like} alt="Like"></img>
                        </button>
                        <button type="button">
                            <img src={dislike} alt="Dislike"></img>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
}
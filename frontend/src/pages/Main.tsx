import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import api from '../services/api';

export default function Main(props: any){
    const [ users, setUsers ]: [any[], any] = useState([]);

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

    async function handleLike(id: string){
        await api.post(`/devs/${id}/likes`, null, {
            headers:{
                user: props.match.params.id
            }
        });
        setUsers( users.filter(user => user._id !== id) );
    }

    async function handleDislike(id: string){
        await api.post(`/devs/${id}/dislikes`, null, {
            headers:{
                user: props.match.params.id
            }
        });
        setUsers( users.filter(user => user._id !== id) );
    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} className="main-logo" alt="logo" />
            </Link>

            {users.length > 0 ? (
                <ul>
                    { users.map(user => 
                        <li key={user._id} >
                            <img src={user.avatar} alt={user.name}/>
                            <footer>
                                <strong> {user.name} </strong>
                                <p> {user.bio} </p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like"></img>
                                </button>
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislike} alt="Dislike"></img>
                                </button>
                            </div>
                        </li>
                    )}
                </ul>
            ) : (
                <div className="empty">
                    There is no more profiles to show
                </div>
            )}
        </div>
    );
}
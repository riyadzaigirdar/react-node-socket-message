import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import './Join.css'

const Join = ()=>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <br/>
                <div>
                    <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="say name" type="text" className="joinInput"/>
                </div>
                <br/>
                <div>
                    <input value={room} onChange={(e)=>setRoom(e.target.value)} placeholder="say room" type="text" className="joinInput"/>
                </div>
                <br/>
                <Link to={`/chat?name=${name}&room=${room}`} onClick={(e)=> (!name || !room)? e.preventDefault(): null}>
                    <button className="button" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
}

export default Join

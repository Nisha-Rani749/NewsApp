import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


export default function NewsPosts({ posts }) {
    return (
        <>
            <div>
                <h1 className="header">HackerNews Top 10 Stories</h1>
                <ul className="tileMe">
                    {posts.map((post) => (
                        <li className="posts" key={post.id}>
                            <a href={post.url}>{post.title}</a>
                            <li>
                                <Link to={`/comments/${post.id}`}><button className="newButton">View Comments</button></Link>
                            </li>
                        </li>
                    ))
                    }
                </ul >
            </div >
        </>
    );
}
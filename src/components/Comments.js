import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../App.css';
import { Link } from 'react-router-dom';
export default function Comments() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    useEffect(async () => {
        try {

            const json = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${params.id}.json?print=pretty`)
            const promises = json.data.kids;
            const showComment = promises.slice(0, 20).map(id =>
                axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then(
                    response => response.data
                )
            );
            const result = await Promise.all(showComment);
            setComments(result);
            setLoading(false);
        }
        catch (err) {
            console.log(err);
        }
    }, [])
    return (
        <>
            {loading ? (<h1>Loading....</h1>) : (
                <div>
                    <Link to="/"><div className="button"><i class="arrow left"></i>Go Back to Home Page</div></Link>
                    <h2>Comments</h2>
                    <ul>
                        {comments.map(comments => (
                            <li className="comments" key={comments.id}>
                                <div dangerouslySetInnerHTML={{ __html: comments.text }}></div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
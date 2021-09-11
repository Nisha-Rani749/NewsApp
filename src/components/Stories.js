import React, { useState, useEffect } from 'react';
import NewsPosts from './NewsPosts';
import axios from 'axios';
export default function Stories() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getTopStories() {
            const url = `https://hacker-news.firebaseio.com/v0/topstories.json`;
            try {
                const response = await axios.get(url);
                if (response.ok === false) {
                    throw new Error("Response Error:" + response.text);
                } else {
                    const json = response.data;
                    const promises = json.slice(0, 10).map(id =>
                        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
                            response => response.data
                        )
                    );
                    const result = await Promise.all(promises);
                    setPosts(result);
                    setLoading(false);
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        getTopStories();
    }, []);
    return (
        <>
            {loading ? (<h1>Loading....</h1>) : (
                <div>
                    <NewsPosts posts={posts} >
                        {/* NewsPosts */}
                    </NewsPosts>
                </div>
            )}
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';

export default function Result() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [newsPosts, setNewsPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("https://www.greatbritishvoices.co.uk/wp-json/custom/v1/full-post/10740")
            .then((res) => res.json())
            .then((json) => {
                setNewsPosts(json.news_posts);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Fetch data only once on component mount

    useEffect(() => {
        if (query) {
            const filteredResults = newsPosts.filter(post =>
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPosts(filteredResults);
        } else {
            setFilteredPosts(newsPosts);
        }
    }, [query, newsPosts]); // Update filtered results when query or newsPosts change

    if (!isLoaded) {
        return <div className='please_wait'> <div className="loader"></div><span>Data Loading....</span></div>;
    }

    return (
        <div className='searchResult p-5 pb-0'>
            <Row>
                <div className="searchPanel">
                    <p>{filteredPosts.length} Voice(s) Found</p>
                    <Link to="/voicecards">Clear Filters
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="red">
                            <path d="M6 6L18 18M18 6L6 18" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
                {filteredPosts.map((post, index) => (
                    <Col md={3} key={index}>
                        <div className='voiceBox'>
                            <div className="profileImage">
                                <Link to={post.link}>
                                    <img src="" alt="" />
                                </Link>
                            </div>
                            <div className="voiceCandidateDetails">
                                <Link to={post.link}>
                                    <span>{post.title}</span>
                                </Link>
                                <ul>
                                    <li dangerouslySetInnerHTML={{ __html: post.acf_fields.key_information }}></li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

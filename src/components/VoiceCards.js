import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import Filterform from './Filterform';

export default function VoiceCards() {
    const [items, setItems] = useState([]);
    const [news_posts, setNews_posts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [voiceCardData, setVoiceCardData] = useState([]);

    useEffect(() => {
        fetch("https://www.greatbritishvoices.co.uk/wp-json/custom/v1/full-post/10740")
            .then((res) => res.json())
            .then((json) => {
                setItems(json.acf_fields);
                setNews_posts(json.news_posts);
                setIsLoaded(true);
            });

    }, [news_posts]);

    if (!isLoaded) return <div className='please_wait'> <div class="loader"> </div><span>Data Loading....</span></div>;

    return (
        <>
            <div className='searchResult py-8  px-8'>
                <Row>
                    {news_posts.map((post, index) => (
                        <Col md={3} key={index}>
                            <div className='voiceBox'>
                                <div className="profileImage">
                                    <Link to={post.link}>
                                        <img src={post.thumbnail} alt="" />
                                    </Link>
                                </div>
                                <div className="voiceCandidateDetails">
                                    <Link to={post.link}>
                                        <span className=''>{post.acf_fields.first_name}</span>
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
        </>
    );
}

import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import Filterform from './Filterform';
import { Helmet } from 'react-helmet';
import SeoApi from './SeoApi';

export default function VoiceCards() {
    const [items, setItems] = useState([]);
    const [posts, setNews_posts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const [voiceCardData, setVoiceCardData] = useState([]);

    useEffect(() => {
        fetch("https://greatbritishvoices.co.uk/wp-json/custom/v1/talents?&page=1")
            .then((res) => res.json())
            .then((json) => {
                setItems(json.acf_fields);
                setNews_posts(json.posts);
                setIsLoaded(true);
            });

    }, [posts]);

    if (!isLoaded) return <div className='please_wait'> <div class="loader"> </div><span>Data Loading....</span></div>;

    const showAlert = () => {
        alert('This is an alert message!');
      };
    return (
        <>

        <Helmet>
        <title>Search for a voice | Great British UK Talent sdfsdfsdf</title>
        </Helmet>

        <SeoApi apiUrl= "https://greatbritishvoices.co.uk/wp-json/rankmath/v1/getHead?url=https://greatbritishvoices.co.uk/talent-search/?accent=GBV_British%2FRegional_Accents" />
            <div className='searchResult py-8  px-8'>
                <Row className='row-gap-3'>
                    {posts.map((post, index) => (
                        <Col md={3} key={index}>
                            <div className='voiceBox'>
                                <div className="profileImage">
                                    <Link to={post.link}>
                                        <img src={post.thumbnail} alt="" />
                                    </Link>
                                </div>
                                <div className="voiceCandidateDetails">
                                    <Link to={post.link}>
                                        <span className=''>{post.title}</span>
                                    </Link>
                                    <ul>
                                        <li dangerouslySetInnerHTML={{ __html: post.acf_fields.key_information }}></li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>


                <Row className='mt-4'>
                    <Col md={12} className='text-center'>
                        <button id="loadMore" className='' onClick={showAlert}>Load More</button>
                    </Col>
                </Row>
            </div>
        </>
    );
}

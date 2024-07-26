import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import Filterform from './Filterform';
import { Helmet } from 'react-helmet';
import SeoApi from './SeoApi';
import { FaRegStar, FaSoundcloud } from "react-icons/fa";

export default function VoiceCards() {
    const [items, setItems] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const [showAudio, setShowAudio] = useState({}); // State to manage visibility of audio players

    useEffect(() => {
        fetch(`https://greatbritishvoices.co.uk/wp-json/custom/v1/talents?page=${currentPage}`)
            .then((res) => res.json())
            .then((json) => {
                setItems(json.acf_fields);
                setPosts((prevPosts) => [...prevPosts, ...json.posts]);
                setIsLoaded(true);
                setIsLoadingMore(false);
                setTotalPages(json.total_pages); // Assuming the total pages is in json.total_pages
            });
    }, [currentPage]);

    if (!isLoaded) return <div className='please_wait'> <div className="loader"> </div><span>Data Loading....</span></div>;

    const loadMoreData = () => {
        if (currentPage < totalPages) {
            setIsLoadingMore(true);
            setCurrentPage((prevPage) => prevPage + 1);
        } else {
            alert('No more data to load');
        }
    };

    const handleShortlist = (id) => {
        setFavorites((prevItems) => {
            if (!prevItems.includes(id)) {
                const updatedFavorites = [...prevItems, id];
                localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
                return updatedFavorites;
            }
            return prevItems; // Return previous items if id is already in the favorites
        });
    };

    const toggleAudio = (id) => {
        setShowAudio((prevShowAudio) => ({
            ...prevShowAudio,
            [id]: !prevShowAudio[id]
        }));
    };

    return (
        <>
            <Helmet>
                <title>Search for a Voice | Great British Voices</title>
            </Helmet>

            <SeoApi apiUrl="https://greatbritishvoices.co.uk/wp-json/rankmath/v1/getHead?url=https://greatbritishvoices.co.uk/talent-search/?accent=GBV_British%2FRegional_Accents" />
            <div className='searchResult py-8 px-8'>
                <Row className='row-gap-3'>
                    {posts.map((post, index) => (
                        <Col md={3} key={index}>
                            <div className='voiceBox'>
                                <div className="profileImage" style={{ display: showAudio[post.id] ? 'none' : 'block' }}>
                                    <Link to={post.link}>
                                        <img src={post.thumbnails} alt={post.title} />
                                    </Link>
                                    <button id='add__shortlist' onClick={() => handleShortlist(post.id)}><FaRegStar /></button>
                                    <button id='cloud' onClick={() => toggleAudio(post.id)}><FaSoundcloud /></button>
                                </div>
                                <div className="cloud__video__audio" style={{ display: showAudio[post.id] ? 'block' : 'none' }}>
                                    <iframe
                                        title="Voiceover Demo"
                                        width="100%"
                                        height="200"                                      
                                        src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1875780321&show_artwork=true&maxheight=390&maxwidth=640"
                                    ></iframe>
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

                <Row className='mt-4'>
                    <Col md={12} className='text-center'>
                        <button id="loadMore" onClick={loadMoreData}>
                            {isLoadingMore ? 'Loading...' : 'Load More'}
                        </button>
                    </Col>
                </Row>
            </div>
        </>
    );
}

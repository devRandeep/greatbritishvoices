import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { FaRegStar, FaSoundcloud } from "react-icons/fa";


export default function Result() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [newsPosts, setNewsPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = localStorage.getItem('favorite');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });
    const [showAudio, setShowAudio] = useState({});

    const fetchAllPages = async () => {
        const total_pages = 41; // Total number of pages
        let allPosts = [];

        for (let page = 1; page <= total_pages; page++) {
            try {
                const response = await fetch(`https://greatbritishvoices.co.uk/wp-json/custom/v1/talents?page=${page}`);
                const json = await response.json();
                allPosts = allPosts.concat(json.posts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        return allPosts;
    };
    

    useEffect(() => {
        fetchAllPages().then((allPosts) => {
            setNewsPosts(allPosts);
            setIsLoaded(true);
        });
    }, []); // Fetch data only once on component mount

    const handleShortlist = (id) => {
        setFavorites((prevItems) => {
            if (!prevItems.includes(id)) {
                const updatedFavorites = [...prevItems, id];
                localStorage.setItem('favorite', JSON.stringify(updatedFavorites));
                return updatedFavorites;
            }
            return prevItems;
        });
    };

    const toggleAudio = (id) => {
        setShowAudio((prevShowAudio) => ({
            ...prevShowAudio,
            [id]: !prevShowAudio[id]
        }));
    };

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
            <Row className='row-gap-3'>
                <div className="searchPanel">
                    <p>{filteredPosts.length} Voice(s) Found</p>
                    <Link to="/voicecards">Clear Fil    ters
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="red">
                            <path d="M6 6L18 18M18 6L6 18" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
                {filteredPosts.map((post, index) => (
                    <Col md={3} key={index}>
                        <div className='voiceBox'>
                            <div className="profileImage">
                                <Link to={`/talent/${post.id}`}>
                                    <img src={post.thumbnails} alt="" />
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
                                <Link to={`/talent/${post.id}`}>
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

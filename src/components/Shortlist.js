import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaRegStar } from "react-icons/fa6";
import { FaSoundcloud } from "react-icons/fa";
export default function Shortlist() {
  const [items, setItems] = useState([]);
  const [posts, setNews_posts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`https://greatbritishvoices.co.uk/wp-json/custom/v1/talents?&page=${currentPage}`)
        .then((res) => res.json())
        .then((json) => {
            setItems(json.acf_fields);
            setNews_posts((prevPosts) => [...prevPosts, ...json.posts]);
            setIsLoaded(true);
            setIsLoadingMore(false);
            setTotalPages(json.total_pages); // Assuming the total pages is in json.total_pages
        });
}, [currentPage]);

if (!isLoaded) return <div className='please_wait'> <div className="loader"> </div><span>Data Loading....</span></div>;
  return (
    <>    
    <div className='searchResult py-8 px-8'>
                <Row className='row-gap-3'>
                    {posts.map((post, index) => (
                        <Col md={3} key={index}>
                            <div className='voiceBox'>
                                <div className="profileImage">
                                    <Link to={post.link}>
                                        <img src={post.thumbnails} alt="" />
                                    </Link>
                                    <button id='add__shortlist'><FaRegStar /></button>                                   
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
            </div>
    
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import Filterform from './Filterform';
import { Helmet } from 'react-helmet';
import SeoApi from './SeoApi';

export default function CelebrityVoicesApi() {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);    
   
  
    useEffect(() => {
      fetch(
        "https://greatbritishvoices.co.uk/wp-json/custom/v1/voice-cate?categories=celebrity-voices"
      )
        .then((res) => res.json())
        .then((json) => {
          setItems(json.talent_posts);
          setIsLoaded(true);
        });
    }, []);
   
   
    if (!isLoaded)
      return (
        <div className="please_wait">
          {" "}
          <div class="loader"> </div>
          <span>Data Loading....</span>
        </div>
      );

    return (
        <>
             
            <div className='searchResult py-8 px-8'>
                <Row className='row-gap-3'>
                    {items.map((post, index) => (
                        <Col md={3} key={index}>
                            <div className='voiceBox'>
                                <div className="profileImage">
                                    <Link to={post.link}>
                                        <img src={post.thumbnails} alt="" />
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

               
            </div>
        </>
    );
}

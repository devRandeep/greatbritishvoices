import { Filter } from '@mui/icons-material';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import Filterform from './Filterform';

export default function Result() {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const items = [
        {
            profileImg: 'https://greatbritish.b-cdn.net/wp-content//uploads/2023/06/Suzie-Voice-Actor-at-Great-British-Voices.jpg?height=106&width=106',
            voicename: 'Suzie R.',
            accent: 'RP. London/British Indian',
            ageRange: 'Child – 20’s (& Characters)',
            location: 'Studio Location: UK',
            tag: 'Young, Natural, Conversational'
        },
        {
            profileImg: 'https://greatbritish.b-cdn.net/wp-content//uploads/2020/08/Abi-H-at-GBV.jpeg?height=275&width=275',
            voicename: 'Abi H.  ',
            accent: 'NeutralRp. American',
            ageRange: '20’s/30’s',
            location: 'Studio Location: USA',
            tag: 'Conversational, Friendly, Warm'
        },
    ];
    const searchResults = query
        ? items.filter(item =>
            item.voicename.toLowerCase().includes(query.toLowerCase())
        )
        : items;

    return (
        <div className='searchResult p-5 pb-0'>       

            <Row>
                <div className="searchPanel">
                {/* <h1>Search Results for "{query}"</h1> */}
                <p>{searchResults.length} Voice(s) Found</p>
                <Link to="/voicecards">Clear Filters<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="red"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 6L18 18M18 6L6 18" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></Link>
                </div>
                {searchResults.map((item, index) => (
                    <Col md={3}>
                        <div className='voiceBox' key={index}>
                            <div className="profileImage">
                                <Link>
                                    <img src={item.profileImg} alt="" />
                                </Link>
                            </div>
                            <div className="voiceCandidateDetails">
                                <Link to="">
                                    <span className=''>{item.voicename}</span>
                                </Link>
                                <ul>
                                    <li>{item.accent}</li>                                  
                                    <li>{item.ageRange}</li>
                                    <li>{item.location}</li>
                                    <li>{item.tag}</li>
                                </ul>
                            </div>

                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

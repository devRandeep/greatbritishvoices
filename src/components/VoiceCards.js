import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import Filterform from './Filterform';

export default function VoiceCards() {
    const voices = [
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
    return (
        <>
            {/* <div className="positionInherit">
                <Filterform />
            </div> */}

            <div className='searchResult'>

                <Row>
                    {voices.map((item, index) => (
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
        </>
    );
}

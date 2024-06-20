import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function BlogSingle() {
    const [postContent, setPostContent] = useState('');
    const [postThumbnail, setPostThumbnail] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postDate, setPostDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://www.greatbritishvoices.co.uk/wp-json/custom/v1/blog/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();    
            })
            .then(data => {
                if (data.length > 0) {
                    setPostContent(data[0].post_content);
                    setPostThumbnail(data[0].post_thumbnail);
                    setPostTitle(data[0].post_title); 
                    setPostDate(data[0].post_date); 
                }
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className='please_wait'> <div className="loader"> </div><span>Data Loading....</span></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Single Blog</title>
            </Helmet>

            <section className='sectionpadding singleBlogPage'>
                <div className="blogBredcrumb">
                    <Row className='singleBlogTitle'>
                        <Col md={3}>
                            <Link to="/bloglist" className="button">Back To Search</Link>
                        </Col>
                        <Col md={6} className='text-center'>
                            <h4>{postTitle}</h4>
                        </Col>
                        <Col md={3} className='text-end'>
                            <p className='postDate'>{postDate}</p>
                        </Col>
                    </Row>
                    <div className="row profile-top-row news-cover">
                        <img width="100%" height="373" src={postThumbnail} alt="Blog Thumbnail" />
                    </div>
                </div>
                <div className='singleBlogContent'>
                    <div dangerouslySetInnerHTML={{ __html: postContent }} />
                </div>
            </section>
        </>
    );
}

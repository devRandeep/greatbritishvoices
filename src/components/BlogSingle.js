import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function BlogSingle() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        fetch(`https://www.greatbritishvoices.co.uk/wp-json/custom/v1/blog/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPost(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className='please_wait'> <div className="loader"> </div><span>Data Loading....</span></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!post) {
        return <div>No post found</div>;
    }

    return (
        <>
            <Helmet>
                <title>{post.post_title} | Great British UK Talent</title>
            </Helmet>

            <section className='sectionpadding singleBlogPage'>
                <div className="blogBredcrumb">
                    <Row className='singleBlogTitle'>
                        <Col md={3}>
                            <Link to="/" className="button">Back To Blog List</Link>
                        </Col>
                        <Col md={6} className='text-center'>
                            <h4>{post.post_title}</h4>
                        </Col>
                        <Col md={3} className='text-end'>
                            <p className='postDate'>{post.post_date}</p>
                        </Col>
                    </Row>
                    <div className="row profile-top-row news-cover">
                        <img width="100%" height="373" src={post.post_thumbnail} alt="Blog Thumbnail" />
                    </div>
                </div>
                <div className='singleBlogContent'>
                    <div dangerouslySetInnerHTML={{ __html: post.post_content }} />
                </div>
            </section>
        </>
    );
}

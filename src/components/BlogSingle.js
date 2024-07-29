import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { MdKeyboardArrowLeft } from "react-icons/md";
export default function BlogSingle() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        fetch(`https://www.greatbritishvoices.co.uk/wp-json/wp/v2/posts/${id}`)
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
                <title>{post.title.rendered} | Great British UK Talent</title>
            </Helmet>
            <section>
            <div className="row profile-top-row news-cover">
                        <img width="100%" height="373" src={post.rttpg_featured_image_url.full[0]} alt="Blog Thumbnail" />

                        <Row className='singleBlogTitle'>
                        <Col md={3}>
                            <Link to="/blogs" className="button goto__blogPage"><MdKeyboardArrowLeft />
                            Back To Blog List</Link>
                        </Col>
                        <Col md={6} className='text-center'>
                            <h4>{post.title.rendered}</h4>
                        </Col>
                        <Col md={3} className='text-end'>
                            <p className='postDate'>{post.modified}</p>
                        </Col>
                    </Row>
                    </div>
            </section>
           
            <section className='sectionpadding singleBlogPage'>
                <div className="blogBredcrumb">
              
                 
                </div>
                <div className='singleBlogContent'> 
                    <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
                </div>
            </section>
        </>
    );
}

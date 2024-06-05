import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Blog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://greatbritishvoices.co.uk/wp-json/custom/v1/posts-in-category/great-british-voices-blog') // Replace with your API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }) 
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='please_wait'> <div class="loader"> </div><span>Data Loading....</span></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
  <>    
    <section className='newsArticle sectionpadding'>
      <Row>
      <div className="heading_panel">
						<h3>News Article</h3>
						<div className="slider_control">
							<Link to="/bloglist" className="button">View More</Link>
						</div>
					</div>
      </Row>
      <Row className='mt-4'>
      {data.slice(0,3).map((item, index) => (
        <Col md={4}>
          <div className="articleBox" key={index}>
            <div className="articleImage">
            <img src="https://greatbritish.b-cdn.net/wp-content//uploads/2023/11/Why-Choosing-the-Right-UK-Accent-for-your-E-Learning-Voiceover-Matters-1024x256.png" alt="" />
            </div>
            <div className="articleDesc">
              <span>{item.post_date}</span>
              <h5>{item.post_title}</h5>
              <a href="" className='button'>Read More</a> 
            </div>
          </div>
        </Col>
            ))}
      </Row>
    </section>  
  </>
  );
}

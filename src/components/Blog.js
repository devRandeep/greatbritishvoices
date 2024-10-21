import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Blog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://www.greatbritishvoices.co.uk/wp-json/custom/v1/blog/'
  ) // Replace with your API endpoint
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
							<Link to="/blogs" className="button">View More</Link>
						</div>
					</div>
      </Row>
      <Row className='mt-4'>
      {data.slice(0,3).map((item, index) => (
        <Col md={4}>
          <div className="articleBox" key={index}>
            <div className="articleImage">
            <img src={item.post_thumbnail} alt="" />
            </div>
            <div className="articleDesc">
              <span>{item.post_date}</span>
              <h5>{item.post_title}</h5>
              <Link to={`/post/${item.ID}`} className="button">
                    Read More
                  </Link>
            </div>
          </div>
        </Col>
            ))}
      </Row>
    </section>  
  </>
  );
}

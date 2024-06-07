import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Pagination from 'react-bootstrap/Pagination';

export default function BlogList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        fetch('https://greatbritishvoices.co.uk/wp-json/custom/v1/posts-in-category/great-british-voices-blog')
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
        return <div className='please_wait'> <div className="loader"> </div><span>Data Loading....</span></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    // Search Blog;
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page when search term changes
    };

    const filteredData = data.filter(item =>
        item.post_title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <section className='newsArticle sectionpadding'>
                <Row>
                    <div className="inputGroup">
                        <i className="fa fa-search" aria-hidden="true"></i>
                        <input
                            type="text"
                            placeholder='Search by title...'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </Row>
                <Row className='mt-4 row-cols-5 row-gap-4'>
                    {currentItems.map((item, index) => (
                        <Col key={index}>
                            <div className="articleBox">
                                <div className="articleImage">
                                    <img src="https://greatbritish.b-cdn.net/wp-content//uploads/2023/11/Why-Choosing-the-Right-UK-Accent-for-your-E-Learning-Voiceover-Matters-1024x256.png" alt={item.post_title} />
                                </div>
                                <div className="articleDesc">
                                    <span>{item.post_date}</span>
                                    <h5>{item.post_title}</h5>
                                    {/* <p dangerouslySetInnerHTML={{__html:item.post_content}}></p> */}
                                    <Link to="" className='button'>Read More</Link>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Row className='mt-4'>
                    <Pagination>
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                    </Pagination>
                </Row>
            </section>
        </>
    );
}

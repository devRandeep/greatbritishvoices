import React, { useEffect, useState } from 'react';

export default function Whatwedo() {
	const [items, setItems] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	
	useEffect(() => {
		fetch("https://greatbritishtalent.com/wp-json/wp/v2/pages/2/?acf_format=standard")
			.then((res) => res.json())
			.then((json) => {
				setItems(json.acf);
				setIsLoaded(true);
			});
	}, []);

	if (!isLoaded) return <div className='please_wait'> <div class="loader"> </div><span>Data Loading....</span></div>;
	return (
		<>
			<section className="what_we_do">
				<div className="what_we_do_box">
					<div className="text_box">
						<h3>
							What we do
						</h3>
						<p dangerouslySetInnerHTML={{ __html: items.second_section_text }}></p>
					</div>
				</div>
				<div className="img_box">
					<img src={items.second_section_image} alt="" />
				</div>
			</section>

		</>
	);
}

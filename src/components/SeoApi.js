import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export default function SeoApi({ apiUrl }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [finalTag, setFinalTag] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        const htmlTags = json.head || "";
        const tagsArray = htmlTags.split('\n');
        const metaObjects = tagsArray.map(str => {
          const nameMatch = str.match(/name="([^"]+)"/);
          const contentMatch = str.match(/content="([^"]+)"/);
          const propertyMatch = str.match(/property="([^"]+)"/);
          const obj = {
            name: nameMatch ? nameMatch[1] : '',
            content: contentMatch ? contentMatch[1] : '',
          };
          if (propertyMatch) {
            obj.property = propertyMatch[1];
          }
          return obj;
        });
        setFinalTag(metaObjects);
      })
      .catch((error) => {
        console.error("Error fetching SEO data:", error);
      });
  }, []);
  return (
    <>
    <Helmet encodeSpecialCharacters={true}>
        {finalTag.map((tag, i) => (
          <meta
            key={i}
            {...(tag.property && { property: tag.property })}
            {...(tag.name && { name: tag.name })}
            {...(tag.content && { content: tag.content })}
          />
        )
        )}
      </Helmet>
    </>
  );
}

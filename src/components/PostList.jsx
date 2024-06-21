import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Card from './Card';


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('published_at');
  const [imageAttributeName, setImageAttributeName] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${currentPage}&page[size]=${itemsPerPage}&append[]=small_image&append[]=medium_image&sort=${sortOrder}`
      );

      console.log('Response:', response);

      const fetchedPosts = response.data.data || [];
      const total = response.data.meta ? response.data.meta.total : 0;

      console.log('Fetched Posts:', fetchedPosts);
      console.log('Total:', total);

      if (fetchedPosts.length > 0) {
        const imageAttribute = findImageAttributeName(fetchedPosts[0]);
        setImageAttributeName(imageAttribute);
      }

      setPosts(fetchedPosts);
      setTotalPosts(total);
    } catch (error) {
      console.error('Error fetching data:', error);
      console.error('Error details:', error.response);
    }
  }, [currentPage, itemsPerPage, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const findImageAttributeName = (post) => {
    if ('medium_image' in post) {
      return 'medium_image';
    }
    if ('small_image' in post) {
      return 'small_image';
    }
    return ''; 
  };

  const getImageUrl = (post) => {
    if (!post || !imageAttributeName) {
      return 'default-image-url';
    }
  
    const images = post[imageAttributeName];
  
    if (!images || images.length === 0 || !images[0].url) {
      return 'default-image-url';
    }
  
    return images[0].url;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    const perPage = Number(e.target.value);
    setItemsPerPage(perPage);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); 
  };

  const totalPages = Math.ceil(totalPosts / itemsPerPage);

  const firstItem = (totalPosts === 0) ? 0 : ((currentPage - 1) * itemsPerPage) + 1;
  const lastItem = Math.min(currentPage * itemsPerPage, totalPosts);

  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; 

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-10">
      <div className="flex justify-between items-center mb-6 place-content-center">
        <div>
          <p className="text-gray-600 text-xs md:text-base">
            Showing {firstItem} - {lastItem} of {totalPosts}
          </p>
        </div>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="itemsPerPage" className="text-xs md:text-base">Show per page:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border p-2 rounded-xl m-2 text-sm md:text-base"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div>
            <label htmlFor="sortOrder" className="text-sm md:text-base">Sort by:</label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={handleSortChange}
              className="border p-2 rounded-xl m-2 text-sm md:text-base"
            >
              <option value="published_at">Newest</option>
              <option value="-published_at">Oldest</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            description={post.content}
            imageUrl={getImageUrl(post)}
            date={post.published_at}
          />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 rounded mr-2 text-sm md:text-base"
        >
          {'<<'}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 bg-gray-200 rounded mr-2 text-sm md:text-base"
        >
          {'<'}
        </button>
        {generatePageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`p-2 bg-gray-200 rounded mx-1 ${currentPage === page ? 'font-bold' : ''} text-sm md:text-base`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 bg-gray-200 rounded ml-2 text-sm md:text-base"
        >
          {'>'}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="p-2 bg-gray-200 rounded ml-2 text-sm md:text-base"
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default PostList;

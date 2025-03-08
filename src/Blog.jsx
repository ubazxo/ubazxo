import React, { useState, useEffect } from 'react';
import BackToTop from './components/BackToTop';
import './css/Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Move dummyPosts outside component or use useMemo
  const dummyPosts = React.useMemo(() => [
    {
      id: 1,
      title: 'Web Development Trends 2024',
      category: 'development',
      image: 'https://source.unsplash.com/random/800x600?web',
      excerpt: 'Explore the latest trends in web development...',
      date: '2024-01-15'
    },
    // Add more dummy posts as needed
  ], []);

  useEffect(() => {
    setPosts(dummyPosts);
  }, [dummyPosts]); // Now dummyPosts is a proper dependency

  const filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
           (selectedCategory === 'all' || post.category === selectedCategory);
  });

  return (
    <div className="blog-container">
      <div className="blog-hero">
        <h1>Our Latest Insights</h1>
        <div className="search-bar">
          <input 
            type="text"
            placeholder="Search articles..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="development">Development</option>
            <option value="design">Design</option>
            <option value="technology">Technology</option>
          </select>
        </div>
      </div>

      <div className="featured-post">
        {posts[0] && (
          <div className="featured-content">
            <img src={posts[0].image} alt={posts[0].title} />
            <div className="featured-overlay">
              <h2>{posts[0].title}</h2>
              <p>{posts[0].excerpt}</p>
            </div>
          </div>
        )}
      </div>

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <img src={post.image} alt={post.title} />
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="post-date">{post.date}</span>
            </div>
          </div>
        ))}
      </div>
      <BackToTop />
    </div>
  );
};

export default Blog;

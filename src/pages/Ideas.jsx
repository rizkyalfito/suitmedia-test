import Header from '../components/Header';
import Banner from '../components/Banner';
import PostList from '../components/PostList';

const Ideas = () => {
  return (
    <div>
      <Header />
      <Banner imageUrl="https://via.placeholder.com/1920x600" title="Ideas" subtitle="Where all our great things begin" />
      <PostList />
    </div>
  );
};

export default Ideas;

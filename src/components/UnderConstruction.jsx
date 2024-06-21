import { Link } from 'react-router-dom';

const UnderConstruction = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Page Under Construction</h1>
      <p className="text-gray-600 mb-4">This page is currently under development.</p>
      <Link to="/ideas" className="text-blue-500 hover:underline">Go to Ideas</Link>
    </div>
  );
};

export default UnderConstruction;

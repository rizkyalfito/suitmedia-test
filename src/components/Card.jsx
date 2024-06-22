import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const Card = ({ title, imageUrl, date }) => {
  const formattedDate = dayjs(new Date(date).toISOString()).format('DD MMMM YYYY');

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg ">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-64 object-cover object-center" />
      )}
      <div className="p-4">
        {date && (
          <h3 className="text-gray-500 text-sm mt-2 font-semibold">{formattedDate}</h3>
        )}
        <h2 className="font-bold text-lg mb-2">{title}</h2>
        {console.log(imageUrl)}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Card;

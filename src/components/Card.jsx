import PropTypes from "prop-types";

const Card = ({ weather: { emoji, name, temp, feelsLike, description } }) => {
  return (
    <div>
      <div>{emoji}</div>
      <div>
        <h4>{name}</h4>
        <h6>
          {temp}c, feels like {feelsLike}c
        </h6>
        <h5>{description}</h5>
      </div>
    </div>
  );
};

Card.propTypes = {
  weather: PropTypes.object.isRequired,
};

export default Card;

import { Show, StreamingOption } from "../../interfaces/interfaces";

const MovieComponent = ({ data, region}:{data:Show,region:string}) => {
  const {
    title,
    releaseYear,
    overview,
    directors,
    cast,
    imageSet: { verticalPoster },
    streamingOptions,
  } = data;

  const buyOptions = (streamingOptions[region] || []).filter(
    (option:StreamingOption) => option.type === "buy"
  );

  const subscriptionOptions = (streamingOptions[region] || []).filter(
    (option:StreamingOption) => option.type === "subscription"
  );

  return (
    <div className="movieComponent-container">
      <img className = "movieComponent-image" src={verticalPoster!.w360} alt={title} />
      <h1 className="movieComponent-title">{title}</h1>
      <p className="movieComponent-overview">{releaseYear}</p>
      <p className="movieComponent-overview">{overview}</p>
      <p className="movieComponent-details">Directors: {directors.join(", ")}</p>
      <p className="movieComponent-details">Cast: {cast.join(", ")}</p>
      {buyOptions.length > 0 && (
        <div>
          
          {buyOptions.map((option, index) => (
            <div key={option.service.id + index} className="movieComponent-service-stream">
              <p className="movieComponent-service-name">It's on {option.service.name}</p>
              <a href={option.link} className="movieComponent-link">{option.type.toUpperCase()}</a>
              <p className="movieComponent-price">{option.price.formatted}</p>
            </div>
          ))}
        </div>
      )}
      {subscriptionOptions.length > 0 && (
        <div>
          
          {subscriptionOptions.map((option, index) => (
            <div key={option.service.id + index} className="movieComponent-service-buy">
              <p className="movieComponent-service-name">It's on {option.service.name}</p>
              <a href={option.link} className="movieComponent-link">{option.type.toUpperCase()}</a>
              {option.quality && <p className="movieComponent-quality">{option.quality.toUpperCase()}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieComponent;
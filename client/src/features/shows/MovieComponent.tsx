const MovieComponent = ({ data, region }) => {
  const {
    title,
    releaseYear,
    overview,
    directors,
    cast,
    imageSet: { verticalPoster },
    streamingOptions,
  } = data;

  const buyOptions = streamingOptions[region].filter(
    (option) => option.type === "buy"
  );

  return (
    <div>
      <img src={verticalPoster.w360} alt={title} />
      <h1>{title}</h1>
      <p>{releaseYear}</p>
      <p>{overview}</p>
      <p>Directors: {directors.join(", ")}</p>
      <p>Cast: {cast.join(", ")}</p>
      {buyOptions.map((option,index) => (
        <div key={option.service.id+index}>
          <p>Service: {option.service.name}</p>
          <p>Type: {option.type}</p>
          <a href={option.link}>Link</a>
          <p>Price: {option.price.formatted}</p>
        </div>
      ))}
    </div>
  );
};
export default MovieComponent;

import { useSelector } from "react-redux";
import { allError, allShows, allStatus } from "./showsSlice";
import { DisplayResultsProps, Show } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";

const DisplayResults: React.FC<DisplayResultsProps> = ({ countryCode }) => {
  //   const dispatch = useAppDispatch();

  const shows = useSelector(allShows);
  console.log("DisplayResults shows:", shows);
  const showsStatus = useSelector(allStatus);
  const error = useSelector(allError);

  let content;

  if (showsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (showsStatus === "succeeded") {
    content = shows.map((show: Show) => (<Link to={`/shows/${show.id}`} key={show.id}>
      <div className="show-individual">
        <img src={show.imageSet.verticalPoster?.w240} alt={show.title} />
        <h3>{show.title}</h3>
        <p>{show.releaseYear}</p>
        <div>
          <h4>Streaming options:</h4>
          {show.streamingOptions && show.streamingOptions[countryCode]
            ? show.streamingOptions[countryCode].map((option, index) => (
                <div key={option.link + index}>
                  Name: {option.service.name} type: {option.type}  price: {option.price?.formatted || "unknown"} link:{" "}
                  {/* <a href={option.link}>Watch here</a> */}
                </div>
                
              ))
            : null}
        </div>
      </div>
      </Link>
    ));
  } else if (showsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Results</h2>
      {content}
    </div>
  );
};

export default DisplayResults;

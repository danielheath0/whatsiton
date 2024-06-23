import { useSelector } from "react-redux";
import { allError, allShows, allStatus } from "./showsSlice";
import { DisplayResultsProps, Show } from "../../interfaces/interfaces";
import { Link } from "react-router-dom";

const DisplayResults: React.FC<DisplayResultsProps> = () => {
  const shows = useSelector(allShows);
  // console.log("DisplayResults shows:", shows);
  const showsStatus = useSelector(allStatus);
  const error = useSelector(allError);

  let content;

  if (showsStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (showsStatus === "succeeded") {
    content = shows.map((show: Show) => (
      <Link to={`/shows/${show.id}`} key={show.id} className="show-link">
        <div className="show-individual">
          <img src={show.imageSet.verticalPoster?.w240} alt={show.title} />
          <div>
            <h3>{show.title}</h3>
            <p>{show.releaseYear}</p>
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
      <div className="results-flex">{content}</div>
    </div>
  );
};

export default DisplayResults;
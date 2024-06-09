import { fetchShows } from "./showsSlice";
import { useState } from "react";
import { useAppDispatch } from "../../app/store";
import { SearchFormProps } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { userCountry,  } from "../users/usersSlice";

const SearchForm: React.FC<SearchFormProps> = () => {
  const dispatch = useAppDispatch();

const country = useSelector(userCountry)
console.log("country:",country)

  const [title, setTitle] = useState("");
  // const [country, setCountry] = useState("");
  // const [outputLanguage, setOutputLanguage] = useState("en");
  const [searchStatus, setSearchStatus] = useState("idle");

  const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  // const onCountryChanged = (e: React.FormEvent<HTMLInputElement>) => {
  //   const newCountry = e.currentTarget.value
  //   setCountry(newCountry)
  //   onCountryChange(newCountry) 
  // }
  // const onOutputLanguageChanged = (e: React.FormEvent<HTMLInputElement>) =>
  //   setOutputLanguage(e.currentTarget.value);

  const canSearch =
    [title].every(Boolean) && searchStatus === "idle";

  const onSearchClicked = (e:any) => {
    e.preventDefault()
    console.log(country)
    if (canSearch) {
        console.log("Search button clicked")
      setSearchStatus("pending");
      dispatch(fetchShows({ title, country }));
      {
        setSearchStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2>What's it on?</h2>
      <form>
        <label htmlFor="showTitle">Movie title:</label>
        <input
          type="text"
          id="showTitle"
          name="showTitle"
          value={title}
          onChange={onTitleChanged}
        />
        
        {/* <input
          type="text"
          id="country"
          name="country"
          value={country}
          onChange={onCountryChanged}
        /> */}
        {/* //TODO: replace this with dynamic list retrieved from API. Make default the user option as retrieved from DB. Set default in the state when it's retrieved - probably as soon as the page loads, i.e. in index.ts */}
        {/* <label htmlFor="outputLanguage">Output Language:</label>
        <input
          type="text"
          id="outputLanguage"
          name="outputLanguage"
          value={outputLanguage}
          onChange={onOutputLanguageChanged}
          //TODO: make this a list as well.
        /> */}

        <button type="button" onClick={onSearchClicked}>
          Search
        </button>
      </form>
    </section>
  );
};
export default SearchForm;

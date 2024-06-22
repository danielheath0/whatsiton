import { fetchShows } from "./showsSlice";
import { useState } from "react";
import { useAppDispatch } from "../../app/store";
import { SearchFormProps } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { userCountry } from "../users/usersSlice";
const SearchForm: React.FC<SearchFormProps> = () => {
  const dispatch = useAppDispatch();


  // const state = useSelector((state) => state);
  // console.log(state)

const country = useSelector(userCountry)
// console.log("country:",country)
console.log("country:",country)

  const [title, setTitle] = useState("");

  const [searchStatus, setSearchStatus] = useState("idle");
  const onTitleChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
 
  const canSearch =
    [title].every(Boolean) && searchStatus === "idle";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSearchClicked = (e:any) => {
    e.preventDefault()
    // console.log(country)
    console.log(country)
    if (canSearch) {
        // console.log("Search button clicked")
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
        

        <button type="button" onClick={onSearchClicked}>
          Search
        </button>
      </form>
    </section>
  );
};
export default SearchForm;

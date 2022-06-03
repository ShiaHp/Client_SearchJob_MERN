import { useAppContext } from "../context/appContext";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import User from "./User";
import Wrapper from "../assets/wrappers/JobsContainer";
import PageBtnContainer from "./PageBtnContainer";
import { FormattedMessage } from "react-intl";
const JobsContainer = () => {
  const {
    getUsers,
    users,
    isLoading,
    page,
    totalUsers,
    search,
    numOfPages,
    isAdmin,
  } = useAppContext();
  const [usersData, setUSersData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);


  useEffect(() => {
    getUsers();
    setUSersData(users);
  }, [page, search]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = usersData.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(usersData);
    }
  };

  if (isLoading) {
    return <Loading center />;
  }

  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>
          <FormattedMessage id="display" />
        </h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <input
        className="form-input"
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <h5>{totalUsers} User-Found</h5>
      {searchInput.length > 1 ? (
        <div className="jobs">
          {filteredResults.map((user) => {
            return <User key={user._id} {...user} />;
          })}
      </div>
      
      ) : (
        <div className="jobs">
     {   users.map((user) => {
          return <User key={user._id} {...user} />;
        })}
          </div>
      )}
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;

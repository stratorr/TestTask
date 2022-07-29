import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import Spinner from "../Spinner/Spinner";
import UserCard from "../UserCard/UserCard";
import UserImage from "../../resources/images/photo-cover.svg";
import "./Users.scss";

const Users = () => {
  const { getAllUsers, onLoading, onLoaded, loading } = UserService();

  const [usersData, setUsersData] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    onLoading();
    getAllUsers(page).then(({ users }) => {
      setUsersData(users);
      onLoaded();
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let ended = false;
    getAllUsers(page).then(({ users }) => {
      if (users.length < 6) {
        ended = true;
        setDisabled(ended);
        onLoaded();
        return;
      }
      setUsersData([...usersData, ...users]);
      onLoaded();
      setDisabled(false);
    });
    // eslint-disable-next-line
  }, [page]);

  const newItemsLoading = () => {
    onLoading();
    setDisabled(true);
    setCurrentPage((page) => page + 1);
  };

  const View = usersData.map(({ email, name, phone, photo, position, id }) => {
    let photo404 =
      "https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png";

    function sliced(el) {
      let sliced = el.slice(0, 25);

      if (sliced.length < el.length) {
        sliced += "...";
      }

      return sliced;
    }

    return (
      <div key={id}>
        <UserCard
          fullEmail={email}
          fullName={name}
          slicedEmail={sliced(email)}
          slicedName={sliced(name)}
          phone={phone}
          photo={photo === photo404 ? UserImage : photo}
          position={position}
        />
      </div>
    );
  });

  return (
    <section className="users">
      <h2 className="title">Working with GET request</h2>
      <div className="users__cards">{View}</div>
      {loading ? <Spinner /> : null}
      <button
        className={disabled ? "btn-disabled hidden" : "btn"}
        onClick={newItemsLoading}
        disabled={disabled ? true : false}
      >
        Show More
      </button>
    </section>
  );
};

export default Users;

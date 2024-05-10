import React from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div>{user?.username}</div>
      <div>{user?.firstName}</div>
      <div>{user?.lastName}</div>
      <div>{user?.email}</div>
      <div>{user?.image}</div>
    </>
  );
};

export default MyProfile;

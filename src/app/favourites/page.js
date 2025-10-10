"use client";

import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import AuthRedirect from "../login/AuthRedirect";

const FavouritesPage = () => {
  const { user, loading: authLoading } = useAuth();
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.favourites.loading);
  console.log("Favourites: ", favourites);

  if (!user) {
    return (
      <div>
        <p>Login to see the favourites country</p>
        <AuthRedirect />
      </div>
    );
  }

  return <div>Favourite page is here</div>;
};

export default FavouritesPage;

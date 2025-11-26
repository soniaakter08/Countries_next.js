import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";

export default function FavouriteCountriesButton() {
  return (
    <Link href="/favourites" style={{ textDecoration: "none" }}>
      <Button
      
        color="inherit"
        startIcon={<FavoriteIcon />}
      >
        Favourite Countries
      </Button>
    </Link>
  );
}

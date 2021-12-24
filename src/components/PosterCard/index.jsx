import { Link } from "react-router-dom";

export default function PosterCard({ imageUrl, posterId }) {
  return (
    <Link to={"/poster/" + posterId}>
      <img className="img" src={imageUrl} alt="" />
    </Link>
  );
}

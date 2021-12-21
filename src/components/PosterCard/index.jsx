import { Link } from "react-router-dom";

export default function PosterCard({ additionalClass, imageUrl, posterId }) {
  return (
    <div className={`card ${additionalClass}`}>
      <Link to={"/poster/" + posterId}>
        <img className="img" src={imageUrl} alt="" />
      </Link>
    </div>
  );
}

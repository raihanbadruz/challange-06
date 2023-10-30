import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostDetails } from "../redux/actions/postActions";

function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { postDetails } = useSelector((state) => state.post);
  console.log(postDetails);

  useEffect(() => {
    dispatch(getPostDetails(id));
  }, [dispatch, id]);

  return (
    <div className="wrapper">
      <img
        src={`https://image.tmdb.org/t/p/original/${postDetails?.backdrop_path}`}
        alt=""
        className="image-detail"
      />
      <div className="card-detail m-5">
        <div className="row g-0">
          <div className="col-md">
            <div className="card-body">
              <h1 className="card-title">{postDetails?.original_title}</h1>
              <p className="card-text">{postDetails?.overview}</p>
              <p className="card-text">Rating : {postDetails?.vote_average}</p>
              <p className="card-text">
                <small className="">
                  Release Date : {postDetails?.release_date}
                </small>
              </p>
            </div>
          </div>
          <Link to="/">
            <button type="button" className="btn btn-success">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Detail;

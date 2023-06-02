// import { useEffect } from "react";
import { useEffect, useState } from "react";
import { addComment } from "../../features/fetchData/homePageDetailSlice";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
const Comments = (notLogin) => {
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");

  const [reivew, setReview] = useState(false);

  const dispatch = useDispatch();

  const showReviewPopup = () => {
    setReview(true);
    setComments();
  };

  useEffect(() => {
    console.log(localStorage.getItem("email"));
    setName(localStorage.getItem("email"));
  }, []);

  const handleSubmit = () => {
    dispatch(addComment({ comments, name }));
    localStorage.setItem("comments", comments);
    setComments("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://maison-be.onrender.com/api/reviews/reza-villa"
      );
      const saveData = await response.json();
      console.log(saveData);
    };
    fetchData();
  }, []);

  return (
    <div className=" py-3 gap-3">
      {!localStorage.getItem("email") ? (
        <button
          onClick={() => notLogin()}
          className="w-full text-3xl font-bold py-3 bg-darkBrown bg-opacity-60 rounded-3xl"
        >
          Reviews
        </button>
      ) : (
        <button
          onClick={() => showReviewPopup()}
          className="w-full text-3xl font-bold py-3 bg-darkBrown bg-opacity-60 rounded-3xl"
        >
          Reviews
        </button>
      )}
      {reivew == true && (
        <div className="w-full gap-3 ">
          <textarea
            value={comments}
            onChange={(e) => setComments(e?.target?.value)}
            className="w-full mt-3 pl-3 bg-darkBrown bg-opacity-30  rounded-3xl focus:outline py-6"
            placeholder="say something"
          />
          <h1>Author : {localStorage.getItem("email")}</h1>
          <button
            onClick={() => handleSubmit()}
            className="w-1/2 bg-darkBrown py-3 bg-opacity-30 rounded-3xl"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;

import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/user";
import { db } from "../../firebase";
import "./style.css";

export default function CommentInput({ comments, id }) {
  const [user, setUser] = useContext(UserContext).user;
  const [comment, setComment] = useState("");

  const [commentArray, setCommentArray] = useState(comments ? comments : []);

  const addComment = () => {
    if (comment != "") {
      // Add a new comment to post info
      commentArray.push({
        comment: comment,
        username: user.email.replace("@gmail.com", "").toLowerCase(),
      });
      db.collection("posts")
        .doc(id)
        .update({ comments: commentArray })
        .then(function () {
          setComment("");
          console.log("comment Added");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <div className="commentInput">
      <textarea
        className="commentInput__textarea"
        placeholder="comment here"
        rows="3"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button onClick={addComment} className="commentInput__btn">
        Post
      </button>
    </div>
  );
}

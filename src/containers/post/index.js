import React, { useState, useContext } from "react";
import Comment from "../../components/comment";
import CommentInput from "../../components/comment-input";
import { UserContext } from "../../contexts/user";
import { db, storage } from "../../firebase";
import "./style.css";
export default function Post({
  profileUrl,
  username,
  id,
  photoURL,
  caption,
  comments,
}) {
  const [user, setUser] = useContext(UserContext).user;
  const deletePost = () => {
    //del img from storage

    //get ref to the image file we like to delete
    var imageRef = storage.refFromURL(photoURL);

    //del the file
    imageRef
      .delete()
      .then(function () {
        console.log("delete successful");
      })
      .catch(function (error) {
        console.log(error);
      });

    //del the post info from firebase firestore
    db.collection("posts")
      .doc(id)
      .delete()
      .then(function () {
        console.log("delete post info successful");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerLeft">
          <img className="post__profilePic" src={profileUrl} />
          <p style={{ marginLeft: "8px" }}>{username}</p>
        </div>
        <button onClick={deletePost} className="post__delete">
          Delete
        </button>
      </div>
      <div className="post__center">
        <img className="post__photoUrl" src={photoURL} />
      </div>
      <div>
        <p>
          <span style={{ fontWeight: "500", marginRight: "8px" }}>
            ::{username}
          </span>
          {caption}
        </p>
      </div>
      <br />
      Comments:
      {comments ? (
        comments.map((comment) => (
          <Comment username={comment.username} caption={comment.comment} />
        ))
      ) : (
        <></>
      )}
      {user ? <CommentInput comments={comments} id={id} /> : <></>}
    </div>
  );
}

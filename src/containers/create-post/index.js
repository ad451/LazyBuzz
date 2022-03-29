import React, { useContext, useState, setProgress } from "react";
import { SignInBtn } from "../../components";
import { UserContext } from "../../contexts/user";
import { storage, db } from "../../firebase";
import "./style.css";
import firebase from "firebase";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
var t = new Date();
var yy = t.getFullYear();
var dd = t.getDate();
var mm = t.getMonth(); //January is 0!
t = yy * 10000 + mm * 100 + dd;
export default function CreatePost() {
  const [user, setUser] = useContext(UserContext).user;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  var t = new Date();
  var yy = t.getFullYear();
  var dd = t.getDate();
  var hh = t.getHours();
  var min = t.getMinutes();
  var ss = t.getSeconds();
  var mm = t.getMonth(); //January is 0!
  t =
    yy * 10000000000 +
    mm * 100000000 +
    dd * 1000000 +
    hh * 10000 +
    min * 100 +
    ss;
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
      var imagePreview = document.getElementById("image-preview");
      imagePreview.src = selectedImageSrc;
      imagePreview.style.display = "block";
    }
  };

  const handleUpload = () => {
    if (image) {
      var imageName = Math.floor(Math.random() * 100000000000001);
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("posts").add({
                sortinid: t,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                photoUrl: imageUrl,
                username: user.email.replace("@gmail.com", ""),
                profileUrl: user.photoURL,
              });
            });

          setCaption("");
          setProgress(0);
          setImage(null);

          document.getElementById("image-preview").style.display = "none";
        }
      );
    }
  };

  return (
    <div className="createPost">
      {user ? (
        <div className="createPost__loggedIn">
          <p>Create Post</p>
          <div className="createPost__loggedInCenter">
            <textarea
              className="createPost__textarea"
              rows="3"
              placeholder="enter Caption Here...."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>

            <div className="createPost__imagePreview">
              <img id="image-preview" alt="" />
            </div>
          </div>
          <div className="createPost__loggedInBottom">
            <div className="createPost__imageUpload">
              <label htmlFor="fileInput">
                <AddAPhotoIcon
                  style={{ cursor: "pointer", fontSize: "20px" }}
                />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleChange}
              ></input>
            </div>
            <button
              className="createPost__uploadBtn"
              onClick={handleUpload}
              style={{ color: caption ? "#000" : "lightgrey" }}
            >
              {`Upload ${progress != 0 ? progress : ""}`}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <SignInBtn />
          <p style={{ marginLeft: "12px" }}>to Post and Comment</p>
        </div>
      )}
    </div>
  );
}

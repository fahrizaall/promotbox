import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import { useAuth } from "../../contexts/authContext";
import { db, storage } from "../../firebase-config";
import "./createpost.scss";

const CreatePost = () => {
  const tag = ["olahraga", "desain", "sastra", "kreatif", "programming"];
  const navigate = useNavigate();
  const date = new Date();
  const { user } = useAuth();
  const [images, setImages] = useState();
  const [imageURLs, setImageURLs] = useState();

  const [form, setForm] = useState({
    filename: "",
    tag: "",
    caption: "",
    owner: "",
    ownerId: "",
    timestamp: serverTimestamp(),
  });

  const handleImage = (e) => {
    setImages(e.target.files[0]);
    setForm({
      ...form,
      filename: e.target.files[0].name,
    });
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (form.filename.length > 0 && form.caption.length > 0) {
      let finalForm = form;

      finalForm.displayName = user.displayName;
      finalForm.uid = user.uid;
      finalForm.filename = date.getTime() + "_" + finalForm.filename;

      let storageRef = ref(
        storage,
        `poster-images/${user.uid}/${finalForm.filename}`
      );
      let newPosterRef = doc(collection(db, "posters"));

      try {
        setDoc(newPosterRef, finalForm);
        uploadBytes(storageRef, images);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("fill all the field");
    }
  };

  useEffect(() => {
    if (images) {
      const newImagesURLs = URL.createObjectURL(images);
      setImageURLs(newImagesURLs);
    }
  }, [images]);

  return (
    <div className="create-post-container">
      <Header />
      <Helmet>
        <title>Create Post - PromotBox</title>
      </Helmet>
      <h1>Create Post</h1>
      <div className="form-box">
        <div className="img-wrapper">
          <label htmlFor="image">
            <img src={imageURLs} alt="" />
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            required={true}
            onChange={handleImage}
          />
        </div>

        <div className="other-wrapper">
          <div className="tag-input">
            <label htmlFor="tag">Kategori</label>
            <select name="tag" id="tag" onChange={handleChange} required={true}>
              <option value="" selected disabled hidden>
                Select an Option
              </option>
              {tag.map((data, i) => (
                <option value={data} key={i}>
                  {data}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="caption">Caption</label>
          <textarea
            name="caption"
            id="caption"
            cols="30"
            rows="10"
            onChange={handleChange}
            required={true}
          ></textarea>

          <button onClick={handleSubmit}>Upload Poster</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

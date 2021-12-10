import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../App";
import { Header } from "../../components";
import "./createpost.scss";

const CreatePost = () => {
  const context = useContext(UserContext);
  const [images, setImages] = useState();
  const [imageURLs, setImageURLs] = useState();

  const [form, setForm] = useState({
    filename: "",
    tag: "",
    caption: "",
  });

  const handleImage = (e) => {
    setImages(e.target.files[0]);
    setForm({ ...form, filename: e.target.files[0].name });
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let submitForm = form;

    console.log(submitForm);
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
            onChange={handleImage}
          />
        </div>

        <div className="other-wrapper">
          <div className="tag-input">
            <label htmlFor="tag">Kategori</label>
            <select name="tag" id="tag" onChange={handleChange}>
              <option value="none" selected disabled hidden>
                Select an Option
              </option>
              {context.tag.map((data, i) => (
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
          ></textarea>

          <button onClick={handleSubmit}>Uplod Poster</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

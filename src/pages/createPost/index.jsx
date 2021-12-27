import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { AlertBox, Header } from "../../components";
import { useAuth } from "../../contexts/authContext";
import { db, storage } from "../../firebase-config";
import "./createpost.scss";

const CreatePost = () => {
  const tag = [
    "Seni",
    "Seni Digital",
    "Karya Tulis",
    "Teknologi",
    "Olahraga",
    "E Sport",
    "Sosial",
    "Sains",
    "Makanan",
    "Ekonomi",
    "Desain Teknis",
    "Fotografi",
    "Videografi",
    "Bahasa",
    "Film",
    "Agama",
  ];

  const date = new Date();
  const { user } = useAuth();
  const [alert, setAlert] = useState();
  const [images, setImages] = useState();
  const [imageURLs, setImageURLs] = useState();
  const [uploadStage, setUploadStage] = useState(0);

  const [form, setForm] = useState({
    filename: "",
    tag: "",
    title: "",
    themeColor: "",
    caption: "",
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
      
      finalForm.uid = user.uid;
      finalForm.filename = date.getTime() + "_" + finalForm.filename;

      let storageRef = ref(
        storage,
        `poster-images/${user.uid}/${finalForm.filename}`
      );
      let newPosterRef = doc(collection(db, "posters"));

      try {
        setUploadStage(1);
        await setDoc(newPosterRef, finalForm);
        await uploadBytes(storageRef, images);
        setAlert(
          <AlertBox
            message={"Poster berhasil dibuat!"}
            redirect={"/"}
            isDanger={false}
          />
        );
        setUploadStage(2)
      } catch (error) {
        console.log(error);
        setUploadStage(0);
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
        <title>Upload Poster - PromotBox</title>
      </Helmet>
      <h1>Upload Poster</h1>
      {alert}
      <div className="form-box">
        <div className="img-wrapper">
          <label htmlFor="image">
            <img src={imageURLs} alt="" />
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
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
          
          <div>
            <label htmlFor="title">Judul</label>
            <input type="text" name="title" id="title" onChange={handleChange} required />
          </div>

          <div className="caption-group">
            <label htmlFor="caption">Caption</label>
            <textarea
              name="caption"
              id="caption"
              cols="30"
              rows="10"
              onChange={handleChange}
              required={true}
              autoCorrect="false"
            ></textarea>
          </div>

          <div>
            <label htmlFor="themeColor">Warna Latar Belakang</label>
            <input type="color" name="themeColor" id="themeColor" className="theme-color-input" onChange={handleChange} required />
          </div>

          {
            uploadStage === 0 ? 
            <button onClick={handleSubmit}>Upload Poster</button>
            : uploadStage === 1 ?
            <button>Sedang mengunggah poster...</button>
            :
            <button>Poster berhasil diunggah!</button>
          }
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

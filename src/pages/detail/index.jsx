import React, { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./detail.scss";
import { ReactComponent as Arrowleft } from "../../assets/icon/arrowleft.svg";
import { ReactComponent as Morehorizontal } from "../../assets/icon/morehorizontal.svg";
import { poster1, poster2, poster3, user1 } from "../../assets";
import { Header } from "../../components";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getDocs } from "firebase/firestore/lite";
import { db, storage } from "../../firebase-config";
import { getDownloadURL, ref } from "firebase/storage";
import { useAuth } from "../../contexts/authContext";

const Detail = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showMore, setShowMore] = useState(false);
  const node = useRef();
  const [data, setData] = useState({});

  const getData = async () => {
    let docSnap = await getDoc(doc(db, "posters", "2UCKwyrKNO9jgEobygFF"));

    if (docSnap.exists()) {
      let data = docSnap.data();
      console.log(data);

      getDownloadURL(ref(storage, `poster-images/${data.uid}/${data.filename}`))
        .then((url) => {
          data.filename = url.toString();
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleClickOutside = (e) => {
    if (node && node.current && node.current.contains(e.target)) {
      // inside click
      setShowMore(!showMore);
    }
    // outside click
    setShowMore(false);
  };

  // get click outside
  useEffect(() => {
    if (showMore) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMore]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="detail-container">
      <Header />

      <div className="navigation">
        <Arrowleft stroke="grey" fill="grey" onClick={() => navigate("/")} />
        <div className="more">
          <Morehorizontal
            stroke="grey"
            fill="grey"
            onClick={() => setShowMore(!showMore)}
          />
          {showMore ? (
            <div className="more-detail" ref={node}>
              <p>Download Poster</p>
              <p>Share</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <main>
        <div className="img-wrapper">
          <img src={data.filename} alt="" />
        </div>
        <div className="info">
          <div className="account">
            <div className="p-pic">
              <img src={user1} alt="" />
            </div>
            <p>{user.displayName}</p>
          </div>

          <div className="desc">
            <p>{data.caption}</p>
            <p>test \n test</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detail;

import React, { useRef, useState, useEffect } from "react";
import "./detail.scss";
import { ReactComponent as Arrowleft } from "../../assets/icon/arrowleft.svg";
import { ReactComponent as Morehorizontal } from "../../assets/icon/morehorizontal.svg";
import { user1 } from "../../assets";
import { AlertBox, Header } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { useAuth } from "../../contexts/authContext";
import Helmet from "react-helmet";

const Detail = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState();
  const param = useParams();
  const posterId = param.id;

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const { user } = useAuth();
  const [showMore, setShowMore] = useState(false);
  const node = useRef();
  const [data, setData] = useState({});

  const getData = async () => {
    let docSnap = await getDoc(doc(db, "posters", posterId));

    if (docSnap.exists()) {
      let data = docSnap.data();

      const collectionRef = collection(db, "users")
        const q = query(collectionRef, where("uid", "==", data.uid))
      onSnapshot(q, (e) => {
        e.docs.map((el) => {
          data = {
            ...data,
            displayName: el.data().displayName,
            photoURL: el.data().photoURL
          }
        })
      })

      getDownloadURL(ref(storage, `poster-images/${data.uid}/${data.filename}`))
        .then((url) => {
          data.fileName = data.filename;
          data.filename = url.toString();

          let date = new Date(data.timestamp.seconds * 1000);
          data.stringifiedDate = `${date.getDate()} ${
            month[date.getMonth()]
          } ${date.getFullYear()}`;
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteData = async (agreement) => {
    if (agreement) {
      const desertRef = ref(
        storage,
        `poster-images/${data.uid}/${data.fileName}`
      );

      // Delete the file
      deleteObject(desertRef).then(function () {
        deleteDoc(doc(db, "posters", posterId)).then((e) => {
          setAlert(
            <AlertBox
              isDanger={false}
              message={"Poster berhasil dihapus"}
              redirect={"/"}
              isShow={true}
            />
          );
        });
      });
    } else {
      setAlert(
        <AlertBox
          isDanger={true}
          components={
            <div className="hapus-agreement">
              <p>Apa anda yakin ingin menghapus?</p>
              <div className="btn">
                <button className="batal" onClick={() => setAlert("")}>
                  Batal
                </button>
                <button className="hapus" onClick={() => deleteData(true)}>
                  Hapus
                </button>
              </div>
            </div>
          }
          clickOutside={(e) => setAlert(e)}
        />
      );
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

  return (
    <div className="detail-container">
      <Header />

      <Helmet>
        <title>{data && data.title ? data.title : "Detail Poster"} - PromotBox</title>
      </Helmet>

      {alert}
      <div className="navigation">
        <Arrowleft stroke="grey" fill="grey" onClick={() => navigate(-1)} />
        <div className="more">
          <Morehorizontal
            stroke="grey"
            fill="grey"
            onClick={() => setShowMore(!showMore)}
          />
          {showMore ? (
            <div className="more-detail" ref={node}>
              {data.filename ? (
                <a href={data.filename} download>
                  <p>Download poster</p>
                </a>
              ) : (
                false
              )}
              {user && user.uid === data.uid ? (
                <p onClick={() => deleteData(false)}>Hapus</p>
              ) : (
                false
              )}
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
              <img src={data && data.photoURL ? data.photoURL : user1} alt="" />
            </div>
            <div className="author-info">
              <p>{data.displayName}</p>
              <span>{data.stringifiedDate}</span>
            </div>
          </div>

          <div className="desc">
            <p>{data.caption}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detail;

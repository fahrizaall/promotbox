import React, { useRef, useState, useEffect } from "react";
import "./detail.scss";
import { ReactComponent as Arrowleft } from "../../assets/icon/arrowleft.svg";
import { ReactComponent as Morehorizontal } from "../../assets/icon/morehorizontal.svg";
import { user1 } from "../../assets";
import { AlertBox, Header } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  collection,
  query,
  where,
  setDoc,
} from "firebase/firestore";
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
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    let docSnap = await getDoc(doc(db, "posters", posterId));

    if (docSnap.exists()) {
      let data = docSnap.data();

      setDoc(doc(db, "posters", posterId), {
        ...docSnap.data(),
        view: docSnap.data().view + 1,
      });

      const collectionRef = collection(db, "users");
      const q = query(collectionRef, where("uid", "==", data.uid));
      onSnapshot(q, (e) => {
        e.docs.map((el) => {
          data = {
            ...data,
            displayName: el.data().displayName,
            photoURL: el.data().photoURL,
          };
        });
      });

      getDownloadURL(ref(storage, `poster-images/${data.uid}/${data.filename}`))
        .then((url) => {
          data.fileName = data.filename;
          data.filename = url.toString();

          let date = new Date(data.timestamp.seconds * 1000);
          data.stringifiedDate = `${date.getDate()} ${
            month[date.getMonth()]
          } ${date.getFullYear()}`;
          setData(data);
          setIsLoading(false);
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
          setAlert("");
          toast.success("Poster berhasil dihapus!");
          setTimeout(function () {
            navigate("/");
          }, 3000);
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

  const report = async () => {
    if (user) {
      setDoc(doc(collection(db, "report")), {
        posterId,
        data,
      })
        .then(() => {
          toast.success("Poster berhasil dilaporkan!");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast.warning("Login untuk bisa melaporkan!");
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

  const CopiedToClipboard = () => toast.info("Link disalin ke clipboard!");

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    CopiedToClipboard();
  }

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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop={true}
        pauseOnHover={true}
      />
      <Header />

      <Helmet>
        <title>
          {data && data.title ? data.title : "Detail Poster"} - PromotBox
        </title>
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
              <p onClick={handleShare}>Bagikan</p>
              <p onClick={() => report()}>Laporkan</p>
              {user && user.uid === data.uid ? (
                <p
                  className="detail-opt-hapus"
                  onClick={() => deleteData(false)}
                >
                  Hapus
                </p>
              ) : (
                false
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="load-nocontent-screen">
          <img src="/logo231.svg" alt="" />
          <span>Loading...</span>
        </div>
      ) : (
        <main>
          <div className="img-wrapper">
            <img src={data.filename} alt="" />
          </div>
          <div className="info">
            <div
              className="account"
              onClick={() => {
                user == null || data.uid !== user.uid
                  ? navigate(`/profile/${data.uid}`)
                  : navigate(`/me`);
              }}
            >
              <div className="p-pic">
                <img
                  src={data && data.photoURL ? data.photoURL : user1}
                  alt=""
                />
              </div>
              <div className="author-info">
                <p>{data.displayName}</p>
                <span>{data.stringifiedDate}</span>
              </div>
            </div>

            <div className="desc">
              <h2 className="title">{data.title}</h2>
              <p>{data.caption}</p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Detail;

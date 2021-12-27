import { user1 } from "../../assets";
import { Header, PosterCard } from "../../components";
import { useAuth } from "../../contexts/authContext";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { getDownloadURL, ref } from "firebase/storage";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export default function Profile() {
  const params = useParams();
  const { user } = useAuth();
  const [poster, setPosters] = useState([]);
  const [loadStage, setLoadStage] = useState(0);
  const [userData, setUserData] = useState()

  const randomCardSize = () => {
    let cardClass = ["card-small", "card-medium", "card-large"];
    let rand = Math.floor(Math.random() * 2) + 0;

    return cardClass[rand];
  };

  function getUserProfile(userUid) {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", userUid));
    getDocs(q)
    .then((e) => {
      e.docs.map((el) => {
        setUserData(el.data())
      })
    })
  }

  function getUserPosts(userUid) {
    const postersRef = collection(db, "posters");
    const q = query(postersRef, where("uid", "==", userUid));

    getDocs(q)
      .then((doc) => {
        let newPoster = [];
        doc.forEach((e) => {
          let temp = {};

          getDownloadURL(
            ref(storage, `poster-images/${e.data().uid}/${e.data().filename}`)
          )
            .then((el) => {
              temp.imageUrl = el.toString();
              temp.id = e.id;
              temp.data = e.data();

              let _x = newPoster.push(temp);
              setPosters(poster.concat(newPoster));
            })
            .catch(console.error);
        });
      })
      .then(() => {
        setLoadStage(1)
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (params.id) {
      getUserPosts(params.id);
      getUserProfile(params.id);
    }
  }, [params, params.id]);

  return (
    <div className="me-wrapper">
      <Header />
      {userData ? (
        <div>
          <Helmet>
            <title>Profil {userData.displayName ? userData.displayName : false} - PromotBox</title>
          </Helmet>
          <div className="me-header">
            <img
              src={userData.photoURL ? userData.photoURL : user1}
              alt=""
              className="profile-picture"
            />
            <p className="user-name">{userData.displayName? userData.displayName : false}</p>
            {/* <p className="user-email">{poster.length} poster</p> */}
          </div>
          <div className="divider"></div>
          <div className="me-contents">
            {poster.length > 0
              ? poster.map((e, i) => (
                  <div className={`card ${randomCardSize()}`} key={i}>
                    <PosterCard imageUrl={e.imageUrl} posterId={e.id} />
                  </div>
                ))
              : loadStage === 0 ? "Loading..."
              : "Tidak ada poster"
            }
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

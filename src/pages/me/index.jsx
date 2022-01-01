import { user1 } from "../../assets";
import { Header, PosterCard } from "../../components";
import { useAuth } from "../../contexts/authContext";
import "./me.scss";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { getDownloadURL, ref } from "firebase/storage";

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
export default function Me() {
  const { user } = useAuth();
  const [poster, setPosters] = useState([]);
  const [loadStage, setLoadStage] = useState(0);

  const randomCardSize = () => {
    let cardClass = ["card-small", "card-medium", "card-large"];
    let rand = Math.floor(Math.random() * 2) + 0;

    return cardClass[rand];
  };

  function getUserPosts() {
    const postersRef = collection(db, "posters");
    const q = query(postersRef, where("uid", "==", user.uid));

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
        setLoadStage(1);
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (user) {
      getUserPosts();
    }
  }, [user]);

  return (
    <div className="me-wrapper">
      <Header />
      {user ? (
        <div>
          <Helmet>
            <title>Profil {user.displayName} - PromotBox</title>
          </Helmet>
          <div className="me-header">
            <img
              src={user.photoURL ? user.photoURL : user1}
              alt=""
              className="profile-picture"
            />
            <p className="user-name">{user.displayName}</p>
            <p className="user-email">{user.email}</p>
          </div>
          <div className="divider"></div>
          <div className="me-contents">
            {poster.length > 0 ? (
              poster.map((e, i) => (
                <div className={`card ${randomCardSize()}`} key={i}>
                  <PosterCard imageUrl={e.imageUrl} posterId={e.id} />
                </div>
              ))
            ) : loadStage === 0 ? (
              <div className="load-nocontent-screen">
                <img src="/logo231.svg" alt="" />
                <span>Loading...</span>
              </div>
            ) : (
              "Tidak ada poster"
            )}
          </div>
        </div>
      ) : (
        <div className="load-nocontent-screen">
          <img src="/logo231.svg" alt="" />
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}

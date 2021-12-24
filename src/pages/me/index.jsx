import { user1 } from "../../assets";
import { Header, PosterCard } from "../../components";
import { useAuth } from "../../contexts/authContext";
import "./me.scss";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { getDownloadURL, list, ref } from "firebase/storage";
import { useEffect, useState } from "react";

export default function Me() {
  const { user } = useAuth();
  const [poster, setPosters] = useState([]);

  function getUserPosts() {
    const postersRef = collection(db, "posters");
    const q = query(postersRef, where("uid", "==", user.uid));

    getDocs(q)
      .then((doc) => {
        doc.forEach((e) => {
          let temp = {};

          getDownloadURL(
            ref(storage, `poster-images/${e.data().uid}/${e.data().filename}`)
          )
            .then((el) => {
              temp.imageUrl = el.toString();
              temp.id = e.id;
              temp.data = e.data();

              setPosters(poster.concat([temp]));
            })
            .catch(console.error);
        });
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (user != null) {
      getUserPosts();
    }
  }, [user]);

  useEffect(() => {
    console.log(poster);
  }, [poster]);

  return (
    <div className="me-wrapper">
      <Header />
      {user ? (
        <div>
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
            {poster.length > 0
              ? poster.map((e, i) => {
                  return (
                    <div className="me-card" key={e.id}>
                      <PosterCard imageUrl={e.imageUrl} posterId={e.id} />
                    </div>
                  );
                })
              : "Tidak ada poster"}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

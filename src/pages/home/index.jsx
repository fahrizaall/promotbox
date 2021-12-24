import { Header, Footer, PosterCard, AlertBox } from "../../components";
import { poster1, poster2, poster3 } from "../../assets";
import "./home.scss";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import React, { useContext, useEffect, useState } from "react";
import "./home.scss";
import { useAuth } from "../../contexts/authContext";
import { getDownloadURL, list, ref } from "firebase/storage";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../../firebase-config";

const Home = () => {
  let params = useParams();
  const { user } = useAuth();
  const [posters, setPosters] = useState([]);
  const [loadMoreToken, setLoadMoreToken] = useState(false);
  const [isActiveTag, setIsActiveTag] = useState("all");

  const tag = ["desain", "olahraga", "karyatulis", "koding", "Menggambar"];

  const randomCardSize = () => {
    let cardClass = ["card-small", "card-medium", "card-large"];
    let rand = Math.floor(Math.random() * 2) + 0;

    return cardClass[rand];
  };

  const loadContents = async (loadMore) => {
    let dataQuery;
    let data = posters;

    if (params.tag) {
      console.log();
      dataQuery = query(
        collection(db, "posters"),
        where("tag", "==", params.tag)
      );
    } else {
      if (loadMore) {
        if (loadMoreToken) {
          dataQuery = query(
            collection(db, "posters"),
            startAfter(loadMoreToken),
            limit(50)
          );
        }
      } else {
        dataQuery = query(collection(db, "posters"), limit(50));
      }
    }

    getDocs(dataQuery).then((querySnapshots) => {
      querySnapshots.forEach((doc) => {
        let rawData = doc.data();
        rawData.doc_id = doc.id;

        getDownloadURL(
          ref(storage, `poster-images/${rawData.uid}/${rawData.filename}`)
        )
          .then((e) => {
            rawData.imageUrl = e.toString();
            data.push(rawData);
          })
          .then(() => {
            setPosters(data);
            setLoadMoreToken(data.length);
          })
          .catch(console.error);
      });
    });
  };

  useEffect(() => {
    console.log(params.tag);
    async function fetchData() {
      await loadContents(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    if (params.tag) {
      setIsActiveTag(params.tag);
    } else setIsActiveTag("all");
  }, [params]);

  return (
    <div className="home-container">
      <Header />
      <div className="tag">
        <div className="fix-item-container">
          <p>
            <a
              className={`tag-item ${isActiveTag === "all" ? "selected" : ""}`}
              href=""
            >
              All
            </a>
          </p>
        </div>
        <div className="tag-overflow">
          {tag.map((tag) => (
            <p>
              <a
                className={`tag-item ${isActiveTag === tag ? "selected" : ""}`}
                href={"/kategori/" + tag}
              >
                {tag}
              </a>
            </p>
          ))}
        </div>
      </div>
      <main>
        <div className="poster-container">
          {posters && posters.length > 0
            ? posters.map((poster) => (
                <PosterCard
                  additionalClass={randomCardSize()}
                  imageUrl={poster.imageUrl}
                  posterId={poster.doc_id}
                  key={poster.doc_id}
                />
              ))
            : ""}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

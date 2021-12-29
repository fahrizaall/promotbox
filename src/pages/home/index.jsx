import { Header, Footer, PosterCard } from "../../components";
import "./home.scss";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Arrowleft } from "../../assets/icon/arrowleft.svg";
import { ReactComponent as LoadingIllustration } from '../../assets/icon/logo.svg';
import React, { useEffect, useRef, useState } from "react";
import "./home.scss";
import { getDownloadURL, ref } from "firebase/storage";
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
import { Helmet } from "react-helmet";

const Home = () => {
  let params = useParams();
  let navigate = useNavigate();
  const tagScroll = useRef();
  const [posters, setPosters] = useState([]);
  const [loadMoreToken, setLoadMoreToken] = useState(false);
  const [isActiveTag, setIsActiveTag] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

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

  const randomCardSize = () => {
    let cardClass = ["card-small", "card-medium", "card-large"];
    let rand = Math.floor(Math.random() * 2) + 0;

    return cardClass[rand];
  };

  const loadContents = async (loadMore) => {
    setIsLoading(true);
    let dataQuery;
    let data = [];

    if (params.tag) {
      dataQuery = query(
        collection(db, "posters"),
        where("tag", "==", params.tag)
      );
    } else if (params.searchquery) {
      dataQuery = query(
        collection(db, "posters"),
        where("displayName", ">=", `${params.searchquery}`),
        where("displayName", "<=", `${params.searchquery}\uf8ff`),
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

    await getDocs(dataQuery).then((querySnapshots) => {
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
            setIsLoading(false);
          })
          .catch(console.error);
      });
    });

    
  };

  async function fetchData() {
    await loadContents(false);
    setIsLoading(false);
  }

  const scroll = (scrollOffset) => {
    tagScroll.current.scrollLeft += scrollOffset;
  };

  useEffect(() => {
    setPosters([]);
    fetchData();
    if (params.tag) {
      setIsActiveTag(params.tag);
    } else setIsActiveTag("all");
  }, [params]);

  return (
    <div className="home-container">
      <Header />
      <Helmet>
        <title>PromotBox</title>
      </Helmet>
      {params && params.searchquery && params.searchquery != "" ? (
        <div className="search-result-query tag">
          Hasil pencarian untuk
          <span className="search-query">
            {params.searchquery}
            <button onClick={() => navigate("/")}>&times;</button>
          </span>
        </div>
      ) : (
        <div className="tag">
          <div className="fix-item-container">
            <div>
              <Link
                className={`tag-item ${
                  isActiveTag === "all" ? "selected" : ""
                }`}
                to="/"
              >
                All
              </Link>
            </div>
          </div>
          <button className="scroll scroll-l" onClick={() => scroll(-250)}>
            <span>
              <Arrowleft stroke="grey" fill="grey" />
            </span>
          </button>
          <div className="tag-overflow" ref={tagScroll}>
            {tag.map((tag, i) => (
              <div key={i}>
                <Link
                  className={`tag-item ${
                    isActiveTag === tag ? "selected" : ""
                  }`}
                  to={"/kategori/" + tag}
                >
                  {tag}
                </Link>
              </div>
            ))}
          </div>
          <button className="scroll scroll-r" onClick={() => scroll(250)}>
            <span>
              <Arrowleft stroke="grey" fill="grey" />
            </span>
          </button>
        </div>
      )}
      <main>
        <div className="poster-container">
          {
            isLoading === true ? 
            <div className="load-nocontent-screen">
              <img src="/logo231.svg" alt="" />
              {/* <span>Loading...</span> */}
            </div>
            : posters && posters.length > 0
            ? posters.map((poster, i) => (
                <div className={`card ${randomCardSize()}`} key={i}>
                  <PosterCard
                    imageUrl={poster.imageUrl}
                    posterId={poster.doc_id}
                  />
                </div>
              ))
            : 
            <div className="load-nocontent-screen">
              {/* <NoDataIllustration width={100} /> */}
              <span>Tidak ada data</span>
            </div>
            }
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

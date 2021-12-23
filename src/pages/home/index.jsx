import { Header, Footer, PosterCard } from "../../components";
import { poster1, poster2, poster3 } from "../../assets";
import "./home.scss";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import React, { useContext, useEffect, useState } from "react";
import "./home.scss";
import { useAuth } from "../../contexts/authContext";
import { getDownloadURL, list, ref } from "firebase/storage";
import { useParams } from 'react-router-dom'
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { Helmet } from "react-helmet";

const Home = () => {
  let params = useParams()
  const { user } = useAuth();
  const [posters, setPosters] = useState([]);
  const [loadMoreToken, setLoadMoreToken] = useState(false);
  // get random class to define card size
  const randomCardSize = () => {
    let cardClass = ["card-small", "card-medium", "card-large"];
    // Returns a random integer from 0 to 2:
    let rand = Math.floor(Math.random() * 2) + 0;

    return cardClass[rand];
  };

  const loadContents = async (loadMore) => {
    let dataQuery;
    let data = posters;

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

    getDocs(dataQuery)
    .then((querySnapshots) => {
      querySnapshots.forEach((doc) => {
        let rawData = doc.data();
        rawData.doc_id = doc.id
        
        getDownloadURL(ref(storage, `poster-images/${rawData.uid}/${rawData.filename}`))
        .then((e) => {
          rawData.imageUrl = e.toString()
          data.push(rawData);
        })
        .then(() => {
          setPosters(data);
          setLoadMoreToken(data.length);
        })
        .catch(console.error)
        

        
      });
    })
    

    //generateImgURL(data);
    
  };

  const generateImgURL = (dataPoster) => {
    let editedData = dataPoster;
    editedData.forEach((data) => {
      getDownloadURL(ref(storage, `poster-images/${data.uid}/${data.filename}`))
        .then((url) => {
          data.filename = url.toString();
        })
        .catch((error) => {
          console.log(error);
        });
    });

    // setPosters(editedData);
    return editedData;
  };

  useEffect(() => {
    async function fetchData() {
      await loadContents(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(posters);
  }, [posters]);

  function setTagSearchParam(sparam) {
    if(sparam && sparam != '') {
      let param = new URLSearchParams()
      param.set('tag', sparam)
      console.log(sparam, param.get('tag'))

    }
  }

  return (
    <div className="home-container">
      <Header />
      <Helmet>
        <title>PromotBox</title>
      </Helmet>
      <div className="tag">
        <div className="fix-item-container">
          <p className="tag-item selected">All</p>
        </div>
        <div className="tag-overflow">
          <p className="tag-item" onClick={()=>setTagSearchParam('design')}>Design</p>
          <p className="tag-item">Drawing</p>
          <p className="tag-item">Programming</p>
          <p className="tag-item">Writing</p>
        </div>
      </div>
      <main>
        {/* <button onClick={() => loadContents(true)}>test</button> */}
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

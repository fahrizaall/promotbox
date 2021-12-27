import React, { useState } from "react";
import { db, storage } from "../../firebase-config";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect } from "react/cjs/react.development";
import { deleteObject, ref } from "firebase/storage";
import { AlertBox, PosterCard } from "../../components";
import "./adminpage.scss";

const AdminPage = () => {
  const [alert, setAlert] = useState();
  const [posters, setPosters] = useState([]);

  const loadContents = async () => {
    let data = [];
    let dataQuery = query(collection(db, "report"));

    getDocs(dataQuery)
      .then((querySnapshots) => {
        querySnapshots.forEach((doc) => {
          let rawData = doc.data();
          rawData.doc_id = doc.id;
          data.push(rawData);
          console.log(rawData.posterId, rawData.data.filename);
        });
      })
      .then(() => {
        setPosters(data);
      });
  };

  const deleteData = async (agreement, data, reportId) => {
    console.log(data, reportId);
    if (agreement) {
      const desertRef = ref(
        storage,
        `poster-images/${data.data.uid}/${data.data.fileName}`
      );

      // Delete the file
      deleteObject(desertRef)
        .then(function () {
          deleteDoc(doc(db, "posters", data.posterId)).then(() => {
            deleteDoc(doc(db, "report", reportId)).then(() => {
              window.location.reload();
            });
          });
        })
        .catch((error) => {
          window.alert("poster tidak ada atau sudah dihapus");
          deleteDoc(doc(db, "report", reportId)).then(() =>
            window.location.reload()
          );
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
                <button
                  className="hapus"
                  onClick={() => deleteData(true, data, reportId)}
                >
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

  useEffect(() => {
    loadContents();
  }, []);

  return (
    <div className="admin-page">
      {alert}
      {posters && posters.length > 0
        ? posters.map((poster, i) => (
            <div className={`card-admin`} key={i}>
              <PosterCard
                imageUrl={poster.data.filename}
                posterId={poster.posterId}
              />
              <p>{poster.data.caption}</p>
              <button onClick={() => deleteData(false, poster, poster.doc_id)}>
                Delete
              </button>
            </div>
          ))
        : "Tidak Ada Report..."}
    </div>
  );
};

export default AdminPage;

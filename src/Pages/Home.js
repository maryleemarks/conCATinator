import React, { useEffect, useState } from "react";
import { getDocs, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Home({ isAuth }) {
  const [catLists, setCatList] = useState([]);
  const catsCollectionRef = collection(db, "cats");
 
  const catSighting = async (id, sightings) => {
    const catDoc = doc(db, "cats", id);
    const addSighting = { sightings: sightings + 1 };
    await updateDoc(catDoc, addSighting);
  };

  useEffect(() => {
    const getCats = async () => {
      const data = await getDocs(catsCollectionRef);
      setCatList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCats();
    
   }, []);

   const deleteCat = async (id) => {
    const catDoc = doc(db, "cats", id);
    await deleteDoc(catDoc);
  };

   let navigate = useNavigate();

  return (
    <div className="homePage">
      {catLists.map((cat) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {cat.name}</h1>
              </div>
              <div className="editPost">
                {isAuth && cat.user.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deleteCat(cat.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div> 
              <div className="editPost">
                {isAuth && cat.user.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      //editCat(cat.id);
                      navigate("/editCat");
                    }}
                  >
                    {" "}
                    &#9999;
                  </button>
                )}
              </div> 
              <div className="editPost">
                {isAuth && cat.user.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      catSighting(cat.id, cat.sightings);
                    }}
                  >
                    {" "}
                    &#128571;
                  </button>
                )}
              </div> 
            </div>
            <div className="postTextContainer"> {cat.notes} </div>
            <h3>@{cat.user.author}</h3>
            <h3> {cat.sightings} &#128571; </h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
import React, { useEffect, useState } from "react";
import { getDocs, collection, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import '../App.css';

function Home({ isAuth }) {
  const [catLists, setCatList] = useState([]);
  const catsCollectionRef = collection(db, "cats");

  useEffect(() => {
    const getCats = async () => {
      const data = await getDocs(catsCollectionRef);
      setCatList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCats();
  });  
  // }, [deleteCat]);

  // const deleteCat = async (id) => {
  //   const catDoc = doc(db, "cats", id);
  //   await deleteDoc(postDoc);
  // };
  return (
    <div className="homePage">
      {catLists.map((cat) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {cat.name}</h1>
              </div>
              {/* <div className="deletePost">
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
              </div> */}
            </div>
            <div className="postTextContainer"> {cat.notes} </div>
            <h3>@{cat.user.author}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
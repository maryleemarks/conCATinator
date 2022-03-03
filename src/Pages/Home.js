import React, { useEffect, useState } from "react";
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from "../firebase";

function Home() {
  const [catLists, setCatList] = useState([]);
  const catsCollectionRef = collection(db, "cats");

  useEffect(() => {
    const getCats = async () => {
      const data = await getDocs(catsCollectionRef);
      setCatList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCats();
  });
  return (
    <div className="homePage">
    {catLists.map((cat) => {
      return (
        <div className="post">
          <div className="postHeader">
            <div className="title">
              <h1> {cat.name}</h1>
            </div>
          </div>
          <div className="postTextContainer"> {cat.notes} </div>
          <h3>@{cat.author.name}</h3>
        </div>
      );
    })}
  </div>
);
}

export default Home;
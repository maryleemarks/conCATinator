import React, { Component, useState, useEffect } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from "../firebase";
import { useNavigate } from 'react-router-dom';


function CreateCat({ isAuth }) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [likes, setLikes] = useState("");

  const catsCollectionRef = collection(db, "cats");
  let navigate = useNavigate();

  const createCat = async () => {
    await addDoc(catsCollectionRef, {name, notes, likes, user: {author: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  return (
  <div className='createPostPage'>
    <div className="cpContainer">
    <h1>Add a cat</h1>
    <div className="inputGp">
      <label>Name: </label>
      <input placeholder="Kitty's Name... " onChange={(event) => {setName(event.target.value);}}/>
    </div> 
    <div className="inputGp">
      <label>Notes: </label>
      <textarea placeholder="What's up with this kitty?" onChange={(event) => {setNotes(event.target.value);}}/>
    </div>
  <button onClick={createCat}>Add Cat</button>
  </div> 
</div>  
  );
}

export default CreateCat;
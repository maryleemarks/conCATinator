import React, { Component, useState, useEffect } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from "../firebase";
import { useNavigate } from 'react-router-dom';


function CreateCat({ isAuth }) {
  const [newName, setNewName] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [newLikes, setNewLikes] = useState(0);

  const catsCollectionRef = collection(db, "cats");
  let navigate = useNavigate();

  const createCat = async () => {
    await addDoc(catsCollectionRef, {name: newName, notes: newNotes, likes: Number(newLikes) , user: {author: auth.currentUser.displayName, id: auth.currentUser.uid },
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
    <h1>Add a New Cat</h1>
    <div className="inputGp">
      <label>Name: </label>
      <input placeholder="Kitty's Name... " onChange={(event) => {setNewName(event.target.value);}}/>
    </div> 
    <div className="inputGp">
      <label>Notes: </label>
      <textarea placeholder="What's up with this kitty?" onChange={(event) => {setNewNotes(event.target.value);}}/>
    </div>
    <div className="inputGp">
      <label>&#128571;: </label>
      <input placeholder="Enter 0" onChange={(event) => {setNewLikes(event.target.value);}}/>
    </div>
  <button onClick={createCat}>Add Cat</button>
  </div> 
</div>  
  );
}

export default CreateCat;
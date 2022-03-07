import React, { Component, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from "../firebase";
import { useNavigate } from 'react-router-dom';


function EditCat({ isAuth }) {
  const [newName, setNewName] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const [cats, setCats] = useState([]);
  const catsCollectionRef = collection(db, "cats");
  let navigate = useNavigate();

  const editCat = async (id) => {
    const catDoc = doc(db, "cats", id);
    //const incRating = { rating: rating + 1 };
    //const decRating = { rating: rating -- };
    await updateDoc(catDoc);
  };
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getCats = async () => {
      const data = await getDocs(catsCollectionRef);
      setCats(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getCats();

  }, []);

  return (
  <div className='createPostPage'>
    <div className="cpContainer">
    <h1>Edit cat</h1>
    <div className="inputGp">
      <label>Name: </label>
      <input placeholder="Kitty's Name... " onChange={(event) => {setNewName(event.target.value);}}/>
    </div> 
    <div className="inputGp">
      <label>Notes: </label>
      <textarea placeholder="What's up with this kitty?" onChange={(event) => {setNewNotes(event.target.value);}}/>
    </div>

    <button onClick={() => {editCat (cat.id, cat.name. cat.notes);}}>Update Cat</button>
    </div> 
</div>  
  );
}

export default EditCat;
import React from "react";

function CreateCat() {
  return (
  <div className='createPostPage'>
    <div><h1>Add a cat</h1>
    <div className="inputGp">
      <label>Name: </label>
    </div>
    <div>  
      <input placeholder="Kitty's Name... "/>
      <label>Notes: </label>
      <textarea placeholder="What's up with this kitty?"/>
    </div>
  <button>Add Cat</button>
  </div> 
</div>  
  );
}

export default CreateCat;
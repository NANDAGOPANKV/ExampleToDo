import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import "./App.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import db from "./firebase";

function App() {
  const [input, setInput] = useState("");
  const [lists, setLists] = useState([]);
  useEffect(() => {
    console.log("Im useEffect");
    const q = query(
      collection(db, "shopping lists"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLists(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setInput("");
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();

    if (input) {
      addDoc(collection(db, "shopping lists"), {
        name: input,
        timestamp: new Date(),
      }).catch((err) => console.error(err));
    }
  };

  //deleteDocument
  const deleteDocument = async (id) => {
    let request = await deleteDoc(doc(db, "shopping lists", id));
    console.log(request);
  };

  //updateDocument
  const updateDocument = (id) => {
    const itemRef = doc(db, "shopping lists", id);
    let name = prompt("What would you do like it update it to?");
    setDoc(itemRef, {
      name: name,
      timestamp: new Date(),
    });
  };

  return (
    <div className="main">
      <div className="area">
        <input
          className="input-area"
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button className="saveBtn" onClick={handleClick}>
          Save
        </button>
        <br />
        <div className="textedarea">
          <div className="icons">
            {lists.map((data, key) => {
              return (
                <div
                  className="border-b w-full h-16 flex items-center justify-between"
                  key={key}
                >
                  <p>{data.name}</p>
                  <div>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteDocument(data.id)}
                    >
                      Delete
                    </Button>

                    <Button onClick={() => updateDocument(data.id)}>
                      <EditIcon />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

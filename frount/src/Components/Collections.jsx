import React, { useState } from "react";
import "./Collections.css";
import plus from "../assets/Plus.png";
import PrivateCollections from "./PrivateCollections";

function Collections({ privateColl = [], setCollView, setPrivateCollLoading, user , get, setGet}) {
  // modal open state
  

  const [formData, setFormData] = useState({
    name: "",
  });

  const baseURL = import.meta.env.VITE_API_URL ?? "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePrivate(formData.name);
  };

  const handlePrivate = async (name) => {
    try {
      const body = {
        id: `${privateColl.length}`,
        collectionName: name || "New Collection",
        songsId: [],
      };

      const res = await fetch(`${baseURL}/privateCollection/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to create private collection");
      }

      setPrivateCollLoading(true);
    } catch (err) {
      console.error("Create failed:", err);
    } finally {
      setFormData({ name: "" });
      setGet(false);
    }
  };

  const handleCreateNew = () => {
    if (user == null) alert("Login to create");
    else setGet(true);
  };

  return (
    <>
      <div className="Collections">
        {privateColl.map((items) => (
          <PrivateCollections
            key={items.id}
            data={items}
            setCollView={setCollView}
          />
        ))}

        <button className="collBox" onClick={handleCreateNew}>
          <div
            style={{
              backgroundImage: `url(${plus})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height:"100px",
              width:"100px",
              border:"none"
            }}
          />
          <h2>Create Collection</h2>
        </button>
      </div>

      {get && (
        <div className="createColl">
          <div className="createInner">
            <p className="createTitle">+ Create Collection</p>

            <form onSubmit={handleSubmit} className="custom-form">
              <input
                type="text"
                name="name"
                className="name-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />

              <div className="button-group">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setGet(false);
                    setFormData({ name: "" });
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="create-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Collections;

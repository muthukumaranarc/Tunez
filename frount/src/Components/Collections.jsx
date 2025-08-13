import React, { useState } from "react";
import "./Collections.css";
import plus from "../assets/Plus.png";
import PrivateCollections from "./PrivateCollections";

function Collections({ privateColl = [], setCollView, setPrivateCollLoading }) {
  // modal open state
  const [get, setGet] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    visibility: "Private",
  });

  const baseURL = import.meta.env.VITE_API_URL ?? "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CreateHandler(formData);
  };

  const CreateHandler = async (data) => {
    try {
      if (data.visibility === "private") {
        await handlePrivate(data.name);
      } else {
        await handlePublic(data.name);
      }
    } catch (err) {
      console.error("Create failed:", err);
    } finally {
      setFormData({ name: "", visibility: "public" });
      setGet(false);
    }
  };

  const handlePublic = async (name) => {
    const body = {
      id: `${privateColl.length}`,
      collectionName: name || "New Collection",
      songsId: [],
    };

    const res = await fetch(`${baseURL}/collection/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error("Failed to create public collection");
    }

    setPrivateCollLoading(true);
  };

  const handlePrivate = async (name) => {
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

        {/* open modal */}
        <button className="collBox" onClick={() => setGet(true)}>
          <div
            className="plus-icon"
            style={{
              backgroundImage: `url(${plus})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
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

              <select
                id="visibility"
                name="visibility"
                className="custom-select"
                value={formData.visibility}
                onChange={handleChange}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>

              <div className="button-group">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setGet(false);
                    setFormData({ name: "", visibility: "public" });
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

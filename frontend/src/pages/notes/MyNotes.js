import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getApi } from "../../utils/axios";
import { popAlert } from "../../utils/alert";
import SyncLoader from "react-spinners/SyncLoader";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyNotes = () => {
  const id = useSelector((state) => state.auth.sid);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    const source = axios.CancelToken.source();

    const getNotes = () => {
      getApi()
        .get(`/note/getNotes/${id}`, { cancelToken: source.token })
        .then((res) => {
          setNotes(res.data);

          setLoader(false);
        })
        .catch((err) => {
          popAlert("Error!", err.response.data.message, "error", "ok");
          setLoader(false);
        });
      return () => {
        source.cancel();
      };
    };

    getNotes();
  }, []);

  const deleteNote = (id) => {
    getApi()
      .delete(`/note/deleteNote/${id}`)
      .then((res) => {
        popAlert("Success!", "Note Deleted", "success", "Ok").then((res) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        popAlert("Error!", err.response.data.message, "error", "ok");
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Notes</h1>
      {loader ? (
        <div className="loader">
          <SyncLoader color="green" size={60} />
        </div>
      ) : (
        <div className="grid-container-note">
          {notes.map((note) => {
            return (
              <div key={note._id} className="grid-item-note">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3>{note.title}</h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: "1rem",
                      marginRight: "2rem",
                      cursor: "pointer",
                    }}
                  >
                    <AiFillEdit fontSize={25} />
                    <AiFillDelete
                      fontSize={24}
                      color="red"
                      onClick={() => {
                        deleteNote(note._id);
                      }}
                    />
                  </div>
                </div>
                <p>{note.description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyNotes;

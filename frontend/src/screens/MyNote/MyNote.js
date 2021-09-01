import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionToggle,
  Badge,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { deleteNoteAction, listNotes } from "../../actions/noteActions";
import Loading from "../../components/Loading";
import Error from "../../components/errorMessage";

const MyNote = ({ search }) => {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  const fetchNotes = async () => {
    //untuk menghubungkan aplikasi backendnya, tambahkan proxy pada frontend/package.json
    const { data } = await axios.get("/api/notes");
    // setNotes(data);
  };

  const history = useHistory();

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    successCreate,
    history,
    userInfo,
    successUpdate,
    loadingDelete,
  ]);

  return (
    <div>
      <MainScreen title={`Welcome Back, ${userInfo.name}! `}>
        <Link to="/createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }}>
            Create New Note
          </Button>
        </Link>
        {errorDelete && <Error variant="danger">{errorDelete}</Error>}
        {loadingDelete && <Loading />}
        {error && <Error variant="danger">{error}</Error>}
        {loading && <Loading />}
        {notes
          ?.reverse()
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion key={note._id}>
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {" "}
                      {note.title}
                    </Accordion.Toggle>
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created On{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
      </MainScreen>
    </div>
  );
};

export default MyNote;

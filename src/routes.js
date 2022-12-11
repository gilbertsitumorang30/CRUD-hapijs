const {
  addNoteHandler,
  getAllNotesHandler,
  GetNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteById,
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: GetNoteByIdHandler,
  },
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteByIdHandler,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteById,
  },
];

module.exports = routes;

const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;

  const newNotes = {
    title,
    tags,
    body,
    id,
    createdAt,
    updateAt,
  };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "succsess",
      message: "Catatan berhasil ditambahakn",
      data: {
        noteId: id,
      },
    });
    response.code(201);

    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = (request, h) => ({
  status: "succes",
  data: {
    notes,
  },
});

const GetNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((note) => note.id === id)[0];

  if (note) {
    const response = h.response({
      status: "succes",
      message: "Catatan berhasil di lihat",
      data: {
        note,
      },
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal di lihat",
  });
  response.code(404);

  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updateAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);
  console.log("index", index);
  console.log("note", notes[index]);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      body,
      tags,
      updateAt,
    };
    const response = h.response({
      status: "succes",
      message: "Notes berhasil di update",
      data: notes[index],
    });

    console.log("note akhir", notes[index]);

    response.code = 201;
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "notes tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteById = (request, h) => {
  const { id } = request.params.id;
  const index = notes.findIndex((note) => note.id === id);
  console.log(notes);
  console.log("index", index);
  if (index > -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "succsess",
      message: "berhasil menghapus notes",
    });

    response.status = 200;
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "note tidak ditemukan",
  });

  response.status = 404;
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  GetNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteById,
};

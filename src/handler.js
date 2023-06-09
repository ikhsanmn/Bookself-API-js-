const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const createAt = new Date().toISOString();
  const updatedAt = createAt;
  let finished;
  if (readPage === pageCount) {
    finished = true;
  } else {
    finished = false;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    createAt,
    updatedAt,
  };

  books.push(newBook);

  // const isSuccess = books.filter((book) => book.id === id).length > 0;

  // books.push(finished);
  // const nameBook = books.filter((book) => book.name === name).length > 0;

  if (name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku.Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getAllBooksHandler = (request, h) => {
  /const { id } = request.params;

  // const book = books.filter((n) => n.id === id)[0];

  const { name, publisher } = request.payload;

  const response = h.response({
    status: 'success',
    data: {
      //books,
      books: {
        id,
        name,
        publisher,
      },
    },
  });
  response.code(200);
  return response;
};

const getBooksByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const ediiBooksByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    if (name === '') {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku.Mohon isi nama buku',
      });
      response.code(400);
      return response;
    } if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memeperbarui catatan. Id tidakk ditemukan',
  });
  response.code(404);
  return response;
};

// const deleteBookByIdHandler = (request, h) => {
//   const { id } = request.params;

//   const index = books.findIndex((book) => book.id === id);

//   if (index !== -1) {
//     books.splice(index, 1);
//     const response = h.response({
//       status: 'success',
//       message: 'Buku berhasil dihapus',
//     });
//     response.code(200);
//     return response;
//   }

//   const response = h.response({
//     staturs: 'fail',
//     message: 'Buku gagal dihapus. Id tidak ditemukan',
//   });
//   response.code(404);
//   return response;
// };

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  ediiBooksByIdHandler,
//  deleteBookByIdHandler,
};

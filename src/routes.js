const {
  addBookHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  ediiBooksByIdHandler,
  // deleteBookByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: ediiBooksByIdHandler,
  },
//   {
//     method: 'DELETE',
//     path: '/books/{id}',
//     handler: deleteBookByIdHandler,
//   },
];

module.exports = routes;

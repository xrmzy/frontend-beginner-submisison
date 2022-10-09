const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
});

function addBook() {
  const inputBookTitle = document.getElementById('inputBookTitle').value;
  const inputBookAuthor = document.getElementById('inputBookAuthor').value;
  const inputBookYear = document.getElementById('inputBookYear').value;
  // const timestamp = document.getElementById('data').value;

  const generateID = generateId();
  const todoObj = generateTObj(
    generateID,
    inputBookTitle,
    inputBookAuthor,
    inputBookYear,
    false);
  books.push(todoObj);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId() {
  return +new Date();
}

function generateTObj(
  id,
  title,
  author,
  year,
  isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(books);
});

document.addEventListener(RENDER_EVENT, function () {
  console.log(books);
  const incompletedBook = document.getElementById('incompletedBook');
  incompletedBook.innerHTML = "";

  const compeletedBook = document.getElementById('completedBook');
  compeletedBook.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) {
      incompletedBook.append(bookElement);
    } else {
      compeletedBook.append(bookElement);
    }
  }
});

function makeBook(todoObj) {
  const bookTitel = document.createElement('h2');
  bookTitel.innerText = todoObj.title;

  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = 'Author : ' + todoObj.author;

  const bookYear = document.createElement('p');
  bookYear.innerText = 'Year : ' + todoObj.year;


  // container
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('inner');
  bookContainer.append(bookTitel, bookAuthor, bookYear);

  const container = document.createElement('div');
  container.classList.add('item', 'shadow');
  container.append(bookContainer)
  container.setAttribute('id', `book-${todoObj.id}`);

  if (todoObj.isCompleted) {
    const undoButton = document.createElement('button');
    undoButton.classList.add('undoButton');
    undoButton.addEventListener('click', function () {
      undoBook(todoObj.id);
    });

    const trashButton = document.createElement('button');
    trashButton.classList.add('trashButton');
    trashButton.addEventListener('click', function () {
      removeBook(todoObj.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add('check-button');

    checkButton.addEventListener('click', function () {
      addToCompleted(todoObj.id);
    });

    container.append(checkButton);
  }
  return container;
}

function addToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function removeBook(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function undoBook(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }

  return -1;
}

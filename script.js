var myLibrary = [];
const newBookButton = document.querySelector('#add-book');
const closeDialog = document.querySelector('#close-dialog');
const addBookButton = document.querySelector('#add-book-button');
const form = document.querySelector("dialog form");
const dialog = document.querySelector("dialog");

function Book(title, author, pages, hasRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    Book.prototype.info = function() {
        return {
            title: this.title,
            author: this.author,
            pages: this.pages,
            hasRead: this.hasRead
        };
    };
    Book.prototype.toggleRead = function () {
        if(this.hasRead == "Yes"){
            this.hasRead = "No";
        } else if(this.hasRead == "No"){
            this.hasRead = "Yes";
        }
    };
}

function addBookToLibrary(title, author, pages, hasRead) {
    let book = new Book(title, author, pages, hasRead);
    myLibrary.push(book);
}

function displayBooks(bookArr) {
    const table = document.querySelector("tbody");    
    if(table.hasChildNodes()){
        while (table.firstChild) {
            table.removeChild(table.firstChild);
          }
    }
    bookArr.forEach(book => {
        let bookRow = document.createElement("tr");
        let { title, author, pages, hasRead } = book.info();

        let bookTitleCell = document.createElement("td");
        let bookAuthorCell = document.createElement("td");
        let bookPagesCell = document.createElement("td");
        let bookHasReadCell = document.createElement("td");
        let bookDeleteCell = document.createElement("td");
        let bookDeleteBtn = document.createElement("button");
        let bookToggleReadBtn = document.createElement("button");

        bookTitleCell.textContent = title;
        bookAuthorCell.textContent = author;
        bookPagesCell.textContent = pages;
        bookHasReadCell.textContent = hasRead;

        bookDeleteBtn.setAttribute("data-id", book.id);
        bookToggleReadBtn.setAttribute("data-id", book.id);
        bookToggleReadBtn.textContent = "Toggle Read";
        bookDeleteBtn.textContent = "Delete Book";
        bookDeleteBtn.addEventListener("click", () => {
            myLibrary = myLibrary.filter(book => book.id !== bookDeleteBtn.getAttribute("data-id"));
            displayBooks(myLibrary);
        })
        bookToggleReadBtn.addEventListener("click", () => {
            if(book.id === bookToggleReadBtn.getAttribute("data-id")){
                book.toggleRead();
                displayBooks(myLibrary);
            }
        })

        bookDeleteCell.append(bookDeleteBtn, bookToggleReadBtn);
        bookRow.append(bookTitleCell, bookAuthorCell, bookPagesCell, bookHasReadCell, bookDeleteCell);
        table.append(bookRow);
        dialog.close();
    });
}

newBookButton.addEventListener("click", () => {
    dialog.showModal();
})

closeDialog.addEventListener("click", () => {
    dialog.close();
})

form.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#book-author").value;
    const pages = document.querySelector("#book-pages").value;
    const hasRead = document.querySelector("#read-status").value;
    addBookToLibrary(title, author, pages, hasRead);
    displayBooks(myLibrary);
})


addBookToLibrary("My autobiography", "Lemz", 100, "Yes");
addBookToLibrary("48 Laws of Power", "Robert Green", 480, "Yes"); 
addBookToLibrary("The Courage to be Disliked", "Fumitake Koga", 277, "Yes");
addBookToLibrary(" The Courage to be Happy", "Fumitake Koga", 272, "Yes");

displayBooks(myLibrary);


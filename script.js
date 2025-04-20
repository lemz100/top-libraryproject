function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

    Book.info = function() {
        return(this.title + this.author + this.pages + this.hasRead);
    }
    console.log(Book.info);
}


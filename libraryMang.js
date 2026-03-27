class Library {
    constructor() {
        this.data = {
            books: [],
            users: []
        };
    }

    addBook(book) {
        this.data.books.push({
            id: book.id,
            name: book.name,
            author: book.author,
            available: true
        });
        return { status: "success", message: "Book added" };
    }

    addUser(user) {
        this.data.users.push({
            id: user.id,
            name: user.name,
            issuedBooks: []
        });
        return { status: "success", message: "User added" };
    }

    issueBook(payload) {
        let book = this.data.books.find(b => b.id === payload.bookId);
        let user = this.data.users.find(u => u.id === payload.userId);

        if (!book) return { status: "error", message: "Book not found" };
        if (!user) return { status: "error", message: "User not found" };
        if (!book.available) return { status: "error", message: "Book already issued" };

        book.available = false;
        user.issuedBooks.push(book.id);

        return {
            status: "success",
            message: "Book issued",
            data: { bookId: book.id, userId: user.id }
        };
    }

    returnBook(payload) {
        let book = this.data.books.find(b => b.id === payload.bookId);
        let user = this.data.users.find(u => u.id === payload.userId);

        if (!book || !user) return { status: "error", message: "Invalid data" };

        book.available = true;
        user.issuedBooks = user.issuedBooks.filter(id => id !== payload.bookId);

        return {
            status: "success",
            message: "Book returned",
            data: { bookId: book.id, userId: user.id }
        };
    }

    getAllBooks() {
        return {
            status: "success",
            data: this.data.books
        };
    }

    getAllUsers() {
        return {
            status: "success",
            data: this.data.users
        };
    }
}


const lib = new Library();

console.log(lib.addBook({ id: 1, name: "JavaScript", author: "John" }));
console.log(lib.addBook({ id: 2, name: "DSA", author: "Rahul" }));

console.log(lib.addUser({ id: 101, name: "Raushan" }));
console.log(lib.addUser({ id: 102, name: "Amit" }));

console.log(lib.issueBook({ bookId: 1, userId: 101 }));
console.log(lib.getAllBooks());

console.log(lib.returnBook({ bookId: 1, userId: 101 }));
console.log(lib.getAllBooks());
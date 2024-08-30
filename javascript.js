// Dialog Stuff
const addBookBtn = document.getElementById("show-book-dialog");
const bookDialog = document.getElementById("book-dialog");
const closeBookDialogBtn = document.getElementById("close-book-dialog");
const dialogOutputs = bookDialog.querySelectorAll("input");
const confirmBtn = bookDialog.querySelector("#dialog-confirm");

addBookBtn.addEventListener("click", (e) => {
	bookDialog.showModal();
});

confirmBtn.addEventListener("click", (event) => {
	event.preventDefault();

	const newBook = createBook();
	myLibrary.push(newBook);

	bookDialog.close(confirmBtn.value);
	dialogOutputs.forEach((input) => (input.value = ""));

	addBookToLibrary();
});

const bookContainer = document.querySelector(".book-container");
const myLibrary = [];

function Book(title, author, pageCount) {
	this.title = title;
	this.author = author;
	this.pageCount = pageCount;
}

function createBook() {
	let title = "";
	let author = "";
	let pageCount = "";

	dialogOutputs.forEach((input) => {
		switch (input.id) {
			case "title":
				title = input.value;
				break;
			case "author":
				author = input.value;
				break;
			case "pages":
				console.log(input.type);
				pageCount = input.value;
				break;
		}
	});

	return new Book(title, author, pageCount);
}

function addBookToLibrary() {
	bookContainer.innerHTML = ""; // Clear the container

	for (var i = 0; i < myLibrary.length; i++) {
		const book = myLibrary[i]; // Assume each book is an object with title, author, and pages properties

		// Create a fragment to hold the new elements
		const fragment = document.createDocumentFragment();

		// Create the book container
		const bookDiv = document.createElement("div");
		bookDiv.className = "book";
		bookDiv.id = `${i}`; // For deleting later

		// Create the title section
		const titleDiv = document.createElement("div");
		titleDiv.className = "flex-item";
		titleDiv.innerHTML = `<span class="bold">Title</span><span>${book.title}</span>`;

		// Create the author section
		const authorDiv = document.createElement("div");
		authorDiv.className = "flex-item";
		authorDiv.innerHTML = `<span class="bold">Author</span><span>${book.author}</span>`;

		// Create the pages section
		const pagesDiv = document.createElement("div");
		pagesDiv.className = "flex-item";
		pagesDiv.innerHTML = `<span class="bold"># of Pages</span><span>${book.pageCount}</span>`;

		// Create the button section
		const buttonDiv = document.createElement("div");
		buttonDiv.className = "flex-item";
		buttonDiv.innerHTML = `<button id="book-delete">DELETE</button><div></div>
		<button id="book-read">READ</button><div></div>`;

		// Append sections to the bookDiv
		bookDiv.appendChild(titleDiv);
		bookDiv.appendChild(authorDiv);
		bookDiv.appendChild(pagesDiv);
		bookDiv.appendChild(buttonDiv);

		// Append the bookDiv to the fragment
		fragment.appendChild(bookDiv);

		// Append the fragment to the container
		bookContainer.appendChild(fragment);
	}
}

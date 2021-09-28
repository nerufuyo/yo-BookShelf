// Local Storage 
const STORAGE_KEY = "BOOKSHELF_APP";
 
// General Array
let book_shelf = [];
 
// Checking Browser Support
function isStorageExist() {
   if(typeof(Storage) === undefined){
       alert("Browser kamu tidak mendukung local storage");
       return false
   }
   return true;
}
 
// Save to Storage
function saveData() {
   const parsed = JSON.stringify(book_shelf);
   localStorage.setItem(STORAGE_KEY, parsed);
   document.dispatchEvent(new Event("ondatasaved"));
}
 
// Load from Storage
function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   
   let data = JSON.parse(serializedData);
   
   if(data !== null)
        book_shelf = data;
 
   document.dispatchEvent(new Event("ondataloaded"));
}

// Update to Storage
function updateDataToStorage() {
   if(isStorageExist())
       saveData();
}
 
// Object Structure
function composeBookObject(title, author, year, isComplete) {
   return {
       id: +new Date(),
       title,
       author,
       year,
       isComplete
   };
}
 
// Book Id
function findBook(bookId) {
   for(book of book_shelf){
       if(book.id === bookId)
           return book;
   }
   return null;
}
 
// Book Index
function findBookIndex(bookId) {
   let index = 0
   for (book of book_shelf) {
       if(book.id === bookId)
           return index;
 
       index++;
   }
 
   return -1;
}

// Refresh Data 
function refreshDataFromBookshelf() {
    const listUncompleted = document.getElementById('not_finished_reading_list')
    let listCompleted = document.getElementById('finished_reading_list')
  
  
    for(book of book_shelf){
        const readingBook = cardBox(book.title, book.author, book.year, book.isComplete)
        readingBook[BOOK_ITEMID] = book.id
  
  
        if(book.isCompleted){
            listCompleted.append(readingBook)
        } else {
            listUncompleted.append(readingBook)
        }
    }
 }
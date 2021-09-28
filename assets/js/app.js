// General / Temporary Variable
const BOOK_ITEMID = "booksId";

// Loading Web
document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('add_main')

    submitForm.addEventListener('submit', function(event) {
        event.preventDefault()
        addBookDo()
    })

    if(isStorageExist()){
        loadDataFromStorage()
    }
})

document.addEventListener("ondatasaved", () => {
   console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBookshelf();
});

// Hamburger Menu 
const hamburgerMenu = document.querySelector('nav div.hamburger_menu')

hamburgerMenu.addEventListener('click', openBurger)

function openBurger() {
    const listMenu = document.querySelector('nav ul.list_menu')
    listMenu.classList.toggle('leftSide')
}

// Book Function 
function addBookDo() {
    const uncompletedReading = document.getElementById('not_finished_reading_list')
    const bookTitle = document.querySelector('section.left_section section.add_book form.add_main input.input_book_title').value
    const bookWriter = document.querySelector('section.left_section section.add_book form.add_main input.input_book_writer').value
    const bookPublicationYear = document.querySelector('section.left_section section.add_book form.add_main input.input_book_year').value
    const cardList = cardBox(bookTitle, bookWriter, bookPublicationYear, false)

    const bookObject = composeBookObject(bookTitle, bookWriter, bookPublicationYear, false)
  
    cardList[BOOK_ITEMID] = bookObject.id
    book_shelf.push(bookObject)
    
    uncompletedReading.append(cardList)
    updateDataToStorage()
}

// Card Add Function 
function cardBox(titleText, writerText, yearText, isComplete) {
    
    const booksTitle = document.createElement('h3')
    booksTitle.classList.add('book_titles')
    booksTitle.innerText = titleText

    const booksWriter = document.createElement('p')
    booksWriter.classList.add('book_writers')
    booksWriter.innerText = writerText


    const booksYear = document.createElement('p')
    booksYear.classList.add('book_years')
    booksYear.innerText = yearText

    const spaceBook = document.createElement('p')
    spaceBook.classList.add('space_book')
    spaceBook.innerText = ' | '

    const booksInfo = document.createElement('div')
    booksInfo.classList.add('book_info')
    booksInfo.append(booksWriter, spaceBook, booksYear)
    
    const bookItem = document.createElement('div')
    bookItem.classList.add('book_item')
    bookItem.append(booksTitle, booksInfo)

    const buttonItem = document.createElement('div')
    buttonItem.classList.add('button_item')

    const bookList = document.createElement('div')
    bookList.classList.add('book_list')
    bookList.append(bookItem, buttonItem)

    if(isComplete) {
        bookList.append(
            createOnGoingButton(),
            createDeleteButton() 
        )
    } else {
        bookList.append(
            createFinishedButton(),
            createDeleteButton()
        )
    }
    return bookList
}

// Action Button 
function buttonCompleteAction(buttonTypeClass, eventListener) {
    const completeButton = document.createElement('button')
    completeButton.classList.add(buttonTypeClass)
    completeButton.style.background = 'url("./assets/svg/check_icon.svg")'
    completeButton.addEventListener('click', function(event) {
        eventListener(event)
    })
    
    return completeButton
}

function buttonDeleteAction(buttonTypeClass, eventListener) {
    const deleteButton = document.createElement('button')
    deleteButton.classList.add(buttonTypeClass)
    deleteButton.style.background = 'url("./assets/svg/delete_icon.svg")'
    deleteButton.addEventListener('click', function(event) {
        eventListener(event)
    })
    
    return deleteButton
}

function buttonOnGoingAction(buttonTypeClass, eventListener) {
    const onGoingButton = document.createElement('button')
    onGoingButton.classList.add(buttonTypeClass)
    onGoingButton.style.background = 'url("./assets/svg/ongoing_icon.svg")'
    onGoingButton.addEventListener('click', function(event) {
        eventListener(event)
    })
    
    return onGoingButton
}

// Reading Status 
function finishedReading(readList) {
    const booksTitle = readList.querySelector('div.book_list div.book_item h3').innerText
    const booksWriter = readList.querySelector('div.book_list div.book_item div.book_info p.book_writers').innerText
    const booksYear = readList.querySelector('div.book_list div.book_item div.book_info p.book_years').innerText
    const finishedReading = document.getElementById('finished_reading_list')

    const readingBook = cardBox(booksTitle, booksWriter, booksYear, true)
    const book = findBook(readList[BOOK_ITEMID])

    book.isCompleted = true
    readingBook[BOOK_ITEMID] = book.id

    finishedReading.append(readingBook)
    readList.remove()

    updateDataToStorage();
}

function deleteReading(readList) {
    const bookPosition = findBookIndex(readList[BOOK_ITEMID])
    book_shelf.splice(bookPosition, 1)

    readList.remove()
    updateDataToStorage()
}

function onGoingReading(readList) {
    const booksTitle = readList.querySelector('div.book_list div.book_item h3').innerText
    const booksWriter = readList.querySelector('div.book_list div.book_item div.book_info p.book_writers').innerText
    const booksYear = readList.querySelector('div.book_list div.book_item div.book_info p.book_years').innerText
    const onGoingReading = document.getElementById('not_finished_reading_list')

    const readingBook = cardBox(booksTitle, booksWriter, booksYear, false)
    const book = findBook(readList[BOOK_ITEMID])
    book.isCompleted = false
    readingBook[BOOK_ITEMID] = book.id

    onGoingReading.append(readingBook)
    readList.remove()

    updateDataToStorage()
}

// Create Button
function createFinishedButton() {
    return buttonCompleteAction("finished_button", function(event) {
        finishedReading(event.target.parentElement);
    });
}

function createDeleteButton() {
    return buttonDeleteAction('delete_button', function(event) {
        deleteReading(event.target.parentElement)
    })
}

function createOnGoingButton() {
    return buttonOnGoingAction('ongoing_button', function(event) {
        onGoingReading(event.target.parentElement)
    })
}

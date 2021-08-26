import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Library from './Library'
import Search from './Search'
import {Route, Switch} from 'react-router-dom'
class BooksApp extends React.Component {
  state={
    books:[],
    currentlyReading:[],
    wantToRead:[],
    read:[]
  }
  setShelves = (books) =>{
    const currentlyReading = books.filter(b => b.shelf === "currentlyReading")
    const wantToRead = books.filter(b => b.shelf === "wantToRead")
    const read = books.filter(b => b.shelf === "read")
    this.setState({
      books:books,
      currentlyReading:currentlyReading,
      wantToRead:wantToRead,
      read:read
    })
  }
  async componentDidMount(){
    try{
      const books = await BooksAPI.getAll(); //get books that exists in our library
      this.setShelves(books) //set the shelves as catogories
    }
    catch(error){
      alert("Bad Network Connection, refresh the page")
    }
  }
  async changeAPI(book){ //update the book shelf in the server
      await  BooksAPI.update(book, book.shelf)
  }
  moveBook = (book) => { //used inside book to change it's
    //shelf (in the the library books, not in the search books)
      
    this.changeAPI(book)//change shelf in the server
     //create array returns all old existing books, but replace the changed book with
          //a new object with different chosen shelf
    const books = this.state.books.map(b => b.id === book.id 
          ? book : b);
      
      //set the shelves again to move the book (setShelves contains setState, so
      //the page will re-render again after re-organizing shelves)
      this.setShelves(books); 
  }
  addBookFromSearch =(b) =>{//will handle changing a book's options in the search results
    
    this.changeAPI(b) //change the books shelf in the books server
    
    /*if the changed book (from search) was existing in our library,
    then it will be removed from our library, then added again (to handle shelf changing):*/
    let books = this.state.books.filter(book => book.id !== b.id ? book : b);
    books = [...books, b];
    //categorize and re-render the page again:
    this.setShelves(books)

  }
  render() {
    return (
        <div className="app">
            <Switch>
                <Route exact path={'/'} render={
                  ()=><Library books = {this.state.books} 
                  currentlyReading={this.state.currentlyReading}
                  wantToRead={this.state.wantToRead}
                  read={this.state.read}
                  moveBook={this.moveBook}
                  />
                }/>
                <Route exact path={'/Search'} render={
                  ()=><Search
                  existingBooks={this.state.books}
                  addBookFromSearch={this.addBookFromSearch}
                  changeAPI={this.changeAPI}
                  moveBook={this.moveBook}
                  />
                }/>
            </Switch>
          </div>
      
    )
  }
}

export default BooksApp
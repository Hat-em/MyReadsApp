import React from 'react'
import './App.css'
import Shelf from './Shelf'
import {Link} from 'react-router-dom'
class Library extends React.Component {
    state = {
        books:[],
        currentlyReading:[],
        wantToRead:[],
        read:[]
    }
    getHeader = () => {
      //if the books did not load yet, show loading header:
        return this.props.books.length === 0 ? "loading" : "MyBooks"
    }
   
    render() {
         let header = this.getHeader();
        return (
          <div className="list-books"> 
          <div className="list-books-title">  
          <h1>{header}</h1>
          </div>
          <div className="list-books-content">

            <Shelf name = "Currently Reading" shelfBooks = {this.props.currentlyReading} moveBook = {this.props.moveBook}/>
            <Shelf name = "Want To Read" shelfBooks = {this.props.wantToRead} moveBook = {this.props.moveBook} />
            <Shelf name = "Read" shelfBooks = {this.props.read} moveBook = {this.props.moveBook} />
          </div>
          <Link to={'/search'} className="open-search"><button>Add a book</button></Link>

          </div>
        )
      }
}

export default Library
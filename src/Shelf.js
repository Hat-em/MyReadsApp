import React from 'react'
import Book from './Book'
class Shelf extends React.Component{
    //note that there is no need to use state for this component because all 
    //data are passed and used directly through the props (from the books component)
    render(){
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.props.shelfBooks!==undefined?this.props.shelfBooks.map(book =>
                         <Book 
                         key={book.id} 
                         book = {book}  
                         moveBook = {this.props.moveBook}/>):false}
                    </ol>
                  </div>
                </div>
        )
    }
}
export default Shelf;
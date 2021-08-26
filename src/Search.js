import React from 'react'
import {Link} from 'react-router-dom'
import {search} from './BooksAPI'
import Book from './Book'
class Search extends React.Component{
    state = {
        result:[],
        notFound:"'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'"
    }
    execute = async (eve) => {
      let found = []
      if(eve.target.value.length>0){
        found = await search(eve.target.value);
      }
      if(found !== undefined && found.length > 0){
            //if a book from the search exists in our library, return the existing
            //version (to display that it's in our shelves):
            found = found.map(
                book=>{
                    book.shelf='none';
                    //find an existing book with same id as the new found one
                    let existingBook =
                    this.props.existingBooks.find(b => b.id === book.id)
                    //if found an old book, merge between two books, but override the 
                    //book in search with the book in library
                    return existingBook ? {...book, ...existingBook} : book;
                }
            )
            this.setState({result:found})
        }
        else{
          this.setState({result:[]})
        }
    }
    render(){
        return(
            <div className="search-books">  
            <div className="search-books-bar">
              <Link className="close-search" to={'/'}>Close</Link>
              <div className="search-books-input-wrapper">
                {
                /*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.execute}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  
                {
                    this.state.result.length > 0?
                this.state.result.map( b => <Book 
                                    key = {b.id} 
                                    book = {b} 
                                    addBookFromSearch={this.props.addBookFromSearch}
                                    changeAPI={this.props.changeAPI}
                                    cameFromSearch={true}
                                    />) 
                :
                 <p style={{fontSize:"0.9em", color:"white"}}>categories:<br/>{this.state.notFound}</p>
                }
              </ol>
            </div>
          </div>
        )
    }
}
export default Search
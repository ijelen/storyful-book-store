import React, { useState } from "react";
// @ts-ignore
import { Book, books, discounts } from "./data/index.ts";

const App = () => {
  const [basket, setBasket] = useState([]);

  const addBook = (id: String) => {
    setBasket([...basket, id]);
  };

  const getTotal = () => {
    const basketArrangedIntoSets = basket.reduce(
      (previousValue: Array<any>, currentValue: String) => {
        // previousValue is an Array of Sets
        for (let setOfBooks of previousValue) {
          // see if this book set doesn't contain this book: currentValue
          if (!setOfBooks.has(currentValue)) {
            setOfBooks.add(currentValue);
            return [...previousValue];
          }
        }
        return [...previousValue, new Set([currentValue])];
      },
      []
    );

    const total: number = basketArrangedIntoSets.reduce(
      (previousValue: number, currentValue) => {
        // In case there are more than 5 books in the series give them discount as if there are just 5
        const sizeOfBookSet = currentValue.size < 6 ? currentValue.size : 5;
        const bookSetDiscount = discounts[sizeOfBookSet] || 0;
        // Convert set to array in order to use reduce
        const bookSetConvertedIntoArray = Array.from(currentValue);
        const bookSetTotal = bookSetConvertedIntoArray.reduce(
          (previousValue: number, currentValue) => {
            const foundFullBook: Book = books.find(
              (book: Book) => book.id === currentValue
            );
            return previousValue + foundFullBook.price;
          },
          0
        ) as number;
        // Apply discount to bookSetTotal
        // bookSetDiscount is a percentage applied
        const appliedDiscount =
          bookSetTotal - bookSetDiscount * (bookSetTotal / 100);
        return previousValue + appliedDiscount;
      },
      0
    );

    return total;
  };

  interface countedBook {
    id: string;
    count: number;
  }
  const getListOfBooks = () => {
    const countedBooks: countedBook[] = basket.reduce(
      (previousValue: Array<any>, currentValue: string) => {
        for (let countedObject of previousValue) {
          // see if this is the object (countedBook) for the current book (currentValue)
          if (countedObject.id === currentValue) {
            // if it is, increment its count and exit the loop
            countedObject.count = countedObject.count + 1;
            return previousValue;
          }
        }
        return [...previousValue, { id: currentValue, count: 1 }];
      },
      []
    );
    interface countedBookWithTitle {
      id: string;
      count: number;
      title: string;
    }
    const countedBooksWithTitles: countedBookWithTitle[] = countedBooks.map(
      (book: countedBook): countedBookWithTitle => {
        // Find the title in the books (/data/index.js)
        const bookRecord: Book = books.find(
          (fullBook: Book) => fullBook.id === book.id
        );

        return Object.assign(book, { title: bookRecord.title });
      }
    );
    return countedBooksWithTitles;
  };

  return (
    <div className="ui container" style={{ marginTop: "3rem" }}>
      <h1 className="ui header">Option two: Book Store</h1>
      <p>
        To try and encourage more sales of different books from a popular 5 book
        series, a bookshop has decided to offer discounts on multiple book
        purchases.
      </p>
      <p>
        One copy of any of the five books costs $8. If, however, you buy two
        different books, you get a 5% discount on those two books. If you buy 3
        different books, you get a 10% discount. If you buy 4 different books,
        you get a 20% discount. If you buy all 5, you get a 25% discount.
      </p>
      <p>
        Note that if you buy four books, of which 3 are different titles, you
        get a 10% discount on the 3 that form part of a set, but the fourth book
        still costs $8.
      </p>
      <p>
        Your mission is to write a piece of code to calculate the price of any
        conceivable shopping basket (containing only books of the same series),
        giving as big a discount as possible.
      </p>
      <p>For example, how much does this basket of books cost?</p>
      <p>
        2 copies of the first book 2 copies of the second book 2 copies of the
        third book 1 copy of the fourth book 1 copy of the fifth book
      </p>
      <div className="ui divider" style={{ marginBottom: "3rem" }}></div>

      <div className="ui grid container">
        <div className="twelve wide column">
          <div id="books" className="ui cards">
            {books.map((book: Book) => (
              <div key={book.id} className="card" style={{ width: "18%" }}>
                <div className="content">
                  <div className="header">{book.title}</div>
                  <div className="bookImage">
                    <img
                      src={`${book.image}/c2d7ec/000000?text=${book.title}`}
                      alt={book.description}
                      style={{ width: "100%", margin: "1rem auto" }}
                    />
                  </div>
                  <div className="description">{book.description}</div>
                  <div className="price">$ {book.price}</div>
                </div>
                <div
                  className="ui bottom attached button"
                  onClick={() => {
                    addBook(book.id);
                  }}
                >
                  <i className="add icon"></i>
                  Add Book
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="four wide column">
          <div className="ui cards">
            <div className="card">
              <div className="content">
                <div className="header">Shopping Basket</div>
                <div className="description">
                  {getListOfBooks().map((book) => (
                    <p
                      key={book.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{book.title}</span>
                      <span> x {book.count}</span>
                    </p>
                  ))}
                </div>
              </div>
              <div className="ui bottom attached button">
                Total: $ {getTotal()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

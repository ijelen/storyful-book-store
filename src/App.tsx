import React, { useState, useEffect } from "react";
import books from "./data/books.ts";
import { Book } from "./data/books";

const App = () => {
  const [basket, setBasket] = useState([]);

  const addBook = (id: String) => {
    setBasket([...basket, id]);
  };

  useEffect(() => {
    console.log(getTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basket]);

  const getTotal = () => {
    const basketArrangedIntoSets = basket.reduce(
      (previousValue: Array<any>, currentValue: String) => {
        // previousValue is an Array of Sets
        let bookAdded = false;
        for (let setOfBooks of previousValue) {
          // see if this book set contains this book: currentValue
          if (!setOfBooks.has(currentValue)) {
            setOfBooks.add(currentValue);
            bookAdded = true;
            break;
          }
        }
        if (!bookAdded) {
          return [...previousValue, new Set([currentValue])];
        } else {
          return previousValue;
        }
      },
      []
    );
    return basketArrangedIntoSets;
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
        <div className="four wide column" style={{ backgroundColor: "#ddd" }}>
          <div className="ui cards">
            <div className="card">
              <div className="content">
                <div className="header">Shopping Basket</div>
                <div className="description">{basket.join(" ")}</div>
              </div>
              <div className="ui bottom attached button">Total: ??</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

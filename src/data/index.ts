export interface Book {
  id: string;
  title: string;
  image: string;
  description: string;
  price: number;
}

export const books: Book[] = [
  {
    id: "a",
    title: "Book 1 Title",
    image: "https://via.placeholder.com/200x260.png",
    description: "Book 1 Description",
    price: 8,
  },
  {
    id: "b",
    title: "Book 2 Title",
    image: "https://via.placeholder.com/200x260.png",
    description: "Book 2 Description",
    price: 8,
  },
  {
    id: "c",
    title: "Book 3 Title",
    image: "https://via.placeholder.com/200x260.png",
    description: "Book 3 Description",
    price: 8,
  },
  {
    id: "d",
    title: "Book 4 Title",
    image: "https://via.placeholder.com/200x260.png",
    description: "Book 4 Description",
    price: 8,
  },
  {
    id: "e",
    title: "Book 5 Title",
    image: "https://via.placeholder.com/200x260.png",
    description: "Book 5 Description",
    price: 8,
  },
];

export interface Discount {
  [propName: number]: number;
}

export const discounts: Discount = {
  1: 0,
  2: 5,
  3: 10,
  4: 20,
  5: 25,
};

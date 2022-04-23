/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("A visitor", function () {
  it("loads the book store", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Option two: Book Store");
    cy.contains("Shopping Basket");
  });

  it("puts in the basket: 2 copies of the first book, 2 copies of the second book, 2 copies of the third book, 1 copy of the fourth book and 1 copy of the fifth book (the total is $51.6)", () => {
    // 2 copies of the first book
    cy.get(".cards .button").eq(0).click();
    cy.get(".cards .button").eq(0).click();
    // 2 copies of the second book
    cy.get(".cards .button").eq(1).click();
    cy.get(".cards .button").eq(1).click();
    // 2 copies of the third book
    cy.get(".cards .button").eq(2).click();
    cy.get(".cards .button").eq(2).click();
    // 1 copy of the fourth book
    cy.get(".cards .button").eq(3).click();
    // 1 copy of the fifth book
    cy.get(".cards .button").eq(4).click();
    // it should cost $ 51.6: 1 set of 5 books with 25% discount and 1 set of 3 books with 10% discount
    cy.contains("Shopping Basket").parent().parent().contains("51.6");
  });

  it("empties the shopping basket", () => {
    cy.contains("Empty basket").click();
    cy.contains("Empty basket").should("not.exist");
  });
});

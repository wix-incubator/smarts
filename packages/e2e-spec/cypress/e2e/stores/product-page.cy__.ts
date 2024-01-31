describe("product page", () => {
  beforeEach(() => {
    cy.visit(
      "http://localhost:3000/server/store/products/acme-circles-t-shirt",
    );
    // wait for hydration sadly
    cy.wait(200);
  });

  it("should display the product page components", () => {
    container("ProductTitle").should("contain", "Acme Circles T-Shirt");

    container("ProductDescription").should(
      "contain",
      "60% combed ringspun cotton/40% polyester jersey tee.",
    );

    container("ProductPrice").should("contain", "€20.00");

    container("ProductMainMedia")
      .findByAltText("t-shirt-circles-blue.png")
      .should(
        "have.attr",
        "src",
        "https://static.wixstatic.com/media/8dfd06_3e3feaf389cf47fd9c781e5977a89c3d~mv2.png/v1/fit/w_3023,h_3000,q_90/file.png",
      );

    container("ProductMediaItems")
      .findByAltText("t-shirt-circles-blue.png")
      .should(
        "have.attr",
        "src",
        "https://static.wixstatic.com/media/8dfd06_3e3feaf389cf47fd9c781e5977a89c3d~mv2.png/v1/fit/w_3023,h_3000,q_90/file.png",
      );

    container("ProductMediaItems")
      .findByAltText("t-shirt-circles-white.png")
      .should(
        "have.attr",
        "src",
        "https://static.wixstatic.com/media/8dfd06_e7fbbb177afd4ec086f479a72cdccecc~mv2.png/v1/fit/w_3023,h_3000,q_90/file.png",
      );

    container("ProductMediaItems")
      .findByAltText("t-shirt-circles-black.png")
      .should(
        "have.attr",
        "src",
        "https://static.wixstatic.com/media/8dfd06_99d45fc8dafa4f06835fffa4ac83e209~mv2.png/v1/fit/w_3023,h_3000,q_90/file.png",
      );

    container("SelectedProductVariantProvider").should("exist");

    container("ProductVariantSelector")
      .findByRole("group", { name: "Color" })
      .findAllByRole("radio")
      .should(($size) => {
        expect($size).to.have.length(3);

        [
          { label: "Black" },
          { label: "White" },
          { label: "Blue", disabled: true },
        ].forEach(({ label, disabled }, index) => {
          if (disabled) {
            expect($size.eq(index)).to.have.attr("disabled");
          } else {
            expect($size.eq(index)).not.to.have.attr("disabled");
          }

          expect(
            Cypress.$(`label[for="${$size.eq(index).attr("id")}"]`),
          ).to.contain(label);
        });
      });

    container("ProductVariantSelector")
      .findByRole("group", { name: "Size" })
      .findAllByRole("radio")
      .should(($size) => {
        expect($size).to.have.length(7);

        ["XS", "S", "M", "L", "XL", "XXL", "XXXL"].forEach((size, index) => {
          expect(
            Cypress.$(`label[for="${$size.eq(index).attr("id")}"]`),
          ).to.contain(size);
        });
      });

    container("AddToCurrentCartQuantitySelector")
      .findByRole("spinbutton")
      .should("have.value", "1");

    container("AddProductVariantToCartButton")
      .findByRole("button")
      .should("be.disabled")
      .should("contain", "Add to cart");

    container("ProductVariantSelector")
      .findByRole("group", { name: "Color" })
      .findByRole("radio", { name: "Black" })
      .click();

    container("ProductVariantSelector")
      .findByRole("group", { name: "Size" })
      .findByLabelText("M")
      .should("be.disabled");

    container("ProductVariantSelector")
      .findByRole("group", { name: "Size" })
      .findByRole("radio", { name: "L" })
      .click();

    container("ProductVariantSelector")
      .findByRole("group", { name: "Color" })
      .findByLabelText("White")
      .should("be.disabled");

    container("AddToCurrentCartQuantitySelector")
      .findByRole("spinbutton")
      .type("{backspace}2");
  });
});

function container(name: string) {
  return cy.findByRole("group", {
    name,
  });
}

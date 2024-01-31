describe("session management", () => {
  it("should persist Wix session across requests", () => {
    cy.visit("http://localhost:3000/session-management");
    cy.getCookie("wix-refresh-token")
      .should("exist")
      .then((cookie) => {
        const refreshToken = cookie.value;
        cy.visit("http://localhost:3000/session-management");
        cy.getCookie("wix-refresh-token").should(
          "have.a.property",
          "value",
          refreshToken,
        );
      });
  });
});

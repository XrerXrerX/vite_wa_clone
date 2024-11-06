/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when Email address is empty
 *   - should display alert when password is empty
 *   - should display alert when Email address and password are wrong
 *   - should display homepage when Email address and password are correct
 */

describe('LoginPage Component', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:5173/'); // Adjust the URL if necessary
  });

  it('should render the login form correctly', () => {
    // Check if the title is visible
    cy.get('.title-group-form').should('contain', 'Login to Your Account');

    // Check if the email input is visible
    cy.get('input[placeholder="Email address"]').should('be.visible');

    // Check if the password input is visible
    cy.get('input[placeholder="Password"]').should('be.visible');

    // Check if the login button is visible
    cy.get('button').contains(/^Login$/).should('be.visible');

    // Check if the register link is visible
    cy.get('.form-group-text-bottom-link').should('be.visible');
  });

  it('should display an alert when email address is empty', () => {
    cy.get('button').contains(/^Login$/).click(); // Attempt to log in with empty fields
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Email address cannot be empty'); // Expect the alert for empty email
    });
  });

  it('should display an alert when password is empty', () => {
    cy.get('input[placeholder="Email address"]').type('testuser'); // Fill in email
    cy.get('button').contains(/^Login$/).click(); // Attempt to log in without password
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Password cannot be empty'); // Expect the alert for empty password
    });
  });

  it('should display alert when email and password are wrong', () => {
    // Fill in incorrect email and password
    cy.get('input[placeholder="Email address"]').type('wronguser@gmail.com');
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // Click the login button
    cy.get('button').contains(/^Login$/).click();

    // Expect alert for incorrect email or password
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong'); // Adjust the message to match your API response
    });
  });

  it('should display homepage when email and password are correct', () => {
    // Fill in correct email and password
    cy.get('input[placeholder="Email address"]').type('jakakaka66@gmail.com');
    cy.get('input[placeholder="Password"]').type('jakakaka66');

    // Click the login button
    cy.get('button').contains(/^Login$/).click();
  });

  it('should navigate to register page when register link is clicked', () => {
    cy.get('.form-group-text-bottom-link').click(); // Click on the register link
    cy.url().should('include', '/register'); // Assert that the URL contains '/register'
  });
});

/// <reference types="cypress" />

/**
 * E2E: Checkout Flow
 *
 * Stubs GET /api/menu so cart items are predictable.
 * Stubs POST /api/orders to avoid real payment processing.
 *
 * Covers: order summary, form validation, order-type-specific UI,
 *         and successful form completion.
 */
describe('Checkout Flow', () => {
  const addItemsAndGoToCheckout = (count = 1) => {
    cy.intercept('GET', '/api/menu*', { fixture: 'menu.json' }).as('getMenu');
    cy.visit('/menu');
    cy.wait('@getMenu');
    for (let i = 0; i < count; i++) {
      cy.get('[data-cy="menu-item"]').eq(i).contains('button', 'Add').click();
    }
    cy.visit('/checkout');
  };

  // ── Order summary ──────────────────────────────────────────────────────────

  it('displays added items in the order summary', () => {
    addItemsAndGoToCheckout(1);
    cy.get('[data-cy="cart-item"]').should('have.length', 1);
  });

  it('shows all items when multiple are added', () => {
    addItemsAndGoToCheckout(3);
    cy.get('[data-cy="cart-item"]').should('have.length', 3);
  });

  it('shows the order total element', () => {
    addItemsAndGoToCheckout(1);
    cy.get('[data-cy="order-total"]').should('exist').and('contain', '£');
  });

  it('shows the correct price for each item', () => {
    addItemsAndGoToCheckout(1);
    cy.get('[data-cy="item-price"]').first().should('contain', '£');
  });

  // ── Order type selection ───────────────────────────────────────────────────

  it('shows Pickup Time input when Takeaway is selected', () => {
    addItemsAndGoToCheckout(1);
    cy.get('select[name="orderType"]').select('pickup');
    cy.get('[data-cy="pickup-time"]').should('be.visible');
  });

  it('shows Delivery address textarea when Delivery is selected', () => {
    addItemsAndGoToCheckout(1);
    cy.get('select[name="orderType"]').select('delivery');
    cy.get('textarea[name="address"]').should('be.visible');
  });

  it('shows Table Selection dropdown when Dine-in is selected', () => {
    addItemsAndGoToCheckout(1);
    cy.get('select[name="orderType"]').select('dine-in');
    cy.get('[data-cy="table-selection"]').should('be.visible');
  });

  it('hides address textarea when Pickup is selected after Delivery', () => {
    addItemsAndGoToCheckout(1);
    cy.get('select[name="orderType"]').select('delivery');
    cy.get('textarea[name="address"]').should('be.visible');
    cy.get('select[name="orderType"]').select('pickup');
    cy.get('textarea[name="address"]').should('not.exist');
  });

  // ── Form validation ────────────────────────────────────────────────────────

  it('shows required-field errors when the form is submitted empty', () => {
    addItemsAndGoToCheckout(1);
    cy.contains('button', 'Pay with Stripe').click();
    cy.contains('Customer name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
  });

  it('shows an email-format error for an invalid email', () => {
    addItemsAndGoToCheckout(1);
    cy.get('input[name="customerName"]').type('Test User');
    cy.get('input[name="email"]').type('not-an-email');
    cy.get('input[name="phone"]').type('07700900123');
    cy.contains('button', 'Pay with Stripe').click();
    cy.contains('Invalid email format').should('be.visible');
  });

  it('requires a delivery address when Delivery order type is chosen', () => {
    addItemsAndGoToCheckout(1);
    cy.get('select[name="orderType"]').select('delivery');
    cy.get('input[name="customerName"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="phone"]').type('07700900123');
    cy.contains('button', 'Pay with Stripe').click();
    cy.contains('Delivery address is required').should('be.visible');
  });

  // ── Valid form completion ──────────────────────────────────────────────────

  it('enables the Pay button once valid details are entered', () => {
    addItemsAndGoToCheckout(1);
    cy.get('input[name="customerName"]').type('Jane Doe');
    cy.get('input[name="email"]').type('jane@example.com');
    cy.get('input[name="phone"]').type('07700900123');
    cy.contains('button', 'Pay with Stripe').should('not.be.disabled');
  });

  it('shows no validation errors after filling all required fields correctly', () => {
    addItemsAndGoToCheckout(1);
    cy.get('input[name="customerName"]').type('Ahmed Hassan');
    cy.get('input[name="email"]').type('ahmed@example.com');
    cy.get('input[name="phone"]').type('07700900456');
    cy.contains('Customer name is required').should('not.exist');
    cy.contains('Email is required').should('not.exist');
  });

  // ── Navigation ─────────────────────────────────────────────────────────────

  it('navigates back to the menu when "Back to Menu" is clicked', () => {
    addItemsAndGoToCheckout(1);
    cy.contains('button', 'Back to Menu').click();
    cy.url().should('include', '/menu');
  });
});

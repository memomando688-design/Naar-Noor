/**
 * ReservationPage Page Object
 * Encapsulates UI interactions for reservation workflow
 */

export class ReservationPage {
  /**
   * Navigate to reservations page
   */
  static visit() {
    cy.visit('/reservations');
  }

  /**
   * Get chef card at index
   */
  static getChefCard(index: number = 0) {
    return cy.get('[data-cy="chef-card"]').eq(index);
  }

  /**
   * Click chef to view details
   */
  static selectChef(index: number = 0) {
    this.getChefCard(index).click();
  }

  /**
   * Set reservation date
   */
  static setDate(date: string) {
    cy.get('input[name="date"]').type(date);
  }

  /**
   * Set reservation time
   */
  static setTime(time: string) {
    cy.get('input[name="time"]').type(time);
  }

  /**
   * Set guest count
   */
  static setGuestCount(count: number) {
    cy.get('input[name="guestCount"]').type(count.toString());
  }

  /**
   * Set special requests
   */
  static setSpecialRequests(requests: string) {
    cy.get('input[name="specialRequests"]').type(requests);
  }

  /**
   * Submit reservation form
   */
  static submitReservation() {
    cy.get('button[type="submit"]').click();
  }

  /**
   * Verify reservation confirmation
   */
  static verifyConfirmation() {
    cy.get('[data-cy="reservation-confirmation"]').should('exist');
    cy.contains('Reservation confirmed').should('exist');
  }

  /**
   * Get confirmation number
   */
  static getConfirmationNumber() {
    return cy.get('[data-cy="confirmation-number"]');
  }

  /**
   * Verify error message
   */
  static verifyErrorMessage(field: string, message: string) {
    cy.get(`[data-cy="error-${field}"]`).should('contain', message);
  }

  /**
   * Complete full reservation
   */
  static completeReservation(date: string, time: string, guestCount: number, requests?: string) {
    this.setDate(date);
    this.setTime(time);
    this.setGuestCount(guestCount);
    if (requests) {
      this.setSpecialRequests(requests);
    }
    this.submitReservation();
    this.verifyConfirmation();
  }
}

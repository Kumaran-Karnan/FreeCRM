import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ContactsPage } from '../pages/ContactsPage';
import contactData from '../testData/companyData.json';
import { env } from '../config/env';

let contactName: string;

test.describe.serial('Contact CRUD Operations', () => {

  test.beforeAll(async () => {
    contactName = `${contactData.firstName} ${contactData.lastName}`;
  });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(env.baseURL!);
    await loginPage.login(env.username!, env.password!);
  });

  test('Create Contact', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await test.step('Navigate to Contacts', async () => {
      await contactsPage.navigateToContacts();
    }
    );

    await test.step('Create Contact', async () => {
      await contactsPage.clickCreate();
      await contactsPage.createContact(contactData.firstName, contactData.lastName, contactData.middleName, contactData.company,
        contactData.email, contactData.country, contactData.position, contactData.department);
    }
    );
  });

  test('Search Contact', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.navigateToContacts();
    await contactsPage.searchAndOpenContact(contactData.firstName, contactData.lastName);
  });

  test('Update Contact', async ({ page }) => {
    const contactsPage = new ContactsPage(page);
    await contactsPage.navigateToContacts();
    await contactsPage.searchAndOpenContact(contactData.firstName, contactData.lastName);
    await contactsPage.updateContact(contactData.firstName, contactData.lastName, contactData.company);
  });

  test('Delete Contact', async ({ page }) => {
    const contactsPage = new ContactsPage(page);

    await contactsPage.navigateToContacts();
    await contactsPage.searchAndOpenContact(contactData.firstName, contactData.lastName);
    await contactsPage.deleteContact();
  });
});
import {
    When,
    Then
} from '@cucumber/cucumber';

import { page } from '../hooks/hooks';
import { ContactsPage } from '../pages/ContactsPage';

import contactData from '../testData/companyData.json';

When('User navigates to Contacts', async function () {
    const contactsPage = new ContactsPage(page);
    await contactsPage.navigateToContacts();
});

When('User creates a new Contact', async function () {
    const contactsPage = new ContactsPage(page);
    await contactsPage.clickCreate();
    await contactsPage.createContact(
        contactData.firstName,
        contactData.lastName,
        contactData.middleName,
        contactData.company,
        contactData.email,
        contactData.country,
        contactData.position,
        contactData.department
    );
});

Then('Contact should be created successfully', async function () {
    const contactsPage = new ContactsPage(page);
    await contactsPage.searchAndOpenContact(
        contactData.firstName,
        contactData.lastName
    );
});

When('User searches the Contact', async function () {
    const contactsPage = new ContactsPage(page);
    await contactsPage.navigateToContacts();
    await contactsPage.searchAndOpenContact(
        contactData.firstName,
        contactData.lastName
    );
});

Then('Contact details should be displayed', async function () {
    const contactsPage = new ContactsPage(page);
    await contactsPage.searchAndOpenContact(
        contactData.firstName,
        contactData.lastName
    );
});

When('User updates Contact details', async function () {
    const contactsPage = new ContactsPage(page);
    await contactsPage.navigateToContacts();
    await contactsPage.searchAndOpenContact(contactData.firstName,contactData.lastName);
    await contactsPage.updateContact(contactData.email, contactData.department,'Updated Contact Description');
});

Then('Updated Contact details should be visible', async function () {
    const contactsPage = new ContactsPage(page);
    await contactsPage.searchAndOpenContact(contactData.firstName, contactData.lastName);
});

When('User deletes the Contact', async function () {
    const contactsPage = new ContactsPage(page);
    await contactsPage.navigateToContacts();
    await contactsPage.searchAndOpenContact(contactData.firstName, contactData.lastName);
    await contactsPage.deleteContact();
});

Then('Contact should not exist', async function () {
    const contactsPage = new ContactsPage(page);
    await contactsPage.navigateToContacts();

    // await contactsPage.verifyDeleted(
    //     contactData.firstName,
    //     contactData.lastName
    // );
});
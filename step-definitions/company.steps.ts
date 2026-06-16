import {
    When,
    Then
} from '@cucumber/cucumber';

import { page } from '../hooks/hooks';
import { CompanyPage } from '../pages/CompanyPage';
import companyData from '../testData/companyData.json';

let companyName = `TestCompany_${Date.now()}`;

When('User navigates to Companies', async function () {
    const companyPage = new CompanyPage(page);
    await companyPage.navigateToCompanies();
});

When('User creates a new Company', async function () {
    const companyPage = new CompanyPage(page);
    await companyPage.clickCreate();
    await companyPage.createCompany(companyName);
});

Then('Company should be created successfully', async function () {
    const companyPage = new CompanyPage(page);
    await companyPage.verifyCompanyCreated(companyName);
});

When('User searches the Company', async function () {
    const companyPage = new CompanyPage(page);
    await companyPage.navigateToCompanies();
    await companyPage.searchAndOpenCompany(companyName);
});

Then('Company details should be displayed', async function () {
    const companyPage = new CompanyPage(page);
    await companyPage.verifyCompanyCreated(companyName);
});

When('User updates Company details', async function () {
    const companyPage = new CompanyPage(page);
    await companyPage.navigateToCompanies();
    await companyPage.searchAndOpenCompany(companyName);
    await companyPage.updateCompany(
        companyData.address,
        companyData.website,
        companyData.description
    );
});

Then('Updated Company details should be visible', async function () {
    const companyPage = new CompanyPage(page);
    await companyPage.verifyUpdated(
        companyData.address,
        companyData.website,
        companyData.description
    );
});

When('User deletes the Company', async function () {
    const companyPage = new CompanyPage(page);
    await companyPage.navigateToCompanies();
    await companyPage.searchAndOpenCompany(companyName);
    await companyPage.deleteCompany();
});

Then('Company should not exist', async function () {
    const companyPage = new CompanyPage(page);
    await companyPage.navigateToCompanies();
    await companyPage.verifyDeleted(companyName);
});
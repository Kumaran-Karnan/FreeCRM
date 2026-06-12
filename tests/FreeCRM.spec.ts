import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CompanyPage } from '../pages/CompanyPage';
import companyData from '../testData/companyData.json';
import { env } from '../config/env';

let companyName: string;

test.describe.serial('Company CRUD Operations', () => {

  test.beforeAll(async () => {
    companyName = `TestCompany_${Date.now()}`;
  });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(env.baseURL!);
    await loginPage.login(env.username!, env.password!);
  });

  test('Create Company', async ({ page }) => {
    const companyPage = new CompanyPage(page);
    await test.step('Navigate to Companies', async () => {
      await companyPage.navigateToCompanies();
    }
    );

    await test.step('Create Company', async () => {
      await companyPage.clickCreate();
      await companyPage.createCompany(companyName);
    }
    );

    await test.step('Verify Company Created', async () => {
      await companyPage.verifyCompanyCreated(companyName);
    }
    );
  });

  test('Search Company', async ({ page }) => {
    const companyPage = new CompanyPage(page);
    await companyPage.navigateToCompanies();
    await companyPage.searchAndOpenCompany(companyName);
  });

  test('Update Company', async ({ page }) => {
    const companyPage = new CompanyPage(page);
    await companyPage.navigateToCompanies();
    await companyPage.searchAndOpenCompany(companyName);      
    await companyPage.updateCompany(companyData.address, companyData.website, companyData.description);
    await companyPage.verifyUpdated(companyData.address, companyData.website, companyData.description);
  });

  test('Delete Company', async ({ page }) => {
    const companyPage = new CompanyPage(page);
    await companyPage.navigateToCompanies();
    await companyPage.searchAndOpenCompany(companyName);
    await companyPage.deleteCompany();
    await companyPage.navigateToCompanies();
    await companyPage.verifyDeleted(companyName);
  });
});
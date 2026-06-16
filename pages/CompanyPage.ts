import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CompanyPage extends BasePage {

    private readonly companiesMenu;
    private readonly createButton;
    private readonly saveButton;
    private readonly searchBox;
    private readonly dashboardToolbar;

    constructor(page: Page) {
        super(page);
        this.companiesMenu = page.locator('a[href="/companies"]');
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.saveButton = page.getByRole('button', {name: 'Save'});
        this.searchBox = page.getByPlaceholder('Search');
        this.dashboardToolbar = page.locator('#dashboard-toolbar');
    }

    async navigateToCompanies() {
        // await this.page.mouse.move(1000, 0);
        await this.click(this.companiesMenu);
        await expect(this.page).toHaveURL(/.*companies.*/);
    }

    async clickCreate() {
        await this.click(this.createButton);
    }

    async createCompany(companyName: string) {
        await this.page.locator('input[name="name"]').first().fill(companyName);
        await this.click(this.saveButton);
    }

    async verifyCompanyCreated(companyName: string) {
        await expect(this.dashboardToolbar).toContainText(companyName);
    }

    async searchAndOpenCompany(companyName: string) {
        await this.enterText(this.searchBox,companyName);
        await this.page.keyboard.press('Enter');
        const companyFilter = this.page.locator('div[role="listitem"]',{ hasText: 'Company' });
        await this.page.mouse.move(1000, 0);
        await companyFilter.click();
        const row = this.page.locator('table tbody tr',{ hasText: companyName });
        await expect(row).toBeVisible();
        await row.locator('a').first().click();
    }

    async updateCompany(address: string, website: string, description: string) {
        await this.dashboardToolbar.locator('button:has(i.edit.icon)').click();
        await this.page.waitForTimeout(3000);  
        const addressField = this.page.locator('input[name="address"]');
        const websiteField = this.page.locator('input[name="url"]');
        const descriptionField = this.page.locator('textarea[name="description"]');
        await addressField.fill(address);
        await websiteField.fill(website);
        await descriptionField.fill(description);
        await this.click(this.saveButton);
    }

    async verifyUpdated(address: string, website: string, description: string) {
        await expect(this.page.locator('input[name="address"]')).toHaveValue(address);
        await expect(this.page.locator('input[name="url"]')).toHaveValue(website);
        await expect(this.page.locator('textarea[name="description"]')).toHaveValue(description);
    }

    async deleteCompany() {
        await this.dashboardToolbar.locator('button:has(i.trash.icon)').click();
        const deleteButton = this.page.getByRole('button', {name: 'Delete'});
        await deleteButton.click();
    }

    async verifyDeleted(companyName: string) {
        await this.enterText(this.searchBox, companyName);
        await this.page.keyboard.press('Enter');
        const row = this.page.locator('table tbody tr',{ hasText: companyName });
        await expect(row).toHaveCount(0);
    }
}
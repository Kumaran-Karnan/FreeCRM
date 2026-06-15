import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactsPage extends BasePage {

    private readonly contactsMenu;
    private readonly createButton;
    private readonly saveButton;
    private readonly searchBox;
    private readonly dashboardToolbar;

    constructor(page: Page) {
        super(page);
        this.contactsMenu = page.locator('a[href="/Contacts"]');
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.saveButton = page.getByRole('button', {name: 'Save'});
        this.searchBox = page.getByPlaceholder('Search');
        this.dashboardToolbar = page.locator('#dashboard-toolbar');
    }
    async navigateToContacts() {
        await this.click(this.contactsMenu);
        await expect(this.page).toHaveURL(/.*contacts.*/);
    }

    async clickCreate() {
        await this.click(this.createButton);
    }

    async createContact(contactFirstName: string, contactLastName: string, contactMiddleName: string, companyName: string,
        email: string, description1: string, country: string, position: string, department: string) {
        await this.page.locator('input[name="first_name"]').first().fill(contactFirstName);
        await this.page.locator('input[name="last_name"]').last().fill(contactLastName);
        await this.page.locator('input[name="middle_name"]').fill(contactMiddleName);
        await this.page.locator('input.search').nth(0).fill(companyName);
        await this.page.locator('input[name="value"][placeholder="Email address"]')
            .fill(email);
        await this.page.locator('textarea[name="description"]')
            .fill(description1);
        await this.page.locator('input.search').nth(2).fill(country);
        await this.page.locator('input[name="position"]').fill(position);
        await this.page.locator('input[name="department"]').fill(department);
        await this.click(this.saveButton);
    }

    async searchAndOpenContact(contactFirstName: string) {
        await this.enterText(this.searchBox, contactFirstName);
        await this.page.keyboard.press('Enter');
        const companyFilter = this.page.locator('div[role="listitem"]',{ hasText: 'Company' });
        await this.page.mouse.move(1000, 0);
        await companyFilter.click();
        const row = this.page.locator('table tbody tr',{ hasText: contactFirstName });
        await expect(row).toBeVisible();
        await row.locator('a').first().click();
    }

    async updateContact(email: string, department: string, description1: string) {
        await this.dashboardToolbar.locator('button:has(i.edit.icon)').click();
        await this.page.waitForTimeout(3000);  
        const emailField = this.page.locator('input[name="address"]');
        const websiteField = this.page.locator('input[name="url"]');
        const departmentField = this.page.locator('input[name="department"]');
        const descriptionField = this.page.locator('textarea[name="description"]');
        await emailField.fill(email);
        await departmentField.fill(department);
        await descriptionField.fill(description1);
        await this.click(this.saveButton);
    }

    async deleteContact() {
        await this.dashboardToolbar.locator('button:has(i.trash.icon)').click();
        const deleteButton = this.page.getByRole('button', {name: 'Delete'});
        await deleteButton.click();
    }
}

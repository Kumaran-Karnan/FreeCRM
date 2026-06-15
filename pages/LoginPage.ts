import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    private userName;
    private passWord;
    private loginButton;

    async navigate(url: string) {
        await this.page.goto(url);
    }

    constructor(page: Page) {
        super(page);
        this.userName = page.locator('input[name="email"]');        
        this.passWord = page.locator('input[name="password"]');
        this.loginButton = page.getByText('Login');
    }

    async login(email: string, password: string) {
        await this.enterText(this.userName, email);
        await this.enterText(this.passWord, password);
        await this.click(this.loginButton);
        
    }
}
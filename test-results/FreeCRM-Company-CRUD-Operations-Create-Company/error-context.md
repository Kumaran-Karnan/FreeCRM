# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FreeCRM.spec.ts >> Company CRUD Operations >> Create Company
- Location: FreeCRM\tests\FreeCRM.spec.ts:21:7

# Error details

```
Error: page.goto: url: expected string, got undefined
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export class LoginPage extends BasePage {
  5  | 
  6  |     private userName;
  7  |     private passWord;
  8  |     private loginButton;
  9  | 
  10 |     async navigate(url: string) {
> 11 |         await this.page.goto(url);
     |                         ^ Error: page.goto: url: expected string, got undefined
  12 |     }
  13 | 
  14 |     constructor(page: Page) {
  15 |         super(page);
  16 |         this.userName = page.locator('input[name="email"]');        
  17 |         this.passWord = page.locator('input[name="password"]');
  18 |         this.loginButton = page.getByText('Login');
  19 |     }
  20 | 
  21 |     async login(email: string, password: string) {
  22 |         await this.enterText(this.userName, email);
  23 |         await this.enterText(this.passWord, password);
  24 |         await this.click(this.loginButton);
  25 |         
  26 |     }
  27 | }
```
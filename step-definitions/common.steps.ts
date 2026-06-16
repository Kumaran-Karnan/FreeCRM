import { Given } from '@cucumber/cucumber';
import { LoginPage } from '../pages/LoginPage';
import { page } from '../hooks/hooks';
import { env } from '../config/env';

Given('User logs into FreeCRM', async function () {

    const loginPage =
        new LoginPage(page);

    await loginPage.navigate(
        env.baseURL!
    );

    await loginPage.login(
        env.username!,
        env.password!
    );
});
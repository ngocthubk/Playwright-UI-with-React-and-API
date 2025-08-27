import { Page } from '@playwright/test';

export class LoginPage{

    private readonly ctrLogin;
    private readonly ctrEmailAdd;
    private readonly ctrPw;

     /** Constructor of class LoginPage
    @param page the fixture Page
    */
    constructor(public readonly page: Page) {
        
        this.ctrEmailAdd = this.page.getByTestId('login-email')
        this.ctrLogin = this.page.getByRole('button',{name: 'Login'});
        this.ctrPw = this.page.getByTestId('login-password')        
     }

    async goto(){
        await this.page.goto('app/login',{waitUntil: 'domcontentloaded'});

    }

    async login(email: string, password: string){
        await this.ctrEmailAdd.fill(email);
        await this.ctrPw.fill(password);
        if (this.ctrPw.textContent() == "")
            await this.ctrPw.fill(password);
        await this.ctrLogin.click();
        // Dismiss the consent alert
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.dismiss();
        });

    }
}
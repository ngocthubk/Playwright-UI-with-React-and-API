import { Page,expect,test } from '@playwright/test';
import {AddNote} from './add-note'
import {fetchTestData,NoteType} from '../../helpers/data-factory/note'

export class Note{

    private readonly ctrAddNote;
    private readonly ctrNoteCheckLct: string;
    private readonly ctrNote: string
    private readonly ctrNoteDlt: string
    private readonly ctrCnfDelete
    private readonly ctrCncDelete
    private readonly ctrCtgAll
    private readonly ctrCtgWork
    private readonly ctrCtgHome
    private readonly ctrCtgPersonal
    private readonly ctrLogout
    private readonly ctrHome
    private readonly ctrProfile

     /** Constructor of class Note
    @param page the fixture Page
    */
    constructor(public readonly page: Page) {
        
        this.ctrNoteCheckLct = `_react=mr[note.title="#noteTitle#"]`
        this.ctrNote = '_react=wr[note.title="#noteTitle#"][note.description="#noteDsc#"][note.category="#noteCtg#"]'
        this.ctrNoteDlt = `_react=rt[message="#noteTitle#"]`
        this.ctrAddNote = this.page.getByRole('button',{name: '+ Add Note'}); 
        this.ctrCnfDelete = this.page.getByTestId('note-delete-confirm');
        this.ctrCncDelete = this.page.getByTestId('note-delete-cancel-2');
        this.ctrCtgAll = this.page.locator('//*[@data-testid="category-all"]')
        this.ctrCtgWork = this.page.getByTestId('category-all')
        this.ctrCtgHome = this.page.getByTestId('category-home')
        this.ctrCtgPersonal = this.page.getByTestId('category-personal')
        this.ctrLogout = this.page.getByTestId('logout')
        this.ctrHome = this.page.getByTestId('home')
        this.ctrProfile = this.page.getByTestId('profile')
     }
     /* Logout */
    async logout(){
        
        await this.ctrLogout.click()
        await this.ctrLogout.waitFor({state: "detached"})
        
    }
    /* Go to Profile */
    async goToProfile(){
        // Escape advertisements
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.dismiss();
        });
       
        await  this.ctrProfile.click()
        let url = this.page.url()

        // Escape advertisements
        if (url.search('#') > -1){  
            url = url.split('#')[0]                      
        }
        let found = url.search('profile')            
            if (found == -1 ){
               url = url+'/profile' 
               await this.page.goto(url)               
            }
            
            await this.page.waitForURL(url)        
    }
    /* Go to Home */
    async goToHome(){

        // Escape advertisements
        this.page.on('dialog', async dialog => {
            
            await dialog.dismiss();
        });
        
        await  this.ctrHome.click()
        let url = this.page.url()  

        // Escape advertisements
        if (url.search('#')){
            
            url = url.split('#')[0].split('app')[0]+'app'
            await this.page.goto(url)
        }

        await this.page.waitForURL(url)      
        
    }
    /** Open the form Add new note
     * @param title The title of the note
    */
    async openAddNote(){

        await this.ctrAddNote.click();        
    }

    /** Add a note
     * @param title The title of the note
     * @param dsc The description of the note
     * @param category The category of the note, the possible values can be Work, Home, Personal
     * @param complete True or false
     * 
      */
    async addNote(title: string, dsc: string, category: string, complete: boolean){
        let addNote = await new AddNote(this.page)
        do {
            await this.openAddNote()
            console.log('Try again to open Add note')
            console.log(await addNote.checkAddNoteDisplay())
        }while(!await addNote.checkAddNoteDisplay())
        
        await addNote.inputNote(title, dsc, category, complete)
        await addNote.clickCreate()
        await this.page.locator(this.ctrNote.replace('#noteTitle#',title).replace('#noteDsc#',dsc).replace('#noteCtg#',category))
    }
    /** Complete a note
     * @param title The title of the note
      */
    async completeNote(title: string){

        await this.page.locator(this.ctrNoteCheckLct.replace('#noteTitle#',title)).click()
    }

    /** Delete a note
     * @param title The title of the note
      */
    async deleteNote(title: string, confirm: boolean){
            if (await this.page.locator(this.ctrNoteDlt.replace('#noteTitle#',title)).isVisible()){
            do {
                await this.page.locator(this.ctrNoteDlt.replace('#noteTitle#',title)).click();
                console.log('Try again to delete the note')
            }while(!await this.ctrCnfDelete.isVisible())
            
                if (confirm){
                await test.step('Confirm the deletion',async () => {

                    await this.ctrCnfDelete.click();
                    console.log('deleted')
                    await this.ctrCnfDelete.waitFor({ state: "detached" })
                })
            }else{
                await test.step('Cancel the deletion',async () => {

                    await this.ctrCncDelete.click();
                })
            }
        }        
    }

    /** Verify if a note exists
     * @param title The title of the note
     * @param dsc The description of the note
     * @param category The category of the note, the possible values can be Work, Home, Personal
     * @param complete True or false
     * 
      */
    async verifyNoteExist(title: string, dsc: string,category: string,complete: boolean){
        
        await expect.soft(await this.page.locator(this.ctrNote.replace('#noteTitle#',title).replace('#noteDsc#',dsc).replace('#noteCtg#',category)+`[note.completed=${complete}]`)).toBeVisible();
        
    }

    /** Verify if a note completes
     * @param title The title of the note
     * @param complete True or false
     * 
      */
    async verifyNoteComplete(title: string, complete: boolean){
       
        await expect.soft(await this.page.locator(this.ctrNoteCheckLct.replace('#noteTitle#',title)+`[note.completed=${complete}]`)).toBeVisible()
       
    }

    /** Verify if a note does not exist
     * @param title The title of the note
     * @param complete True or false
     * 
    */
    async verifyNoteNotExist(title: string){
        
        await expect.soft(await this.page.locator(this.ctrNote.replace('#noteTitle#',title))).not.toBeVisible();
        
    }

    /* Mock UI: Add a new button Completed to show only completed notes */
    async addButton(){
        let parent = await this.page.locator('//*[@class="d-flex"]').filter({has: this.ctrCtgAll})
                
        await parent.evaluateHandle((element) => {let button = document.createElement('button');
            button.textContent='Completed';
            button.setAttribute('class','btn btnx-primary text-black fw-bold rounded w-25 me-3');
            button.setAttribute('style','border-color: rgb(222, 226, 230); background-color: rgb(105, 188, 255);');
            element.appendChild(button);
            button.onclick = () => fetch('api/notes/completed') 
        });
    }
    /* Open all notes */
    async openAllNotes()
    {

        await this.ctrCtgAll.click()
    }
    /* Open work notes */
    async openWorkNotes()
    {

        await this.ctrCtgWork.click()
    }
    /* Open home notes */
    async openHomeNotes()
    {

        await this.ctrCtgHome.click()
    }
    /* Open personal notes */
    async openPersonalNotes()
    {

        await this.ctrCtgPersonal.click()
    }

    /* Intercept the request to the resource *\/**\/**\/notes, return only uncompleted notes*/
    async interceptRequest(){
        let jsonCompleted: NoteType[] 
        let body 
        await this.page.route('*/**/api/notes',async route => {
            jsonCompleted  = new Array(0)
            let response = await route.fetch({headers: {
                accept: 'application/json',
                'x-auth-token': process.env.authToken!
                
            }});           
            if (!response.ok())
                response = await route.fetch({headers: {
            accept: 'application/json'
        
            }})
            const json = await response.json();
      
            for (let item of json.data){
                if (item.completed  == false){ 
                    jsonCompleted.push(item)
                }          
             }       
            
            body = {"success": true,
               "status": 200,
               "message": "Notes successfully retrieved",
               "data":  jsonCompleted}            
 
            await route.fulfill({status: 200,
            headers: { 'Content-Type': 'application/json',

            },
        
            response: response,
            body: JSON.stringify(body)})            
        })
    }
}

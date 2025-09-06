import { Page,expect,test } from '@playwright/test';
import {Note} from './note'

// @Author: Thu Nguyen
export class AddNote{

    private readonly ctrCtg
    private readonly ctrCmp
    private readonly ctrTtl
    private readonly ctrDsc
    private readonly ctrCrt
    private readonly ctrCnc
    private readonly ctrAddNote
    

     /** Constructor of class AddNote
    @param page the fixture Page
    */
    constructor(public readonly page: Page) {
        
        this.ctrCtg = this.page.getByTestId('note-category')   
        this.ctrCmp = this.page.getByTestId('note-completed');
        this.ctrTtl = this.page.getByTestId('note-title');
        this.ctrDsc = this.page.getByTestId('note-description')
        this.ctrCrt = this.page.getByTestId('note-submit')
        this.ctrCnc = this.page.getByTestId('note-cancel')
        this.ctrAddNote = this.page.getByText('Add new note')

     }

     /** Input in the form Add new note
     * @param title The title of the note
     * @param dsc The description of the note
     * @param category The category of the note, the possible values can be Work, Home, Personal
     * @param complete True or false
     * 
      */
    async inputNote(title: string, dsc: string, category: string, complete: boolean){
        await this.ctrCtg.selectOption(category)
        if (complete)
            await this.ctrCmp.check()
        await this.ctrTtl.fill(title)
        await this.ctrDsc.fill(dsc)

    }

    async checkAddNoteDisplay():Promise<boolean>{
        const isVisible = await this.ctrAddNote.isVisible();
        return isVisible
    }

    /* Click on the button Create */
    async clickCreate(){
        await this.ctrCrt.click()
        await this.ctrCrt.waitFor({state: 'detached'})
    }

    /* Click on the button Cancel */
    async clickCancel(){
        await this.ctrCrt.cancel()
    }

}

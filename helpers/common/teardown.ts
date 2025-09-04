import {  APIRequestContext } from "playwright"
import { FullNote,deleteNote,getNotes } from '../api/note';
import {Note} from '../../helpers/page-objects/note'

export async function teardownAll(request:APIRequestContext,page, noteTitles: string[]){
    let items: FullNote[] = await getNotes(request)      
    items?.forEach(async ( {id,title})=>{
        if (noteTitles.indexOf(title) > -1)
            await deleteNote(request,id)
        // await page.waitForResponse(`*/**/api/notes/${id}`,{ timeout: 20000 })
    })
    let note = await new Note(page)
    await note.goToProfile()
    await page.close()
    // await request.dispose()    
        
}

export async function teardown(page,title:string){
    let note = await new Note(page)
    await note.deleteNote(title,true)
    await page.close()

}


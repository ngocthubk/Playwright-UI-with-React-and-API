import {  APIRequestContext } from "playwright"
import { FullNote,deleteNote,getNotes } from '../api/note';
import {Note} from '../../helpers/page-objects/note'

export async function teardownAll(request:APIRequestContext,page){
    let items: FullNote[] = await getNotes(request)        
    items?.forEach(async ( {id})=>{
            
        await deleteNote(request,id)
    })
        
        await page.close()
    

}

export async function teardown(page,title:string){
let note = await new Note(page)
        await note.deleteNote(title,true)
        await page.close()

}


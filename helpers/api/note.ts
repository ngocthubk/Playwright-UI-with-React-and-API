import { APIRequestContext } from '@playwright/test';

let token = process.env.authToken
export type FullNote ={
        id: string,
        title: string,
        description: string,
        category: string,
        completed: boolean,
        created_at: string,
        updated_at: string,
        user_id: string
}
/**Get all notes
 * @param request APIRequestContext
 * Return a list of notes
 * 
  */
export async function getNotes(request: APIRequestContext):Promise<FullNote[]>{
    let token = process.env.authToken
    let response = await request.get('api/notes',{headers: {
        accept: 'application/json',
        'x-auth-token': token!
    }})
    let json = await response.json()

    return json.data
}
/** Delete a note 
 * @param request APIRequestContext
 * @param id: ID of the note
 * Return the response
*/
export async function deleteNote(request: APIRequestContext, id:string):Promise<any>{
    
    let response = await request.delete(`api/notes/${id}`,{headers: {
        accept: 'application/json',
        'x-auth-token': token!,
        
    },    
    timeout: 60000})
    // let json = await response.json()
    return  JSON.parse(await response.text())
}
/** Create a note
@param APIRequestContext
@param title The title of the note
@param description The description of the note
@param category The category of the note 
Return either a list of notes or the response
*/

export async function createNote(request: APIRequestContext, title:string,description: string, category: string):Promise<any>{    
    let response = await request.post('api/notes',{headers: {
        'Accept': 'application/json',
        'x-auth-token': token!
    },
    form:{'title':`${title}`,
            'description': `${description}`,
            'category': `${category}`
    }
    })  
  
    if (response.ok()){
        
        let json = await response.json()
        return json.data
    }else
        return response
}
/** Get a note by ID
@param request APIRequestContext
@param id id of the note 
Return the note
*/
export async function getNote(request: APIRequestContext, id:string):Promise<any>{    
    let response = await request.get(`api/notes/${id}`,{headers: {
        accept: 'application/json',
        'x-auth-token': token!
    }
    })    
    if (response.ok()){
        
        let json = await response.json()
        return json.data
    }else
        return JSON.parse(await response.text())
}
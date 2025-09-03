import { test, expect,Page, APIRequestContext  } from '@playwright/test';

import testData from '../../test-data/note.json'
import { mock } from 'node:test';

import _fetch from 'sync-fetch'

export type TestData = {
        title: string,
        description: string,
        category: string,
        completed: boolean
}
/* Fetch test data according to the environment  */
export  function fetchTestData(): TestData[] {
    
    switch (process.env.environment) { // environment can be extended
        case 'stage': {
        // Test data through API calls can be dynamic or real, which is meaningful on a stage environment and offers some benefits, 
        // This can also enable the collaboration between teams.
        // The combination of static test data, e.g. in dev environment, and real test data, e.g. in the stage environment, can bring certain benefits in many cases.
        let res = _fetch('https://b955f167-516d-4f38-94d4-7c2304ef2f59.mock.pstmn.io/test-data/notes')
            
        return res.json() 
        }
        default: 
        return testData
    }
}
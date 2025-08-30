import { test, expect,Page, APIRequestContext  } from '@playwright/test';
import axios from 'axios';
import testData from '../../test-data/note.json'
import { mock } from 'node:test';

import _fetch from 'sync-fetch'

export interface TestData {
        title: string,
        description: string,
        category: string,
        completed: boolean
}

export  function fetchTestData(): TestData[] {
    
    switch (process.env.environment) { // environment can be extended
        case 'stage': {
      
        let res = _fetch('https://b955f167-516d-4f38-94d4-7c2304ef2f59.mock.pstmn.io/test-data/notes')
            
        return res.json() 
        }
        default: 
        return testData
    }
}
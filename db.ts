

import { DB, DBList } from '../tools/classes/db';

const DJANGO_APP_NAME = 'feeling';

export interface FeelingDBTP {
    id: number,
    relatedModel: string,
    relatedModelId: number,
    feeling: string,
    createdAt: string,
    updatedAt: string,
};

class FeelingDB extends DB {
    constructor() {
        super(`${DJANGO_APP_NAME}.Feeling`)
    }
    
}

export const __feeling_db__ =  new DBList({
    feeling: new FeelingDB(),
})
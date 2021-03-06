import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class Database {

    constructor(private storage: Storage) {
        storage.ready().then(() => {
            console.log('ready... inserting');
            storage.set('mocked', [
                ["Data 1", 23],
                ["Data 2", 44],
                ["Data 3", 142]
            ]);
        });
    }

    public getAllData() {
        let s = this.storage;
        return s.ready().then(() => {
            // Or to get a key/value pair
            console.log('ready... fetching');
            return s.get('mocked').then((val) => {
                console.log('I\'ve got data...', val);
                return val;
            })
        });
    }
}

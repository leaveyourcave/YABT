import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class Database {

    // TODO externalize below query
    private static CREATE_TABLES_QUERY: string = "CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value INTEGER)";
    private static INSERT_QUERY: string = "INSERT INTO test_table (name, value) VALUES (?, ?)";
    private static SELECT_QUERY: string = "SELECT * FROM test_table";

    private isConnectionOpen: boolean;
    private db: SQLite;

    constructor() {
        if (!this.isConnectionOpen) {
            this.db = new SQLite();
            this.db.openDatabase({
                name: "data.db", // TODO move to some property file
                location: "default"
            }).then(() => {
                this.db.executeSql(Database.CREATE_TABLES_QUERY, []);
                this.isConnectionOpen = true;
                this.populateWithMockData();
            });
        }
    }

    public getAllData() {
        return new Promise((resolve, reject) => {
            this.db.executeSql(Database.SELECT_QUERY, []).then((data) => {
                let chartPies: Object[] = [];

                if (data.rows.length > 0) {
                    for (let i = 0; i < data.rows.length; i++) {
                        chartPies.push({
                            id: data.rows.item(i).id,
                            name: data.rows.item(i).name,
                            value: data.rows.item(i).value
                        });
                    }
                }
                resolve(chartPies);
            }, (error) => {
                reject(error);
            });
        });
    }

    public populateWithMockData() {
        let mocked = [
            { name: "Data 1", value: 23 },
            { name: "Data 2", value: 44 },
            { name: "Data 3", value: 100 },
            { name: "Data 4", value: 43 },
            { name: "Data 5", value: 22 }
        ];

        let promises = [];
        for (let i = 0; i < mocked.length; i++) {
            promises.push(this.populateWithData(mocked[i].name, mocked[i].value));
        }

        Promise.all(promises).then(function() {
            console.log("Mock data saved.");
        })
    }

    private populateWithData(name, value) {
        return new Promise((resolve, reject) => {
            this.db.executeSql(Database.INSERT_QUERY, [,]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
        });
    }
}

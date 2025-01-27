import { Sequelize } from 'sequelize'

class PostgresService {
    private client: Sequelize
    private static instance: PostgresService
    private constructor(host: string, user: string, database: string, password: string, port: number) {
        //this.client = new Client({host,user,database,password,port})
        this.client = new Sequelize('root', 'root', 'root', {
            host: 'postgres',
            dialect: 'postgres'
        });
    }
    public static getInstance(): PostgresService {
        if (!PostgresService.instance) {
            PostgresService.instance = new PostgresService('root', 'postgres', 'root', 'root', 5432)
        }
        return PostgresService.instance
    }
    public getConnection(){
        return this.client
    }
    public async connection() {
        try {
            await this.client.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    // public async execute(query: string) {
    //     try {
    //         await this.client.authenticate();     // gets connection
    //         await this.client.query(query);  // sends queries
    //         return true;
    //     } catch (error: any) {
    //         console.error("Failed to execute database query", error.stack);
    //         return false;
    //     } finally {
    //         await this.client.close();         // closes connection
    //     }
    // }
}


export default PostgresService
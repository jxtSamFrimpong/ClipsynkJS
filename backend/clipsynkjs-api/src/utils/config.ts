import * as dotenv from 'dotenv';
//TODO import typeorm's db type definitions and use them to give the db config a proper type definition, this will help ensure that the database configuration is correct and that the application can connect to the database successfully
import type { DatabaseType } from 'typeorm/driver/types/DatabaseType';

dotenv.config();
//TODO: give appconfig a proper type definition and make sure to validate the config values (e.g., using class-validator or joi) to ensure that the application has all the necessary configuration values and that they are of the correct type, this will help prevent runtime errors due to missing or invalid configuration values
interface AppConfig {
    jwtSecret: string;
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        //validate that dbtype is one of the supported database types by typeorm (e.g., postgres, mysql, sqlite, etc.) to ensure that the application can connect to the database successfully
        dbtype: string;
        logging: Array<string>;
    };
    auth: {
        jwtSecret: string;
        jwtExpiration: string;
        jwtAlgorithm: string;
        jwtIssuer: string;
        email: {
            gmail: {
                account: string;
                password: string;
            };
        };
    };
}

let POSTGRES_TYPE;
if (process.env.POSTGRES_TYPE   ) {
    //TODO the process.env.POSTGRES_TYPE is a type of DatabaseType
    ["mysql" , "postgres" , "cockroachdb" , "sap" , "mariadb" , "sqlite" , "cordova" , "react-native" , "nativescript" , "sqljs" , "oracle" , "mssql" , "mongodb" , "aurora-mysql" , "aurora-postgres" , "expo" , "better-sqlite3" , "capacitor" , "spanner"].includes(process.env.POSTGRES_TYPE) ? POSTGRES_TYPE = process.env.POSTGRES_TYPE : (() => { throw new Error(`Invalid POSTGRES_TYPE environment variable: ${process.env.POSTGRES_TYPE}. Must be one of mysql, postgres, cockroachdb, sap, mariadb, sqlite, cordova, react-native, nativescript, sqljs, oracle, mssql, mongodb, aurora-mysql, aurora-postgres, expo, better-sqlite3, capacitor, spanner.`) })();
} 
const ORM_LOGGING = process.env.DB_LOGGING === 'query' ? ['query', 'error'] : ['error'] 


export const GMAIL_ACCOUNT = process.env.GMAIL_SMTP_ACCOUNT || '';
export const GMAIL_PASSWORD = process.env.GMAIL_SMTP_PASSWORD || '';

export const appconfig: AppConfig = {
    jwtSecret: process.env.JWT_SECRET || '',
    db: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT ? process.env.POSTGRES_PORT : '5432', 10),
        username: process.env.POSTGRES_USER || '',
        password: process.env.POSTGRES_PASSWORD || '',
        database: process.env.POSTGRES_DB || '',
        dbtype: POSTGRES_TYPE,
        logging: ORM_LOGGING
    
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || '',
        jwtExpiration: process.env.JWT_EXPIRATION || '1h',
        jwtAlgorithm: 'HS256',
        jwtIssuer: 'clipsynk-js',
        email: {
            gmail: {
            account: GMAIL_ACCOUNT,
            password: GMAIL_PASSWORD
            
            }
        
        },
    }
};
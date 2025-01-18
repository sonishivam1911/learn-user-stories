import { BankType, AccountType } from './types';

/**
 * Bank class implements the BankType interface
 * and stores accounts and usernames
 * and is able to create new accounts
 */

export class Bank implements BankType {

    private accounts: AccountType[] = [];
    private usernames: { [key: string]: number } = {};

    /**
     * 
     * @param accounts - a list of accounts to be stored in the bank
     * @param usernames - a list bank verified usernames
     * @returns a new Bank object
     */
    public constructor(accounts: AccountType[], usernames: { [key: string]: number }) {
        this.accounts = accounts;
        this.usernames = usernames;
    }

    /**
     * 
     * @param username - a string representing the username
     * @returns true if the username exists in the bank, false otherwise
     */
    private isUsernameExists(username: string): boolean {
        return this.usernames.hasOwnProperty(username);
    }

    /**
     * 
     * @param accountNumber - a number representing the account number
     * @returns an AccountType object if the account exists, undefined otherwise
     */
    private findAccount(accountNumber: number): AccountType | undefined {
        return this.accounts.find(account => account.id === accountNumber);
    }

    /**
     * 
     * @param accountNumber - a number representing the account number
     * @returns true if the account number has 10 digits, false otherwise
     */
    private isAccountNumberValid(accountNumber: number): boolean {
        return accountNumber.toString().length === 10;
    }

    /**
     * 
     * @param username - a string representing the username of the customer
     * @param age - a number representing the age of the customer
     * @param accountNumber - a number representing the account number of the customer that needs to be created
     * @returns a new account of type AccountType
     */
    createAccount(username: string, age: number, accountNumber: number): AccountType {
        if(!this.isUsernameExists(username)) {
            throw new Error('User no found');
        }
        if(!this.isAccountNumberValid(accountNumber)) {
            throw new Error('Invalid account number');
        }
        if(this.findAccount(accountNumber)) {
            throw new Error('Account already exists');
        }

        if(age < 18) {
            throw new Error('Age must be 18 or above');
        }
        
        const newAccount: AccountType = {
            id: accountNumber,
            balance: 0
        }

        this.accounts.push(newAccount);
        this.usernames[username] = accountNumber;
        return newAccount;
    }

    private isUsernameValid(username: string, accountNumber: number): boolean {
        return this.usernames[username] === accountNumber;
    }


    /**
     * Deposits money into an existing bank account.
     * @param accountNumber - The unique ID of the bank account.
     * @param amount - The amount of money to be deposited.
     * @throws Error if the username or account does not exist, or if the deposit amount is invalid.
     */
    public depositMoney(accountNumber: number, amount: number): void {
        if (amount <= 0) throw new Error('Invalid deposit amount');
        // if (!this.isUsernameValid(username, accountNumber)) throw new Error('Invalid username or account number');
        const account = this.findAccount(accountNumber);
        if (!account) throw new Error('Account not found');
        account.balance += amount; // Update balance
    }

    
    /**
     * Checks the balance of an existing bank account.
     * @param accountNumber - The unique ID of the bank account.
     * @returns The current balance of the bank account.
     * @throws Error if the username or account does not exist.
    */
    public checkBalance(accountNumber: number): number {
        // if (!this.isUsernameValid(username, accountNumber)) throw new Error('Invalid username or account number');
        const account = this.findAccount(accountNumber);
        if (!account) throw new Error('Account not found');
        return account.balance;
    }

    
    /**
     * Withdraws money from an existing bank account.
     * @param accountNumber - The unique ID of the bank account.
     * @param amount - The amount of money to be withdrawn.
     * @throws Error if the username or account does not exist, if the withdrawal amount is invalid, or if there are insufficient funds.
     */
    public withdrawMoney(accountNumber: number, amount: number): void {
        if (amount <= 0) throw new Error('Invalid withdrawal amount');
        // if (!this.isUsernameValid(username, accountNumber)) throw new Error('Invalid username or account number');
        const account = this.findAccount(accountNumber);
        if (!account) throw new Error('Account not found');
        if (account.balance < amount) throw new Error('Insufficient funds');
        account.balance -= amount; // Deduct balance
    }    

}
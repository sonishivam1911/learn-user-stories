import { Bank } from '../src/bank';

// setup

const accounts = [{ id: 1234567890, balance: 3448 },
{ id: 1234567891, balance: 2424 }];

const usernames = {'user1' : 1234567890, 'user2' : 1234567891};
const bank = new Bank(accounts, usernames);

// Scenario 1: customer is able to create a new bank account
const acc = bank.createAccount('user1', 23, 1234567892);
if(acc.id !== 1234567892 || acc.balance !== 0 || acc.id.toString().length !== 10) {
    console.log('Scenario 1 failed');
}
else {
    console.log('Scenario 1 passed');
}

try {
    const acc1 = bank.createAccount('user1', 23, 1234567892);
    console.log('Scenario 1 failed');   
}
catch(e) {
    console.log('Scenario 1 passed');
}

// Scenario 2: customer is unable to create a new bank account due to invalid age

try {
    bank.createAccount('user1', 17, 1234567893);
    console.log('Scenario 2 failed');
}
catch(e) {
    console.log('Scenario 2 passed');
}

// Scenario 3: customer is unable to create a new bank account due to invalid username

try {
    bank.createAccount('user3', 23, 1234567894);
    console.log('Scenario 3 failed');
}
catch(e) {
    console.log('Scenario 3 passed');
}


// Scenario 4: Deposit is successful
try {
    bank.depositMoney(1234567890, 200);
    const updatedAccount = accounts.find(acc => acc.id === 1234567890);
    if (updatedAccount?.balance === 3448 + 200) {
        console.log('Scenario 4 passed');
    } else {
        console.log('Scenario 4 failed');
    }
} catch (e) {
    console.log('Scenario 4 failed');
}

// Scenario 5: Deposit fails due to invalid account number
try {
    bank.depositMoney(1234567899, 200); // Invalid Account Number
    console.log('Scenario 5 failed');
} catch (e) {
    console.log('Scenario 5 passed');
}

// Scenario 6: Deposit fails due to invalid deposit amount
try {
    bank.depositMoney(1234567890, -50); // Invalid Amount
    console.log('Scenario 6 failed');
} catch (e) {
    console.log('Scenario 6 passed');
}

try {
    bank.depositMoney(1234567890, 0); // Zero Amount
    console.log('Scenario 7 failed');
} catch (e) {
    console.log('Scenario 7 passed');
}


const checkBalanceAccounts = [{ id: 1234567890, balance: 700 }];
const checkBalanceUsernames = {'user1' : 1234567890};
const checkBalanceBank = new Bank(checkBalanceAccounts, checkBalanceUsernames);

// Scenario 8: Balance inquiry is successful
try {
    const balance = checkBalanceBank.checkBalance(1234567890);
    if (balance === 700) {
        console.log('Scenario 8 passed');
    } else {
        console.log('Scenario 8 failed');
    }
} catch (e) {
    console.log('Scenario 8 failed');
}

// Scenario 9: Balance inquiry fails due to invalid account number
try {
    checkBalanceBank.checkBalance(1234567899); // Invalid Account Number
    console.log('Scenario 9 failed');
} catch (e) {
    console.log('Scenario 9 passed');
}


const withFundsAccounts = [{ id: 1234567890, balance: 700 }];
const withdrawFundsUsernames = { user1: 1234567890 };
const withdrawFundBank = new Bank(withFundsAccounts, withdrawFundsUsernames);

// Scenario 10: Withdrawal is successful
try {
    withdrawFundBank.withdrawMoney(1234567890, 200);
    const updatedAccount = withFundsAccounts.find(acc => acc.id === 1234567890);
    if (updatedAccount?.balance === 500) {
        console.log('Scenario 10 passed');
    } else {
        console.log('Scenario 10 failed');
    }
} catch (e) {
    console.log('Scenario 10 failed');
}

// Scenario 11: Withdrawal fails due to insufficient balance
try {
    withdrawFundBank.withdrawMoney(1234567890, 1000); // Insufficient Balance
    console.log('Scenario 11 failed');
} catch (e) {
    console.log('Scenario 11 passed');
}


// Scenario 12: Withdrawal fails due to invalid withdrawal amount (negative)
try {
    withdrawFundBank.withdrawMoney(1234567890, -50); // Negative Amount
    console.log('Scenario 12 failed');
} catch (e) {
    console.log('Scenario 12 passed');
}

// Scenario 14: Withdrawal fails due to invalid withdrawal amount (zero)
try {
    withdrawFundBank.withdrawMoney(1234567890, 0); // Zero Amount
    console.log('Scenario 14 failed');
} catch (e) {
    console.log('Scenario 14 passed');
}

// Scenario 15: Withdrawal fails due to invalid account number
try {
    withdrawFundBank.withdrawMoney(1234567899, 200); // Invalid Account Number
    console.log('Scenario 15 failed');
} catch (e) {
    console.log('Scenario 15 passed');
}
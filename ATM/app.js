import inquirer from "inquirer";
import chalk from "chalk";
import { checkUser, showBalnace, widthdrawOrTransfer } from "./account.js";
import { exit } from "process";
import { clear } from "console";
var userLogin = 0;
async function atmOpsSelection() {
    let atmOpsSelected = await inquirer.prompt([
        {
            name: "atmOps",
            type: "list",
            message: "Please choose your operation:",
            choices: ["Balance Inqiery", "Fund Transfer", "Cash Withdrawal", "Pay Bills", "Cancel"]
        }
    ]);
    switch (atmOpsSelected.atmOps) {
        case ('Balance Inqiery'):
            chalk.blue(console.log(showBalnace()));
            await backToMain();
            break;
        case ('Fund Transfer'):
            await fundTransfers();
            break;
        case ('Cash Withdrawal'):
            await cashWithdrawal();
            break;
        case ('Pay Bills'):
            await payBills();
            break;
        case ('Cancel'):
            exit();
        default:
            console.log("Something Went Wrong Please try again: ");
            clear();
            await atmOpsSelected();
            break;
    }
}
async function ConfirmDetails(acccountBank, opt) {
    if (opt === 'FundTransfer') {
        let UserCon = await inquirer.prompt([
            {
                name: "confir",
                type: "confirm",
                message: `Please Confirm the following details: \n Bank Account Number: ${acccountBank.tBankAccount} \n Account Bank: ${acccountBank.tBank} \n Amount: ${acccountBank.tAmount}`,
            }
        ]);
        if (UserCon) {
            let msg = widthdrawOrTransfer(acccountBank.tAmount);
            chalk.blue(console.log(`The Amount ${acccountBank.tAmount} Transfered to account number ${acccountBank.tBankAccount} of bank ${acccountBank.tBank}`));
            await backToMain();
        }
        else {
            await fundTransfers();
        }
    }
    else if (opt === 'paybill') {
        let UserCon = await inquirer.prompt([
            {
                name: "confir",
                type: "confirm",
                message: `Please Confirm the following details: \n Bill: ${acccountBank.billType} \n against conumser number: ${acccountBank.tConsumerNo} \n Amount: ${acccountBank.tAmount}`,
            }
        ]);
        if (UserCon) {
            let msg = widthdrawOrTransfer(acccountBank.tAmount);
            chalk.blue(console.log(`The bill paid : ${acccountBank.billType} \n against conumser number: ${acccountBank.tConsumerNo} \n Amount: ${acccountBank.tAmount}`));
            await backToMain();
        }
        else {
            await payBills();
        }
    }
    else if (opt === 'cashWidthral') {
        let UserCon = await inquirer.prompt([
            {
                name: "confir",
                type: "confirm",
                message: `Please Confirm the Amount: ${acccountBank.tAmount}`,
            }
        ]);
        if (UserCon) {
            let msg = widthdrawOrTransfer(acccountBank.tAmount);
            chalk.blue(console.log("Transaction Successful"));
            await backToMain();
        }
        else {
            await cashWithdrawal();
        }
    }
}
async function backToMain() {
    let backSelection = await inquirer.prompt([
        {
            name: "back",
            type: "list",
            message: "Do you want an other Transaction: ",
            choices: ["Yes", "No"]
        }
    ]);
    switch (backSelection.back) {
        case ('Yes'):
            atmOpsSelection();
            break;
        case ('No'):
            exit();
    }
}
async function payBills() {
    let transferDetail = await inquirer.prompt([
        {
            name: "billType",
            type: "list",
            message: "Please choose Bill Type: ",
            choices: ["Gass", "Electricity", "Telephone"]
        },
        {
            name: "tConsumerNo",
            type: "number",
            message: "Please Enter Consumer Number: ",
        },
        {
            name: "tAmount",
            type: "number",
            message: "Please Enter Amount: ",
        }
    ]);
    ConfirmDetails(transferDetail, 'paybill');
}
async function fundTransfers() {
    let transferDetail = await inquirer.prompt([
        {
            name: "tType",
            type: "list",
            message: "Please choose your type: ",
            choices: ["Within Same Bank", "Other Account", "1 Link Memeber", "Cancel"]
        },
        {
            name: "tBank",
            type: "list",
            message: "Please choose Transferee Bank: ",
            choices: ["Meezan Bank", "ABL", "HBL", "MCB", "Bank Alflah", "Standard Chartered", "Punjab Bank", "Sindh Bank", "Bank of Khyber", "Cancel"]
        },
        {
            name: "tBankAccount",
            type: "input",
            message: "Please choose Account Number: ",
        },
        {
            name: "tAmount",
            type: "number",
            message: "Please Enter Amount: ",
        }
    ]);
    ConfirmDetails(transferDetail, 'FundTransfer');
}
async function cashWithdrawal() {
    let transferDetail = await inquirer.prompt([
        {
            name: "tAmount",
            type: "number",
            message: "Please Enter Amount: ",
        }
    ]);
    ConfirmDetails(transferDetail, 'cashWidthral');
}
async function login() {
    let userDetails = await inquirer.prompt([
        {
            name: "UserName",
            type: "string",
            message: "Please Enter User Name: "
        },
        {
            name: "UserID",
            type: "password",
            message: "Please Enter Password: "
        }
    ]);
    const loginDetails = {
        uId: `${userDetails.UserName}`,
        password: `${userDetails.userId}`,
        name: "",
        accountNo: ""
    };
    let loginDetail = await checkUser(loginDetails);
    if (typeof (loginDetail) === 'string') {
        chalk.red(console.log(loginDetail));
    }
    else {
        const userInfo = {
            balance: parseInt(`${loginDetail.balance}`),
            name: `${loginDetail.accHolderName}`,
            accountNo: `${loginDetail.accNumber}`
        };
        userLogin = 1;
        await atmOpsSelection();
    }
}
await atmOpsSelection();

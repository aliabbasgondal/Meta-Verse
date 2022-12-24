import { ALL } from "dns";

interface accountHolder{
    name:string,
    accountNo:string
}
interface loginDetails extends accountHolder{
    uId:string,
    password:string
}
interface accountbalance extends accountHolder{
    balance:number
}
let AccBalnace =100000;
async function accountDetails()
{
    let uBalance =   showBalnace();
    const userDetails= {accHolderName : 'Ali', accNumber : '03160101540859', userId : 'ali0786', userPassword : '0786', balance:`${uBalance}`}
    return userDetails;
}

async function deposit(amount:number){
    AccBalnace = AccBalnace + amount;
    showBalnace();
}
async function widthdrawOrTransfer(amount:number){
  if((amount === AccBalnace) ||(amount < AccBalnace))
  {
    AccBalnace = AccBalnace -amount;
    return "Success";
  }else{
    return "the amount entered is less than available balance";
  }
}
function showBalnace()
{
    return AccBalnace;
}
async function checkUser(userLogin:loginDetails){
 let UserAccountDetails = await accountDetails();
 if((userLogin.uId === UserAccountDetails.userId) && (userLogin.password === UserAccountDetails.userPassword))
 {
    return UserAccountDetails;
 }
 else{
    return "Something went wrong, please try again";
 }

}

   export {widthdrawOrTransfer,checkUser, showBalnace,  deposit, accountDetails, loginDetails,accountbalance}; 
   
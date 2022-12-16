import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnmation from "chalk-animation";
import { clear } from "console";
const sleep =()=>{
    return new Promise((res)=>{
        setTimeout(res,1000);
    })
}

async function welcome() {
    let chalkanimations = chalkAnmation.rainbow("Less start Number guessing game");
    await sleep();
    chalkanimations.stop();
    
}
await welcome();
async function genrateNumber(){
    let randomNumber = await parseInt((10*Math.random()).toString());
    let userGuess = await inquirer.prompt([
        {
            name:"number",
            type:"number",
            message:"Please guess a number between 1 to 10"
        }
    ]).then(async(ans)=>{
        let i=0;
        let counting;
        do{
            i++;
             counting = chalkAnmation.rainbow(i.toString()) ;
            await sleep();
            
            counting.stop();  
            

            

        }while(i<10);
        if(ans.number==randomNumber){
            let suc =chalkAnmation.rainbow("Hurry! you have guess the right");
            await sleep();
            suc.stop();
            
        }
        else{
            console.log(chalk.red("Your guess is wrong"));
        }

    });   
}

async function startAgain(){
        
    do{
        await genrateNumber();
       
        var again = await inquirer
        .prompt({
            type : "input" ,
            name : "restart" ,
            message : "Do You Want To Continue? Press y or n: "
        })
     
    }while(again.restart == "y"|| again.restart == "Y" || again.restart == "yes" || again.restart == "YES");
}
chalk.greenBright(startAgain());

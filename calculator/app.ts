import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimaiton  from "chalk-animation";
import { clear } from "console";
const sleep = () => {

    return new Promise((res) => {
  
      setTimeout(res, 3000);
  
    });
  
  };
  
async function welcome(){
    let chalkanimation = chalkAnimaiton.rainbow("Welcome to the Calculator Program");
    await sleep();
    chalkanimation.stop();
   
  chalk.green(console.log(`   _____________________

  |  _________________  |

  | | JO           0. | |

  | |_________________| |

  |  ___ ___ ___   ___  |

  | | 7 | 8 | 9 | | + | |

  | |___|___|___| |___| |

  | | 4 | 5 | 6 | | - | |

  | |___|___|___| |___| |

  | | 1 | 2 | 3 | | x | |

  | |___|___|___| |___| |

  | | . | 0 | = | | / | |

  | |___|___|___| |___| |

  |_____________________|`));



}
await welcome();


async function calculation() {
    const UserInput = await inquirer.prompt([
    
        {
            type:"number",
            name:"firstnumber",
            message:"Please Enter First Number: "
        },
        {
            type:"number",
            name:"secondnumber",
            message:"Please Enter Second Number: "
        },
        {
            type:"list",
            name:"operator",
            message:"Please Select Operator: ",
            choices: ["Addition", "Subtraction", "Multiplication", "Division"]
        }

    
])

    switch(UserInput.operator){
        case("Addition"):
            console.log(chalk.yellow(`${UserInput.firstnumber} + ${UserInput.firstnumber} =  ${UserInput.firstnumber+UserInput.secondnumber}`));
            break;
        case("Subtraction"):
            console.log(chalk.green(`${UserInput.firstnumber} - ${UserInput.firstnumber} =  ${UserInput.firstnumber-UserInput.secondnumber}`));
            break;
        case("Multiplication"):
            console.log(chalk.gray(`${UserInput.firstnumber} x ${UserInput.firstnumber} =  ${UserInput.firstnumber*UserInput.secondnumber}`));
            break;
        case("Division"):
           console.log(chalk.greenBright(`${UserInput.firstnumber} / ${UserInput.firstnumber} =  ${UserInput.firstnumber/UserInput.secondnumber}`));
            break;
        default:
            console.log(chalk.red('Please try again.'));
            break;
    } 
    
}

async function CalculatorMain(){
   
    do{
        
        await calculation();
       var reDo = await inquirer.prompt([
        {
            type:"input",
            name:"onceAgain",
            message:"Do you want another calculation; y or n:"
        }
       ]);
     
       
    }while(reDo.onceAgain=='Y' || reDo.onceAgain=='y');
}
chalk.blueBright(CalculatorMain());
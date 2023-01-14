import inquirer from "inquirer";
import { listenerCount } from "process";
var conversion={'PKR':{
    'USD':0.0044,
    'GBP':0.0036,
    'PKR':1
},
'USD':{
    'PKR':228.50,
    'GBP':0.82,
    'USD':1
},
'GBP':{
    'USD':1.22,
    'PKR':279.22,
    'GBP':1
},
}
class convertor{
    /**
     * convertor
string from,string to     */
    public converstionRate(userInputForConverstion:object):Promise<number> {
        let from = userInputForConverstion.fromC;
        let to = userInputForConverstion.toC;
        let amount = userInputForConverstion.cA;
        let convertedAmount=0;
        if(from==='PKR'){
        if(to === 'GBP')
        {
            convertedAmount=amount*conversion.PKR.GBP;
        }else if(to === 'USD')
        {
            convertedAmount=amount*conversion.PKR.USD;
        }
        else if(to === 'PKR')
        {
            convertedAmount=amount*conversion.PKR.USD;
        }
    }else    if(from==='GBP'){
        if(to === 'GBP')
        {
            convertedAmount=amount*conversion.GBP.GBP;
        }else if(to === 'USD')
        {
            convertedAmount=amount*conversion.GBP.USD;
        }
        else if(to === 'PKR')
        {
            convertedAmount=amount*conversion.GBP.PKR;
        }
    }else    if(from==='USD'){
        if(to === 'GBP')
        {
            convertedAmount=amount*conversion.USD.GBP;
        }else if(to === 'USD')
        {
            convertedAmount=amount*conversion.USD.USD;
        }
        else if(to === 'PKR')
        {
            convertedAmount=amount*conversion.USD.PKR;
        }
    }
    return convertedAmount;

    }
   /**
    * currencyCovertorInput
    */
   public async currencyCovertorInput():Promise<from:string,to:string,amount:number> {
    let currencyConversion =await inquirer.prompt([
        {
            mame:'fromCurrency',
            type:'list',
            choices:['PKR','USD','GBP'],
            message:'Please choose currency from'
        },
        {
            mame:'toCurrency',
            type:'list',
            choices:['PKR','USD','GBP'],
            message:'Please choose currency to convert'
    
        },
        {
            mame:'amount',
            type:'number',
            message:'Please enter amount'
    
        }
    ]);
    return fromcurrencyConversion.fromCurrency,currencyConversion.toCurrency,currencyConversion.amount};

   }
   
}

let currencyConvortor = new convertor();
let userInput = currencyConvortor.currencyCovertorInput();
let convertedAmount = currencyConvortor.converstionRate(userInput)



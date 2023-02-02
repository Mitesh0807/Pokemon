import fetch from "node-fetch";
import inquirer from "inquirer";
import { parseOptions } from "./save.js";
//ditto , aegislash-blade ,charizard
const pokemonprompt = async () => {
  const responce = await inquirer.prompt({
    type: "input",
    name: "pokemon_name",
    message: "Enter Pokemon name",
  });
  return await responce;
};

const pokemonCheckBox = async () => {
    const responce = await inquirer.prompt({
      type: "checkbox",
      name: "user_choice",
      message: "what do you want",
      choices: [
        new inquirer.Separator("Choose option here"),
        {
          name: "Stats",
        },
        {
          name: "Art Work",
        },
        {
          name: "Sprites",
        },
      ],
    });
    return responce;
}; 

const startAgin = async () =>{
    const responce = await inquirer.prompt({
        type : 'list',
        name : 'countinue',
        message :'DO YOU WANT TO continue',
        choices: [
            {
                name : 'Yes'
            },
            {
                name : 'No'
            },
        ],
    });
    return responce;
}
const fetchData = async (pokemonName)  =>{
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    const dataJson = await data.json()
    return dataJson
}

const promptUser = async () =>{

    while(true){
        const start = await pokemonprompt();
        console.log(start);
        const data = await fetchData(start.pokemon_name)
        console.log(data.name); 
        const choice = await pokemonCheckBox();
        console.log(choice);
        console.log(typeof choice.user_choice)
        await parseOptions(data,choice);
        const keepdown = await startAgin();
        console.log(keepdown);
        if(keepdown.countinue ==='No') {
            break;
        }
    }
}
promptUser();

export {fetchData};
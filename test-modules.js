// import inquirer from "inquirer";

// // const question = {
// //     type: 'input',
// //     name:'pokemon_name',
// //     message : 'Enter Pokemon name'
// // }
// // inquirer.prompt(question).then((answers) => {
// //     console.log(answers.pokemon_name);
// // })


// async function userresponce() {
//     const userPokemon = await pokeMonprompt();
//     console.log(userPokemon);
// }
// userresponce();


// const pokeMonprompt = async () =>{
//     const responce = await inquirer.prompt({
//          type: 'input',
//          name:'pokemon_name',
//          message : 'Enter Pokemon name'
//      })
//      return await responce;
//  }
 



//  const pokemonCheckBox = async () => {
//     return await inquirer.prompt({
//       type: "checkbox",
//       name: "user_choice",
//       message: "what do you want",
//       choices: [
//         new inquirer.Separator("Choose option here"),
//         {
//           name: "Stats",
//         },
//         {
//           name: "Art Work",
//         },
//         {
//           name: "Sprites",
//         },
//       ],
//     });
//   };

//   const data = await fetchData();
//   //fetch test 

//   const url = 'https://pokeapi.co/api/v2/pokemon/ditto'
//   fetch(url)
//   .then(responce=>responce.json())
//   .then(json => console.log(json));



//   await createFolder(foldername);
//   let url1 = pokeObject.sprites.front_default;
//   console.log(url);
//   let responce = fetch(url1)
//   const Buffer = await responce.arrayBuffer();
//   console.log(Buffer);
//   // await fs.writeFile('1.png', Buffer.from(arrayBuffer));





const obj = { user_choice: [ 'Stats', 'Art Work', 'Sprites' ] };
console.log(obj.user_choice.includes('Stats'));
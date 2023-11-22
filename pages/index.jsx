import react, { useState ,useReducer  } from "react";
import { pokemons } from "../data/mydata";
import Infopoke from "../components/infopoke";
import Battlecard from "../components/battlecard";
import BattleField from "../components/battlefield";

let str="";


export default function App(){
    let arr=pokemons;
    const [fightText,usefightText]=useState(str); //fight text

    const [infoindex,changeindex]=useState(-1); //pokimon info
    const [battlepokemonleft , setbattlepokemonleft]=useState(null); //left pokemon in battle
    const [battlepokemonright , setbattlepokemonright]=useState(null); //right pokemon in battle

    //const [pokemonturns , setpokemonturns]=useState(null); //makes the pokemon turn

    const [gameended,usegameended]=useState(false); //start again text


    const [pokemonturns,dispatchTurns]=useReducer(reducer,null)


    function reducer(pokemonturns,action){
      switch (action.type) {
        case "add":
          return {...action.pokemonnow};
          break;
      
        case "remove":
          return null;
          break;

        default:
          break;
      }



    }


    function showInfoHandler(index) {
      if(infoindex == index)
        changeindex(-1);
      else
        changeindex(index);
    };


    function selected(name){
      const selectedPokemon = arr.find((x) => x.name === name);
      const newpokemon = { ...selectedPokemon };

      if (!battlepokemonleft) {
        setbattlepokemonleft(newpokemon);
      } else if (!battlepokemonright) {
        setbattlepokemonright(newpokemon);
      }
    }

    function remove(){
      setbattlepokemonleft(null);
      setbattlepokemonright(null);
      dispatchTurns({type:"remove"})
      str="";
      usefightText(str);
        usegameended(false);
    }
  
    function startFight() {
      const isLeftTurn = Math.random(2);//or 0 or 1  it means or true or false
      dispatchTurns({type:"add" , pokemonnow:isLeftTurn? battlepokemonleft:battlepokemonright });
      
    }

    function switchturns(){
      dispatchTurns({type:"add" , pokemonnow:(pokemonturns.name==battlepokemonleft.name)? battlepokemonright:battlepokemonleft });

      if(battlepokemonright.hp <=0){
        usegameended(true);
        str+="******************"+battlepokemonleft.name+" Won******************";
        usefightText(str);
      }
      if(battlepokemonleft.hp <=0){
        usegameended(true);
        str+="******************"+battlepokemonright.name+" Won******************";
        usefightText(str);
      }

    }


    function attackorrage(fromwhatchance){
      const chance = Math.floor(Math.random() * 100) + 1;
      if(pokemonturns==battlepokemonleft){ //leftpokemon rage
        const dmg = Math.floor(Math.random() * (battlepokemonleft.attack.damage.high - battlepokemonleft.attack.damage.low + 1)) + battlepokemonleft.attack.damage.low ;

        if (chance>fromwhatchance){
          let rightpokemon=battlepokemonright;
          rightpokemon.hp-=dmg;             //reduce the dmg

          setbattlepokemonright(rightpokemon) // set back the pokemon

          str+="*"+battlepokemonleft.name+" attacked "+battlepokemonright.name+" using "+battlepokemonleft.attack.name+" ability and made "+dmg+" damage\n\n"
          usefightText(str);
        }
        else{
          str+="*"+battlepokemonleft.name+" missed the rage attack and "+battlepokemonright.name+" didnt got dmg\n\n"
          usefightText(str);

        }
      }else{ //rightpokemon rage
        if (chance>fromwhatchance){
          const dmg = Math.floor(Math.random() * (battlepokemonleft.attack.damage.high - battlepokemonleft.attack.damage.low + 1)) + battlepokemonleft.attack.damage.low ;

          let leftpokemon=battlepokemonleft;
          leftpokemon.hp-=dmg;             //reduce the dmg

          setbattlepokemonleft(leftpokemon) // set back the pokemon

          str+="*"+battlepokemonright.name+" attacked "+battlepokemonleft.name+" using "+battlepokemonright.attack.name+" ability and made "+dmg+" damage\n\n";
          usefightText(str);
        }
        else{
          str+="*"+battlepokemonright.name+" missed the attack and "+battlepokemonleft.name+" didnt got dmg\n\n";
          usefightText(str);
        }
      }
     
    switchturns();
    }


    
    return (

        <div style={{ display: 'flex' }}>

        <div  style={{ width: '30%' , borderRight: '1px solid #000' }}>
        {/* pokemons */}

            <h1>Pokemons</h1>
            
            {pokemons.map((pokemon, index) => (<div style={{border:"1px solid #000", width:400 }}>  
              <Infopoke key={index} {...pokemon} index={index} select={selected} showinfo= {showInfoHandler} isgoingtoexpend={infoindex==index} battlepokemonright={battlepokemonright}/> 
              </div> 
            
            ))}


        </div>

        


        <div style={{ width: '70%', padding: '20px' }}>
          {/* battle */}

          <h1>Battle</h1>
          
          <button onClick={()=>remove()}>remove both of them</button>


          <BattleField battlepokemonleft={battlepokemonleft} battlepokemonright={battlepokemonright} pokemonturns={pokemonturns}  pokeattack={attackorrage}  gameended={gameended}  fightText={fightText}  startFight={startFight}remove={remove} ></BattleField>

        </div>
  
      </div>

        



    );

}
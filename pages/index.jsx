import react, { useState } from "react";
import { pokemons } from "../data/mydata";
import Infopoke from "../components/infopoke";
import Battlecard from "../components/battlecard";

let str="";
export default function App(){
    let arr=pokemons;
    const [fightText,usefightText]=useState(str); //fight text

    const [infoindex,changeindex]=useState(-1); //pokimon info
    const [battlepokemonleft , setbattlepokemonleft]=useState(null); //left pokemon in battle
    const [battlepokemonright , setbattlepokemonright]=useState(null); //right pokemon in battle

    const [pokemonturns , setpokemonturns]=useState(null); //makes the pokemon turn

    const [gameended,usegameended]=useState(false); //start again text

   
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
      setpokemonturns(null);
      str="";
      usefightText(str);
        usegameended(false);
    }
  
    function startFight() {
      const isLeftTurn = Math.random(2);//or 0 or 1  it means or true or false
    
      if (isLeftTurn) {
        setpokemonturns(battlepokemonleft);
      } else {
        setpokemonturns(battlepokemonright);
      }
    }

    function switchturns(){
      if(pokemonturns==battlepokemonleft){
        setpokemonturns(battlepokemonright)
      }else{
        setpokemonturns(battlepokemonleft)
      }

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


    function pokeattack(){
      const chance = Math.floor(Math.random() * 100) + 1;
        if(pokemonturns==battlepokemonleft){ //leftpokemon rage
          const dmg = Math.floor(Math.random() * (battlepokemonleft.attack.damage.high - battlepokemonleft.attack.damage.low + 1)) + battlepokemonleft.attack.damage.low ;

          if (chance>20){
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
          if (chance>20){
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

    function pokerage(){
      const chance = Math.floor(Math.random() * 100) + 1;
        if(pokemonturns==battlepokemonleft){ //leftpokemon rage
          const dmg = Math.floor(Math.random() * (battlepokemonleft.attack.damage.high*2 - battlepokemonleft.attack.damage.low*2 + 1)) + battlepokemonleft.attack.damage.low * 2;

          if (chance>50){
            let rightpokemon=battlepokemonright;
            rightpokemon.hp-=dmg;             //reduce the dmg

            setbattlepokemonright(rightpokemon) // set back the pokemon

            str+="*"+battlepokemonleft.name+" attacked "+battlepokemonright.name+" using "+battlepokemonleft.attack.name+" ability with Rage and made "+dmg+" damage\n\n"
            usefightText(str);
          }
          else{
            str+="*"+battlepokemonleft.name+" missed the rage attack and "+battlepokemonright.name+" didnt got dmg\n\n"
            usefightText(str);

          }
        }else{ //rightpokemon rage
          if (chance>50){
            const dmg = Math.floor(Math.random() * (battlepokemonleft.attack.damage.high * 2 - battlepokemonleft.attack.damage.low * 2 + 1)) + battlepokemonleft.attack.damage.low * 2;

            let leftpokemon=battlepokemonleft;
            leftpokemon.hp-=dmg;             //reduce the dmg

            setbattlepokemonleft(leftpokemon) // set back the pokemon

            str+="*"+battlepokemonright.name+" attacked "+battlepokemonleft.name+" using "+battlepokemonright.attack.name+" ability with Rage and made "+dmg+" damage\n\n";
            usefightText(str);
          }
          else{
            str+="*"+battlepokemonright.name+" missed the rage attack and "+battlepokemonleft.name+" didnt got dmg\n\n";
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
              <Infopoke {...pokemon} index={index} select={selected} showinfo= {showInfoHandler} isgoingtoexpend={infoindex==index} battlepokemonright={battlepokemonright}/> 
              </div> 
            
            ))}


        </div>

        


        <div style={{ width: '70%', padding: '20px' }}>
          {/* battle */}

          <h1>Battle</h1>
          
          <button onClick={()=>remove()}>remove both of them</button>

          

        <div style={{display:"flex"}}>
          <Battlecard {...battlepokemonleft} turn={pokemonturns==battlepokemonleft} rage={pokerage} attack={pokeattack} gameended={gameended}></Battlecard>

          <div style={{ width: "90px" }}></div>

          <textarea disabled={true} value={fightText} ></textarea>
          <button style={{visibility: gameended? "hidden":"visible"}} disabled={(battlepokemonright==null || battlepokemonleft ==null) || pokemonturns!=null }  onClick={()=>startFight()}  >Start Battle</button>

          <button style={{visibility: gameended? "visible":"hidden"}}  onClick={()=>remove()} >Refresh</button>

          <div style={{ width: "90px" }}></div>
    
          <Battlecard {...battlepokemonright} turn={pokemonturns==battlepokemonright} rage={pokerage} attack={pokeattack} gameended={gameended}></Battlecard>

        </div>
          


        </div>
  
      </div>

        



    );

}
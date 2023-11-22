import Battlecard from "../components/battlecard";


export default function BattleField({battlepokemonleft , battlepokemonright ,pokemonturns ,pokeattack , gameended ,fightText , startFight ,remove}){


  const newobject = {...pokemonturns};
  const disabmbleleft={...battlepokemonleft};
  const disabmbleright={...battlepokemonright};


    return(
        <div style={{display:"flex"}}>
          <Battlecard {...battlepokemonleft} turn={newobject.name==disabmbleleft.name} attack={pokeattack} gameended={gameended}></Battlecard>

          <div style={{ width: "90px" }}></div>

          <textarea disabled={true} value={fightText} ></textarea>
          <button style={{visibility: gameended? "hidden":"visible"}} disabled={(battlepokemonright==null || battlepokemonleft ==null) || pokemonturns!=null }  onClick={()=>startFight()}  >Start Battle</button>

          <button style={{visibility: gameended? "visible":"hidden"}}  onClick={()=>remove()} >Refresh</button>

          <div style={{ width: "90px" }}></div>
    
          <Battlecard {...battlepokemonright} turn={newobject.name==disabmbleright.name} attack={pokeattack} gameended={gameended}></Battlecard>

        </div>

    );


}
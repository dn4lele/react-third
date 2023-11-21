
export default function Infopoke({ index, name ,imgLink , showinfo , isgoingtoexpend  , hp , attack , select  , battlepokemonright}){
    return(
        <div>

            <h2>{name}</h2>
            <img src={imgLink} />

            <button onClick={()=> showinfo(index)}>Info</button>
            
            <button disabled={battlepokemonright!=null} onClick={()=> select(name)}>Select</button>

            <div style={{visibility:isgoingtoexpend? "visible":"hidden"   }} >
                <h2>Hp:{hp}</h2>
                <h2>Attack:{attack.name}</h2>
                <h3> &#8226; low:{attack.damage.low}</h3>
                <h3> &#8226; high:{attack.damage.high}</h3>
            </div>
            
            


        </div>
    );


}
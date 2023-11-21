
export default function Battlecard({ name ,imgLink , hp , turn , attack ,rage , gameended}){
    return(
        <div>

            <h2>{name}</h2>
            <img src={imgLink} />   
            <h2>Hp:{hp}</h2>

            <div style={{visibility:name!=null? "visible":"hidden"   }} >
            <button disabled={turn!=true || gameended==true} onClick={()=>rage()}>Rage</button>
            <button disabled={turn!=true || gameended==true} onClick={()=>attack()}>Attack</button>
            </div>

        </div>
    );
}
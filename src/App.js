
import React,{ useState} from 'react';
import Die from './Die';
import {nanoid} from "nanoid";
import Confetti from "react-confetti";


function App() {

  const [data,setData] = useState(allNewData());

  const [over,setOver]=useState(false);


  function allNewData(){
    const newDice=[];
    for(let i=0;i<10;i++){
      newDice.push(generateData())
    }

    return newDice;
  }

  function holdDice(id){
    if(!over){
      setData(oldData=>{
        return oldData.map(die=>{
          return die.id===id ? {...die,isHeld: !die.isHeld} : die
        })
      })

    }
    
  }
  function rollDice(){

    if(over){
      setOver(false);
      setData(allNewData());
    }else{
      setData(oldData=> oldData.map(die=>{
        return die.isHeld ? die : generateData()
      }))

    }
    
  }
  function generateData(){
    return {
      id:nanoid(),
      value:Math.ceil(Math.random()*6),
      isHeld:false
    }
  }

  React.useEffect(()=>{
    let x= data.every(die=> die.isHeld);
    let y= data[0].value;
    let z=data.every(die=> die.value===y);
    if(x&&z){
      setOver(true)
      
    }

  },[data])





  const allDice=data.map(die=> <Die key={die.id} value={die.value} isHeld={die.isHeld}  holdDice={()=> holdDice(die.id)}/>)

  return (
    <main>
      {over && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dices are same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
          {allDice}
      </div>
      <button className='roll-dice' onClick={rollDice}>{over? "New Game" : "Roll"}</button>
        
    </main>

  );
}

export default App;

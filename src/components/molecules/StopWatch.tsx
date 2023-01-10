import { useEffect, useRef, useState } from 'react'
import './StopWatch.css'

const fixTime =(time:number)=>{
    return time<10?"0"+time:time
}
const formatTimer=(time:number)=>{
    const seconds = time%60
    const minutes= Math.floor(time/60)%60
    return `00:${fixTime(minutes)}:${fixTime(seconds)}`
}
const Stopwatch = (props:{setStat:(x:any)=>void}) => {
    let t=6000
    const [time, setTime] = useState(t);
    const [running, setRunning] = useState(false);
    useEffect(() => {
    
      let interval: string | number | NodeJS.Timeout | undefined;
      if (running) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime - 10);
        }, 10);
      } else if (!running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [running]);
    console.log("time :"+time)
    let x=running
    if(time===0){
    props.setStat(true)
    setRunning(false)
    setTime(t)
  }
    return (
      <div className="stopwatch">
       <div className='contain' hidden={x}> 
      <div className='contContainer'>
      <div className='contCont'>
      <div className="numbers">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        </div>
      </div>
       </div>
       <div className="buttons">
       <ul className='ulButton'>
            <li>
            <button className='butOn' onClick={() => setRunning(true)}>Start</button> 
              </li>
              <li>
              <button className='butOn' onClick={() => setRunning(false)}>Stop</button>
              </li>
              <li>
              <button className='butOn' onClick={() => setTime(t)}>Restart</button>       
              </li>
              </ul>
        </div>
    
  </div>
    );
  };

export default Stopwatch
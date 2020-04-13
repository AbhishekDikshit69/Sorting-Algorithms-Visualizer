import React from 'react';
import {getMergeSortAnimations,getBubbleSortAnimations,getQuickSortAnimations,getHeapSortAnimations,getInsertionSortAnimations} from './SortingAlgorithms.js';
import Navbar from "./Navbar";
import './SortingVisualizer.css';


// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      min:5,
      max:730,
      length:300,
      completed:false,
      action:false,
      width:2,
      currwidth:2
    };
  }

  componentDidMount() {
    this.resetArray();
  }
  
  handleChange(currlength){
    let currwidth=(300/currlength)*2;
    this.setState({length:currlength,currwidth});
  }
  resetArray() {
    this.setState({width:this.state.currwidth});
    const array = [];
    for (let i = 0; i < this.state.length; i++) {
      array.push(randomIntFromInterval(this.state.min, this.state.max));
    }
    this.setState({array:array,completed:false,action:false});
  
  }
  generateAnimation(animations,ANIMATION_SPEED_MS){
    this.setState({action:true});
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS*2);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight*100/this.state.max}%`;
           if (i===animations.length-1){
             this.setState({completed:true});
           } 
        }, i * ANIMATION_SPEED_MS*2);
      }
    }
  }
  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    this.generateAnimation(animations,1);
  }

  quickSort() {
    let array=[];
    const animations=getQuickSortAnimations(this.state.array,0,this.state.length-1,array);
    this.generateAnimation(animations,1);
  }

  heapSort() {
    const animations=getHeapSortAnimations(this.state.array);
    this.generateAnimation(animations,1);
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    this.generateAnimation(animations,(300/this.state.length)*.2);
  }
  insertionSort(){
    const animations=getInsertionSortAnimations(this.state.array);
    this.generateAnimation(animations,(300/this.state.length)*.2);
  }

  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }
  status(){
    if(this.state.completed && this.state.action)
      return <div className="action" style={{color: "green"}}>Sorting Complete!!!!</div>;
      else if(this.state.action)
        return <p class="saving action" style={{color:"#34495e"}}>Sorting in Progress<span>.</span><span>.</span><span>.</span></p>
        ;
      return ``;
  }
  render() {
    const {array} = this.state;

    return (<div className="root">
            <Navbar resetArray={()=>this.resetArray()}
             mergeSort={() => this.mergeSort()}
              bubbleSort={() => this.bubbleSort()}
                quickSort={() => this.quickSort()}
                 heapSort={() => this.heapSort()}
                  insertionSort={()=>this.insertionSort()}
                  handleChange={this.handleChange.bind(this)}
                  length={this.state.length}/>
            <div className="array-container">
            {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value* 100/this.state.max}%`,
              width:`${this.state.width}px`
            }}></div>
        ))}
        <div>{this.status()}</div>
              </div>
            </div>
             
    
     
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}
import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import "./Navbar.css";
import Slider from 'rc-slider';

export default class Navbar extends Component {
    
    render() {
        return (
            <header className="navbar">
                <h2>Sorting Algorithms Visualizer</h2>
    
                {/* <Slider className="slider"/> */}
                <div className="sorting-buttons">
                    <button onClick={this.props.mergeSort}>Merge Sort</button>
                    <button onClick={this.props.quickSort}>Quick Sort</button>
                    <button onClick={this.props.bubbleSort}>Bubble Sort</button>
                    <button onClick={this.props.heapSort}>Heap Sort</button>
                    <button onClick={this.props.insertionSort}>Insertion Sort</button>
                </div>
        <div style={{position:"absolute",display:"inline-block",color:"white",marginLeft:"63%",justifyContent:"center",marginTop:"-2px"}}>Array Size:{this.props.length}</div>
                <div className="slider">
                 <Slider
                defaultValue={310}
                min={50}
                max={300}
                step={50}
                onAfterChange={(level)=>this.props.handleChange(level)}
              />
            </div>
                <button className="genbutton" onClick={this.props.resetArray}>Generate New Array</button>
            </header>
        )
    }
}

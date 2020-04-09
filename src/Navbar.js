import React, { Component } from 'react';
import "./Navbar.css";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

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
                <button className="genbutton" onClick={this.props.resetArray}>Generate New Array</button>
            </header>
        )
    }
}

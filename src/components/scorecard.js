import React from 'react';
import './scorecard.css';
import NumberSquare from './numberSquare.js';
import Lock from './lock.js';
import PassChecks from './passChecks.js';
import Score from './score.js';

class Scorecard extends React.Component{
    constructor(props) {
        super(props);


        const scores = [
            { "color":"red",    "score":0,  "hidden":true },
            { "color":"yellow", "score":10, "hidden":true },
            { "color":"green",  "score":20, "hidden":true },
            { "color":"blue",   "score":30, "hidden":true },
            { "color":"grey",   "score":-5, "hidden":true }
        ]

        this.state = {
            rows: standardRows,
            locks: standardLocks,
            scores: scores
        }
    }

    handleMode(mode) {
        if (mode === 0) {
            this.setState({
                rows: standardRows,
                locks: standardLocks
            });
        }
        else {
            alert("Coming soon");
        }
    }

    handleUnclick(data){
        var copyRows = this.state.rows.slice();
        
        // get clicked square
        var copyRow = copyRows[data.y];
        var copySquare = copyRow[data.x];

        // set to unclicked
        copySquare.clicked = false;
        copyRow[data.x] = copySquare;   

        if (data.x > 0) {
            var prevClickUpdated = false
            var prevCount = 1;
            
            while (!prevClickUpdated && ((data.x - prevCount) >= 0)) {
                var prevSquare = copyRow[data.x - prevCount];
                prevSquare.disabled = false;
                copyRow[data.x - prevCount] = prevSquare;    
                prevCount++;

                if (prevSquare.clicked) {
                    prevClickUpdated = true;
                }
            }
        }

        this.setState({
            rows: copyRows
        });

        return;
    }

    handleClick(data) {        
        // handle unclick
        if(data.clicked){
            this.handleUnclick(data);
        }
        else {
            // get clicked square
            var copyRows = this.state.rows.slice();
            var copyRow = copyRows[data.y];
            var copySquare = copyRow[data.x];

            // set clicked
            copySquare.clicked = true;
            copyRow[data.x] = copySquare;

            // disable previous squares
            for (let i = 0; i < data.x; i++) {
                var sq = copyRow[i];
                sq.disabled = true;
                copyRow[i] = sq;
            }

            copyRows[data.y] = copyRow;

            this.setState({
                rows: copyRows
            });
        }
        
        this.checkRowState(data.y);
    }

    handleLockClick(data) {
        // if (data.clicked) {
        //     handleLockUnclick(data);
        //     return;
        // }
        
        // set LOCK
        var copyLocks = this.state.locks.slice();
        copyLocks[data.row].clicked = true;
        
        // TODO: set row to disabled
        // TODO: different locks when you close the row yourself vs. someone else
        
        this.setState({
            locks: copyLocks
        });
    }

    checkRowState(row) {
        var copyRows = this.state.rows.slice();
        var copyRow = copyRows[row];

        var rowClickCount = copyRow.filter(c => c.clicked).length;
        var disableValue = true;
        
        if (rowClickCount >= 5) {
            disableValue = false;
        }

        // enable/disable last two squares
        copyRow[copyRow.length - 1].disabled = disableValue;
        //copyRow[copyRow.length - 2].disabled = disableValue;

        copyRows[row] = copyRow;

        this.setState({
            rows: copyRows
        });
    }

    renderRow(row) {
        var squareList = this.state.rows[row];
        var lock = this.state.locks[row];

        return (
            <div className="sc-row">
                {squareList.map(s => <NumberSquare 
                                        data={s}
                                        onClick={()=> this.handleClick(s)}/>)}
                <Lock 
                    data={lock} 
                    onClick={()=>this.handleLockClick(lock)} />
            </div>
        )
    }

    renderScores(){
        var scores = this.state.scores;

        return(
            <div className="sc-scores">
                {scores.map(s => <Score 
                                    data={s}
                                    onClick={()=> this.handleScoreClick(s)}/>)}
            </div>
        )
    }

    handleScoreClick(score) {
        console.log("Score clicked: ", score);
    }
    
    render(){
        return (
            <div className="sc-wrapper">
                
                <div className="sc-sidebar">
                    <button onClick={()=>this.handleMode(0)}>Standard</button>
                    <button onClick={()=>this.handleMode(1)}>Mixed 1</button>
                </div>
                <div className="sc-container-rows">
                        {this.renderRow(0)}
                        {this.renderRow(1)}
                        {this.renderRow(2)}
                        {this.renderRow(3)}
                </div>

                <div className="sc-container-calculation">
                    <div className="sc-calculation">
                    </div>
                    <PassChecks />
                    {this.renderScores()}
                    {/* <div className="sc-scores">Score  [10]   [10]   [20]   [20]</div> */}
                </div>
            </div>
        )
    }


    
}

const standardRows = [
    [
        {"x":0, "y":0, "color":"red", "number":12, "clicked": false, disabled: false },
        {"x":1, "y":0, "color":"red", "number":11, "clicked": false, disabled: false },
        {"x":2, "y":0, "color":"red", "number":10, "clicked": false, disabled: false },   
        {"x":3, "y":0, "color":"red", "number":9, "clicked": false, disabled: false },
        {"x":4, "y":0, "color":"red", "number":8, "clicked": false, disabled: false },
        {"x":5, "y":0, "color":"red", "number":7, "clicked": false, disabled: false },
        {"x":6, "y":0, "color":"red", "number":6, "clicked": false, disabled: false },
        {"x":7, "y":0, "color":"red", "number":5, "clicked": false, disabled: false},
        {"x":8, "y":0, "color":"red", "number":4, "clicked": false, disabled: false },
        {"x":9, "y":0, "color":"red", "number":3, "clicked": false, disabled: false },
        {"x":10, "y":0, "color":"red", "number":2, "clicked": false, disabled: true },
    ],
    [
        {"x":0, "y":1, "color":"yellow", "number":12, "clicked": false, disabled: false },
        {"x":1, "y":1, "color":"yellow", "number":11, "clicked": false, disabled: false },
        {"x":2, "y":1, "color":"yellow", "number":10, "clicked": false, disabled: false },   
        {"x":3, "y":1, "color":"yellow", "number":9, "clicked": false, disabled: false },
        {"x":4, "y":1, "color":"yellow", "number":8, "clicked": false, disabled: false },
        {"x":5, "y":1, "color":"yellow", "number":7, "clicked": false, disabled: false },
        {"x":6, "y":1, "color":"yellow", "number":6, "clicked": false, disabled: false },
        {"x":7, "y":1, "color":"yellow", "number":5, "clicked": false, disabled: false},
        {"x":8, "y":1, "color":"yellow", "number":4, "clicked": false, disabled: false },
        {"x":9, "y":1, "color":"yellow", "number":3, "clicked": false, disabled: false },
        {"x":10, "y":1, "color":"yellow", "number":2, "clicked": false, disabled: true },
    ],
    [
        {"x":0, "y":2, "color":"green", "number":12, "clicked": false, disabled: false },
        {"x":1, "y":2, "color":"green", "number":11, "clicked": false, disabled: false },
        {"x":2, "y":2, "color":"green", "number":10, "clicked": false, disabled: false },   
        {"x":3, "y":2, "color":"green", "number":9, "clicked": false, disabled: false },
        {"x":4, "y":2, "color":"green", "number":8, "clicked": false, disabled: false },
        {"x":5, "y":2, "color":"green", "number":7, "clicked": false, disabled: false },
        {"x":6, "y":2, "color":"green", "number":6, "clicked": false, disabled: false },
        {"x":7, "y":2, "color":"green", "number":5, "clicked": false, disabled: false},
        {"x":8, "y":2, "color":"green", "number":4, "clicked": false, disabled: false },
        {"x":9, "y":2, "color":"green", "number":3, "clicked": false, disabled: false },
        {"x":10, "y":2, "color":"green", "number":2, "clicked": false, disabled: true },
    ],
    [
        {"x":0, "y":3, "color":"blue", "number":12, "clicked": false, disabled: false },
        {"x":1, "y":3, "color":"blue", "number":11, "clicked": false, disabled: false },
        {"x":2, "y":3, "color":"blue", "number":13, "clicked": false, disabled: false },   
        {"x":3, "y":3, "color":"blue", "number":9, "clicked": false, disabled: false },
        {"x":4, "y":3, "color":"blue", "number":8, "clicked": false, disabled: false },
        {"x":5, "y":3, "color":"blue", "number":7, "clicked": false, disabled: false },
        {"x":6, "y":3, "color":"blue", "number":6, "clicked": false, disabled: false },
        {"x":7, "y":3, "color":"blue", "number":5, "clicked": false, disabled: false},
        {"x":8, "y":3, "color":"blue", "number":4, "clicked": false, disabled: false },
        {"x":9, "y":3, "color":"blue", "number":3, "clicked": false, disabled: false },
        {"x":10, "y":3, "color":"blue", "number":2, "clicked": false, disabled: true },
    ]
];

const standardLocks = [
    {"row" : 0, "color" : "red", "clicked" : false },
    {"row" : 1, "color" : "yellow", "clicked" : false },
    {"row" : 2, "color" : "green", "clicked" : false },
    {"row" : 3, "color" : "blue", "clicked" : false }
];

export default Scorecard;
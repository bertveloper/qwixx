import React from 'react';
import './scorecard.css';
import NumberSquare from './numberSquare.js';
import Lock from './lock.js';

class Scorecard extends React.Component{
    constructor(props) {
        super(props);

        const rows = [
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
                //{"x":11, "y":0, "color":"red", "number":1, "clicked": false, disabled: true },
            ],
            [
                {"x":0, "y":1, "color":"red", "number":12, "clicked": false, disabled: false },
                {"x":1, "y":1, "color":"red", "number":11, "clicked": false, disabled: false },
                {"x":2, "y":1, "color":"red", "number":10, "clicked": false, disabled: false },
                {"x":3, "y":1, "color":"blue", "number":9, "clicked": false, disabled: false },
                {"x":4, "y":1, "color":"blue", "number":8, "clicked": false, disabled: false },
                {"x":5, "y":1, "color":"blue", "number":7, "clicked": false, disabled: false },
                {"x":6, "y":1, "color":"green", "number":6, "clicked": false, disabled: false },
                {"x":7, "y":1, "color":"green", "number":5, "clicked": false, disabled: false},
                {"x":8, "y":1, "color":"green", "number":4, "clicked": false, disabled: false },
                {"x":9, "y":1, "color":"yellow", "number":3, "clicked": false, disabled: false },
                {"x":10, "y":1, "color":"yellow", "number":2, "clicked": false, disabled: true },
                //{"x":11, "y":1, "color":"yellow", "number":1, "clicked": false, disabled: true },
            ]
        ];

        const locks = [
            {"row" : 0, "color" : "red", "clicked" : false },
            {"row" : 1, "color" : "yellow", "clicked" : false },
        ];

        this.state = {
            rows: rows,
            locks: locks
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
    
    render(){
        return (
            <div className="sc-wrapper">
                <div className="sc-sidebar">Status/info</div>
                <div className="sc-container-rows">
                        {this.renderRow(0)}
                        {this.renderRow(1)}
                        <div className="sc-row">row 3</div>
                        <div className="sc-row">row 4</div>
                </div>

                <div className="sc-container-calculation">
                    <div className="sc-calculation">
                    </div>
                    <div className="sc-pass">
                        <div>Mislukte worp: -5</div>
                        <div className="sc-pass-row">
                            <div className="sc-pass-opt"></div>
                            <div className="sc-pass-opt"></div>
                            <div className="sc-pass-opt"></div>
                            <div className="sc-pass-opt"></div>
                        </div>
                    </div>
                    <div className="sc-scores">Score  []   []   []   []</div>
                </div>
            </div>
        )
    }
}

export default Scorecard;
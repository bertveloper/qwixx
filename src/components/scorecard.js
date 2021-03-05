import React from 'react';
import './scorecard.css';
import NumberSquare from './numberSquare.js';
import Lock from './lock.js';
import './passChecks.css';
import Score from './score.js';

class Scorecard extends React.Component{
    constructor(props) {
        super(props);


        const scores = [
            { "color":"red",    "score":0,    "hidden":true },
            { "color":"yellow", "score":0,    "hidden":true },
            { "color":"green",  "score":0,    "hidden":true },
            { "color":"blue",   "score":0,    "hidden":true },
            { "color":"grey",   "score":0,    "hidden":true },
            { "color":"total",  "score":null, "hidden":false }
        ]

        const totalScore = 

        this.state = {
            isFullscreen: false,
            rows: standardRows,   // TODO: supply instead of hardcode
            locks: standardLocks, // TODO: supply instead of hardcode
            scores: scores,       // TODO: supply instead of hardcode
            passChecks: Array(4).fill(false),
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
        this.updateScore();
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

        this.updateScore();

        if (copyLocks.filter(l => l.clicked).length > 1) {
            this.endGame();
        }
    }

    handleLockUnclick(data){
        // todo;
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

    updateScore(){
        var colors = ["red", "blue", "green", "yellow"];

        // get all clicked squares, group by color
        var firstRowClickedSquares = this.state.rows[0].filter(x => x.clicked);
        var secondRowClickedSquares = this.state.rows[1].filter(x => x.clicked);
        var thirdRowClickedSquares = this.state.rows[2].filter(x => x.clicked);
        var fourthRowClickedSquares = this.state.rows[3].filter(x => x.clicked);
        var allClickedSquares = firstRowClickedSquares.concat(secondRowClickedSquares).concat(thirdRowClickedSquares).concat(fourthRowClickedSquares);
        
        var scoresCopy = this.state.scores.slice();

        colors.forEach(clr => {
            var lockClicked = this.state.locks.find(l => l.color === clr).clicked;
            var clickedSquares = allClickedSquares.filter(x => x.color === clr);
            var colorScore = scoresCopy.find(s => s.color === clr);
            colorScore.score = this.calculatePoints(clickedSquares.length, lockClicked);
        });

        this.setState({
            scores: scoresCopy
        })
    }

    calculatePoints(clickedSquares, lockClicked) {
        if (lockClicked) {
            clickedSquares++;
        }

        switch (clickedSquares) {
            case 1:
                return 1;
            case 2:
                return 3;
            case 3:
                return 6;
            case 4:
                return 10;
            case 5:
                return 15;
            case 6:
                return 21;
            case 7:
                return 28;
            case 8:
                return 36;
            case 9:
                return 45;
            case 10:
                return 55;
            case 11:
                return 66;
            case 12:
                return 78;
            default:
                return 0;
        }
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
        var scores = this.state.scores.filter(s => s.color != "total");
        var totalScore = this.state.scores.filter(s => s.color == "total")[0];
        
        return(
            <div className="sc-scores">
                {scores.map(s => <Score 
                                    data={s}
                                    onClick={()=> this.handleScoreClick(s)}/>
                            )}
                <Score data={totalScore} />
            </div>
        )
    }

    handleScoreClick(score) {
        console.log("Score clicked: ", score);

        var scoresCopy = this.state.scores.slice();
        var clickedScore = scoresCopy.find(s => s.color == score.color);
        clickedScore.hidden = !clickedScore.hidden;

        this.setState({
            scores: scoresCopy
        });
    }

    renderFullscreenBtn(){
        return(
            <div onClick={()=>this.fullScreen()} >
                {this.state.isFullscreen ? 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fillRule="evenodd" d="M8.25 3a.75.75 0 01.75.75v3.5A1.75 1.75 0 017.25 9h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25v-3.5A.75.75 0 018.25 3zm7.5 0a.75.75 0 01.75.75v3.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 0115 7.25v-3.5a.75.75 0 01.75-.75zM3 15.75a.75.75 0 01.75-.75h3.5c.966 0 1.75.784 1.75 1.75v3.5a.75.75 0 01-1.5 0v-3.5a.25.25 0 00-.25-.25h-3.5a.75.75 0 01-.75-.75zm12 1c0-.966.784-1.75 1.75-1.75h3.5a.75.75 0 010 1.5h-3.5a.25.25 0 00-.25.25v3.5a.75.75 0 01-1.5 0v-3.5z"></path></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fillRule="evenodd" d="M4.75 4.5a.25.25 0 00-.25.25v3.5a.75.75 0 01-1.5 0v-3.5C3 3.784 3.784 3 4.75 3h3.5a.75.75 0 010 1.5h-3.5zM15 3.75a.75.75 0 01.75-.75h3.5c.966 0 1.75.784 1.75 1.75v3.5a.75.75 0 01-1.5 0v-3.5a.25.25 0 00-.25-.25h-3.5a.75.75 0 01-.75-.75zM3.75 15a.75.75 0 01.75.75v3.5c0 .138.112.25.25.25h3.5a.75.75 0 010 1.5h-3.5A1.75 1.75 0 013 19.25v-3.5a.75.75 0 01.75-.75zm16.5 0a.75.75 0 01.75.75v3.5A1.75 1.75 0 0119.25 21h-3.5a.75.75 0 010-1.5h3.5a.25.25 0 00.25-.25v-3.5a.75.75 0 01.75-.75z"></path></svg>
                }
            </div>
        );
    }

    fullScreen(){
        var doc = window.document;
        var docEl = doc.documentElement;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
            this.setState({
                isFullscreen: true
            });
        }
        else {
            cancelFullScreen.call(doc);
            this.setState({
                isFullscreen: false
            });
        }
    }

    clickPassCheck(index){
        // get pass check
        var passChecksCopy = this.state.passChecks.slice();
        var passCheck = passChecksCopy[index];
        passChecksCopy[index] = !passCheck;

        var scoresCopy = this.state.scores;
        var passScoreCopy = scoresCopy.find(s => s.color === 'grey')
        var passScore = passChecksCopy.filter(p => p).length * -5;
        passScoreCopy.score = passScore;

        this.setState({
            passChecks: passChecksCopy,
            scores: scoresCopy
        });

        // if all checks clicked
        if (!passChecksCopy.includes(false)) {
            this.endGame();
        }
    }

    endGame(){
        var scoresCopy = this.state.scores.slice();
        var totalScore = scoresCopy.filter(s => s.color != "total").map(s => s.score).reduce((a, b) => a+ b);
        var totalScoreObj = scoresCopy.find(s => s.color === "total");
        totalScoreObj.score = totalScore;

        this.setState({
            scores: scoresCopy
        });

        window.alert("Einde! Score: " + totalScore);
    }

    renderPassChecks(){
        var passChecks = this.state.passChecks;

        return (
            <div className="sc-pass"> 
                <div className="sc-pass-expl">Mislukte ronde -5</div>
                <div className="sc-pass-checks">
                    {passChecks.map((p,i) =>  
                        <div className="sc-pass-check" onClick={()=>this.clickPassCheck(i)} >
                            {p ? String.fromCharCode(10060) : ""}
                        </div>
                    )}
                </div>
                    
                    
            </div>
        )
    }
    
    render(){
        return (
            <div className="sc-wrapper">
                
                <div className="sc-sidebar">
                    {this.renderFullscreenBtn()}
                    
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
                    {this.renderPassChecks()}
                    {/* <PassChecks data={this.state.passes} /> */}
                    {this.renderScores()}
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
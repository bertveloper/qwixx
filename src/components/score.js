import React from 'react';
import './score.css';

class Score extends React.Component {
    render(){
        var score = this.props.data;
        var classes = "sc-score sc-score-" + score.color;

        return (
            <div className={classes} 
                 onClick={this.props.onClick}>
                             {score.hidden ? "" : score.score}
            </div>
        );
    }
}

export default Score;
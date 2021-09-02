import React from 'react';
import './numberSquare.css';

class NumberSquare extends React.Component {
    
    render() {
        var divClasses = "sc-numsquare sc-numsquare-" + this.props.data.color;
        if (this.props.data.disabled) {
            divClasses += " sc-numsquare-disabled";
        }
        if (this.props.data.clicked) {
            divClasses += " sc-numsquare-clicked";
        }

        var btnClasses = "sc-num-btn sc-num-btn-" + this.props.data.color;
        if (this.props.data.disabled) {
            btnClasses += " sc-num-btn-disabled";
        }
        if (this.props.data.clicked) {
            btnClasses += " sc-num-btn-clicked";
        }
        if (this.props.data.highlight) {
            btnClasses += " sc-num-btn-highlight";
        }
        var id = "sc-numsquare-" + this.props.data.x + this.props.data.y;

        return (
                <div id={id} className={divClasses} >
                    <button className={btnClasses} 
                            onClick={this.props.onClick}
                            disabled={this.props.data.disabled}>
                        {this.props.data.clicked ? String.fromCharCode(10004) : this.props.data.number}
                    </button>
                </div>
        );
    }
}

export default NumberSquare;
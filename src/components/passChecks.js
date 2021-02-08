import React from 'react';
import './passChecks.css';

class PassChecks extends React.Component{
    render(){
        return(
            <div className="sc-pass">
                <div className="sc-pass-expl">Mislukte ronde -5</div>
                <div className="sc-pass-checks">
                    <input type="checkbox" className="sc-pass-check"></input>
                    <input type="checkbox" className="sc-pass-check"></input>
                    <input type="checkbox" className="sc-pass-check"></input>
                    <input type="checkbox" className="sc-pass-check"></input>
                </div>
            </div>
            
        );
    }
}

export default PassChecks;
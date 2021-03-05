import React from 'react';
import './passChecks.css';

class PassChecks extends React.Component{
    render(){
        
        console.log("Passes:", passes);

        return(
            <div className="sc-pass" >
                <div className="sc-pass-expl">Mislukte ronde -5</div>
                <div className="sc-pass-checks" onClick={this.props.onClick}>
                    {passes.map(p => 
                        <div className="sc-pass-check">
                            {p ? String.fromCharCode(10060) : ""}
                        </div>
                    )}
                </div>
            </div>
            
        );
    }
}

export default PassChecks;
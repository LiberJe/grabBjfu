import React, { Component } from 'react';
import { Button } from 'antd';


class App extends Component{
    render(){
        return (
            <div>
                <Button>hello</Button>
                <div>{this.props.children}</div>
            </div>
        );
    }
}


export default App;
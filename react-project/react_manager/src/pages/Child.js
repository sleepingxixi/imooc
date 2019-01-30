import React from 'react';

export default class Child extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state={
    //         count:0
    //     }
    // }

    // 以上注释的部分可以与该部分同样功能
    state={
        count:0
    };

    componentWillMount(){
        console.log("Will mount");
    }

    componentDidMount(){
        console.log("Did Mount");
    }

    componentWillUpdate(){
        console.log("Will Update");
    }

    componentDidUpdate(){
        console.log("Did Update");
    }

    componentWillReceiveProps(newProps){
        console.log("Will ReceiveProps-->"+newProps.name);
    }

    render(){
        return <div>
            <p>这是child部分的内容</p>
            <p>{this.props.name}</p>
        </div>
    }
}
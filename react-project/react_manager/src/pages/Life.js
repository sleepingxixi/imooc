import React from 'react';
import Child from './Child';
import './style.less';

export default class Life extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    addCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    // 如果不使用箭头函数进行声明，则在调用的过程需要显示绑定，即使用bind
    newAddCount=function(){
        this.setState({
            count:this.state.count+1
        })
    }

    render() {

        return <div className="content">
            <div><p>我就试一试</p></div>
            <p>React生命周期介绍</p>
            <button onClick={this.addCount} style={{width:100,height:50,marginRight:50}}>点击一下</button>
            <button onClick={this.newAddCount.bind(this)}>再点击一下</button>
            <p>{this.state.count}</p>
            <Child name={this.state.count}></Child>
        </div>
    }
}
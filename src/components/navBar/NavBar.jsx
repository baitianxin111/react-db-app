import React, { Component } from 'react';
import '../../style.css';

class NavBar extends Component {
	constructor(props) {//构造函数
	    super(props);
	    this.togglePage = this.togglePage.bind(this);
	}
    //自己写的数据
	togglePage(e) {
		// console.log(e.target)		
		let target = e.target || e.srcElement;
		var page = event.target.getAttribute('data-page'); 
		if (!page) return;
		console.log('page',page) 
		// console.log(target.dateSet)
		this.props.changePage(page);//承接父组件传过来的函数
	}

	
    
    render() {
		const page = this.props.page;
        return (
	        <div className="nav-bar" onClick={this.togglePage}>
                <div className="nav-item"  data-page="book" data-active={page=='book'}>
                	<span>图书</span>
                </div>
                <div className="nav-item" data-page="film" data-active={page=='film'}>
                	<span>电影</span>
                </div>
                <div className="nav-item" data-page="music" data-active={page=='music'}>
                	<span>音乐</span>
                </div>
	        </div>
        );
    }
}
{/* <NavBar page={this.state.page} changePage={this.changePage}/> */}
// 父组件传递一个值，一个函数，子组件通过this.props.xxxx来获取，页面上data-page 的使用
module.exports = NavBar;//底部导航栏的组件设计
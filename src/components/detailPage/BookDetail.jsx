import React ,{Component} from 'react';
// import reactDom from 'react-dom';
import '../../style.css';

class BookDetail extends Component {
    constructor (props) {
        super (props);
        console.log(this.props);
        this.goBack = this.goBack.bind(this);
    }
    goBack() {//返回
        this.props.seeDetail(false);//详情显示为false 即消失
    }
    render(){
        const goBack = this.goBack;
        const detailInfo = this.props.detailInfo;//将传过来的数据展示到页面
        const pointColor = 'pointer';
        console.log(this.props.detailInfo);
        function Title (props){
            return (<div className='detail-title'>
                <i  style={{cursor:pointColor}} onClick={goBack}>&lt;返回 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;图书名:</i>
                <span>{detailInfo.title}</span>
                </div>
            )
                 
        }
        function BriefInfo (props){
            const item = detailInfo
            return(
                <div className="brief-content">
                <div className="left-img"><img src={item.image} width="125" height="150"/></div>
                <div className="right-info">
                    <label>名称：</label><span className="info-label">{item.title}</span><br/>                                                                             
                    <label>作者：</label><span className="info-label color-gray">{item.author}</span><br/>
                    <label>出版社：</label><span className="info-label">{item.publisher}</span><br/>
                    <label>日期：</label><span className="info-label">{item.pubdate}</span><br/>
                    <label>评分：</label><span className="info-label">{item.rating.average}</span><br/>
                    <label>价钱：</label><span className="info-label">{item.price}</span><br/>
                    <span className="info-label">{item.tags.slice(0, 4).map((item,index) => <span className="tag-label" key={index}> {item.name} </span>)}</span><br/>  
                </div>
            </div>
            )

        }
        function Detail (props){
            return (
                <div className='detail-content'>
                <strong>作者简介</strong>
                <p>{detailInfo.author_intro}</p>
                <strong>作品简介</strong>
                <p>{detailInfo.summary}</p>
                </div>
            )

        }
        return <div className='detail-content'>
            <Title/>
            <BriefInfo/>
            <Detail/>
            </div>
    }
}
module.exports = BookDetail ;
import React ,{Component} from 'react';
import reactDOM from 'react-dom';
import '../../../src/style.css';

class BookList extends Component{
    constructor (props)
    {
        super(props);
        console.log('数据列表',this.props);
        this.seeDetail = this.seeDetail.bind(this); 
    }
    seeDetail (data) {
        console.log('数据列表',data);
        this.props.seeDetail(true,data);
    }
    render (){
        return <div className="list-content">
                    <ul>
                        {/* <li>列表数据</li> */}
                    {this.props.listItems.map((item) => 
                        <li key={item.id} onClick={this.seeDetail.bind(this, item)}>
                        <div className="left-img"><img src={item.images} width="90" height="105"/></div>
                        <div className="right-info">
                            <label>名称：</label><span className="info-label">{item.title}</span><br/>
                            <span>{item.tags&&item.tags.map((item,index) => <span className="tag-label" key={index}>{item.name}</span>)}</span><br/>                               
                            <label>作者：</label><span className="info-label color-gray">{item.author}</span><br/>
                            <label>评分：</label><span className="info-label">{item.rating&&item.rating.average}</span><br/>
                            <label>时间：</label><span className="info-label">{item.pubdate}</span>
                        </div>
                        </li>
                    )}
                    </ul>
            </div>
        // )
    }
}
module.exports = BookList;
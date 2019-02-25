import React ,{Component} from 'react';
import reactDOM from 'react-dom';
import '../../../src/style.css';

class MusicList extends Component{
    seeDetail (data) {
        console.log('数据列表',data);
        this.props.seeDetail(true,data);
    }

    constructor (props)
    {
        super(props);
        console.log('数据列表',this.props.listItems,this.props.listItems);
        this.seeDetail = this.seeDetail.bind(this); 
    }
   
    //自己做的音乐列表
    render (){
        return <div className="list-content">
            <ul>  
                <li>音乐列表啊</li>                 
                 {this.props.listItems.map((item)=>
                    <li key={item.id} onClick={this.seeDetail.bind(this,item)}>
                     <div className="left-img"><img src={item.image} width="90" height="105" alt=""/></div>
                    <div className="right-info">
                    <label>名称：</label><span className="info-label">{item.title}</span><br/>
                    {/* <label>歌手：</label><span className="info-label">{item.author}</span><br/> */}
                    <label>评分：</label><span className="info-label">{item.rating.average}</span><br/>
                    <label>歌曲列表：</label><span className="info-label">{item.tags.map((item)=><span>
                        {item.name}<br/>
                    </span>)}</span><br/>
                    {/* <label>歌手：</label><span className="info-label">{item.author}</span><br/> */}
                    </div> 
                    </li>
                    )}                 
            </ul>
        </div>
        
    }
}
module.exports = MusicList;
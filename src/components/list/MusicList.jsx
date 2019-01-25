import React ,{Component} from 'react';
import reactDOM from 'react-dom';
import '../../../src/style.css';

class MusicList extends Component{
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
    //自己做的音乐列表
    render (){
        return <div className="list-content">
            <ul>                   
                {this.props.listItems.map((item)=>
                    <li key={item.id} onClick={this.seeDetail.bind(this,item)}>
                    <div className="left-img"><img src={item.image} width="90" height="105" alt=""/></div>
                    <div className="right-info">
                    <label>名称：</label><span className="info-label">{item.title}</span><br/>
                    <label>歌手：</label><span className="info-label">{item.author}</span><br/>
                    </div>
                    </li>
                    )}                 
            </ul>
        </div>
        
    }
}
module.exports = MusicList;
import React ,{Component} from 'react';
import '../../style.css'
// import reactDOM from 'react-dom';
import BookDetail from './BookDetail';
import FilmDetail from './FilmDetail';
import MusicDetail from './MusicDetail';


class DetailPage extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }
    render () {
        if(!this.props.detailShow){
            return <div></div>
        }else{
            const page = this.props.page;
            const detailInfo = this.props.detailInfo;
            const seeDetail = this.props.seeDetail;//从父组件中接收传过来的数据
            const Detail = (function(page){//自执行函数根据page来走哪个页面
                switch(page)
                {
                    case 'book':
                        return <BookDetail detailInfo={detailInfo} seeDetail={seeDetail} />;
                    case 'film':
                        return <FilmDetail detailInfo={detailInfo} seeDetail={seeDetail} />;
                    case 'music':
                        return <MusicDetail detailInfo={detailInfo} seeDetail={seeDetail} />;
                }
            })(page)
            return <div className='detail-container'>{Detail}</div>
        }

         
    }
}
module.exports = DetailPage;
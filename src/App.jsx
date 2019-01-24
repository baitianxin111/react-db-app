import React , {Component} from 'react';
import reactDOM from 'react-dom';
import fetchJsonp from 'fetch-jsonp';
import '../src/style.css';
import NavBar from './components/NavBar/NavBar'




class App extends Component {
    constructor (props){
       super(props);
       this.state = {page: 'book', dataOffset: 0, resetInput: true, 
        detailShow: false, detailInfo: null, listItems: []};
        this.getData  = this.getData.bind(this);
    }
    //先获取数据
    getData (type, searchInput, start, isUnion, callback) {
        const params = {
            'book': ['https://api.douban.com/v2/book/search?q=', '图书', 'bookList', 'books'],
            'film': ['https://api.douban.com//v2/movie/search?q=', '电影', 'filmList', 'subjects'],
            'music': ['https://api.douban.com/v2/music/search?q=', '音乐', 'musicList', 'musics']
        };
        const param = searchInput || params[type][1] ;
        const self = this;
        fetchJsonp(encodeURI(params[type][0] + param + "&start=" + start))
            .then( function(res) {
                return res.json();
                
            }).then(function (data) {
                console.log(data);
            }).catch(function (eror) {
                console.log(error)
            })

    }
    componentDidMount() {
        this.getData(this.state.page);
    }
    render  (){
        return (
         <div className="app">
         车的股份
         <NavBar/>
         </div>
        )
    } 
}
export default App;
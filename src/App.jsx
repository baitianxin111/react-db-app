import React , {Component} from 'react';
import reactDOM from 'react-dom';
import fetchJsonp from 'fetch-jsonp';
import '../src/style.css';
import NavBar from './components/NavBar/NavBar'
import SearchInput from './components/SearchInput/SearchInput'




class App extends Component {
    constructor (props){
       super(props);
       this.state = {
         page: 'book', 
         dataOffset: 0, 
         resetInput: true, 
         detailShow: false, 
         detailInfo: null, 
         listItems: []
    };
       this.getData  = this.getData.bind(this);
    }
    //切换底部导航
    changePage (value){
        console.log(value)
       this.setState({
            page:value,
            dataOffset :0,
            resetInput:true,
            listItems: []
       },function(){
           this.getData(this.state.page,'',this.state.dataOffset)
       })
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
                let listItems;
                if(isUnion){
                    this.state.listItems.map(function (e) {
                        let len = this.state.listItems.length;
                        while (len--) {
                            if (data[params[type][3]][len].id == a.id) {
                                data[params[type][3]].splice(len, 1);
                                break;
                            }
                            listItems = that.state.listItems.concat(data[params[type][3]]).filter(function(item) {
                                return !!item.id;
                            });
                        }
                    })

                }else{
                    listItems = data[params[type][3]].filter(function (item) {
                        return !!item.id;
                    })
                    
                }
                //属性重新绑定
                self.setState({
                  listItems:listItems      
                },function(){
                    callback && callback()
                })
            }).catch(function (error) {
                console.log(error)
            })

    }
    componentDidMount() {
        this.getData(this.state.page);
    }
    render  (){
        return (
         <div className="app">
         随便写写的主页面
         <NavBar page = {this.state.page} changePage = {this.state.changePage}/>
         <SearchInput/>
         </div>
        )
    } 
}
module.exports =  App;
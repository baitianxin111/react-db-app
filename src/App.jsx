import React , {Component} from 'react';
import reactDOM from 'react-dom';
import fetchJsonp from 'fetch-jsonp';
import '../src/style.css';
import NavBar from './components/NavBar/NavBar'
import List from './components/list/List'
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
       this.changePage = this.changePage.bind(this);
       this.getData  = this.getData.bind(this);
       this.search = this.search.bind(this);
       this.loadMore = this.loadMore.bind(this);
       this.refresh = this.refresh.bind(this);
       
    }
     //切换底部导航
	changePage(value) {
		this.setState({
			page: value,
            listItems: [],
            resetInput: true,
            dataOffset: 0
		}, function() {
            this.getData(this.state.page, '', this.state.dataOffset);
        });
              
	}
    //搜索函数
    search (value){
        this.setState({
            listItems:[],
            resetInput:false
        },function(){
            this.getData(this.state.page,value,this.state.dataOffset);
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
                // console.log(data);
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
    //上拉刷新
    refresh(callback){
        this.setState({
            dataOffset:0,
        },function(){
            // type, searchInput, start, isUnion, callback 参数，刷新没有数据
            this.getData(this.state.page, '', this.state.dataOffset, false, callback)
        })
    }
    //下拉获取更多
    loadMore(callback){
        this.setState({
            dataOffset : this.state.dataOffset + 20
        },function(){
            this.getData(this.state.page, '', this.state.dataOffset, false, callback)
        })
    }
    //详情页
    seeDetail(value,data){
        this.setState({
            detailShow:value,
            detailInfo:data
        })
    }
    componentDidMount() {
        this.getData(this.state.page);
    }
    render  (){
        return (
         <div className="app">
         随便写写的主页面
         <SearchInput search={this.search} page={this.state.page}  resetInput = {this.state.resetInput} />
         <List page={this.state.page} seeDetail={this.seeDetail} listItems={this.state.listItems}
          refresh={this.refresh} loadMore={this.loadMore} /> 
         <NavBar page={this.state.page} changePage={this.changePage}/>
         
         </div>
        )
    } 
}
module.exports =  App;
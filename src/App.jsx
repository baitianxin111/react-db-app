import React , {Component} from 'react';
import reactDOM from 'react-dom';
import fetchJsonp from 'fetch-jsonp';
import '../src/style.css';
import NavBar from './components/NavBar/NavBar';
import List from './components/list/List';
import SearchInput from './components/SearchInput/SearchInput';
import DetailPage from './components/detailPage/DetailPage';




class App extends Component {
    constructor (props){
       super(props);
       this.state = {
         page: 'book', 
         dataOffset: 0, 
         resetInput: true, 
         detailShow: false, //详情
         detailInfo: null, //详情
         listItems: []
    };
       this.changePage = this.changePage.bind(this);
       this.getData  = this.getData.bind(this);
       this.search = this.search.bind(this);
       this.loadMore = this.loadMore.bind(this);
       this.refresh = this.refresh.bind(this);
       this.seeDetail = this.seeDetail.bind(this);
       
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
    //异步函数的另一种写法
    // async changePage(value){
    //     await this.setState({
    //         page: value,
    //         listItems: [],
    //         resetInput: true,
    //         dataOffset: 0
    //     },function(){
    //         this.getData(this.state.page, '', this.state.dataOffset);
    //     })
    // }
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
            detailShow:value,//显示
            detailInfo:data//显示信息
        })
    }
    componentDidMount() {//周期函数
        this.getData(this.state.page);
    }
    render  (){
        return (
         <div className="app">
         <SearchInput search={this.search} page={this.state.page}  resetInput = {this.state.resetInput} />
         <List page={this.state.page} seeDetail={this.seeDetail} listItems={this.state.listItems}
          refresh={this.refresh} loadMore={this.loadMore} /> 
         <NavBar page={this.state.page} changePage={this.changePage}/>
         <DetailPage  page={this.state.page} detailShow={this.state.detailShow} detailInfo={this.state.detailInfo} seeDetail={this.seeDetail}/>
         
         </div>
        )
    } 
}
module.exports =  App;
//关于setState
// this.setState的使用
// 调用setState，组件的state并不会立即改变，setState只是把要修改的状态放入一个队列中，
// React会优化真正的执行时机，并且React会出于性能原因，
// 可能会将多次setState的状态修改合并成一次状态修改。
// 所以不要依赖当前的State，计算下个State。
//父-子==》 通过state 函数传递，子通过props来接收
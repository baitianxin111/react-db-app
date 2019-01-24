import React ,{Component} from 'react'
import reactDOM from 'react-dom'
import '../../../src/style.css'

class SearchInput extends Component{

   constructor (props){
        super(props);
        this.search = this.search.bind(this);
   } 
   //搜索输入框触发查询
   handleChange(event) {
    this.setState({
        searchInput: event.target.value
    }, () => {
        var that = this;
        if (that.searchTimer) clearTimeout(that.searchTimer);
        that.searchTimer = setTimeout(() => {                
            that.search();
        }, 500);
    });
 
}
   search (){
    this.props.search (this.state.search);
   }
   render (){
    let placeholder;
    const seartInput = this.props.seartInput?'':this.props.seartInput;
    switch (this.props.page) {
        case 'book':
          placeholder = '书名、作者、ISBN';
          break;
        case 'film':
          placeholder = '电影、影人、电视剧';
          break;
        case 'music':
          placeholder = '唱片名、表演者';
          break;
    }
       return (
        <div className="search-bar">  
         <input type="text" placeholder={placeholder} value={seartInput} onChange={this.handleChange}/>
         <button onClick={this.search}>搜索</button>
        </div> 

       )
   }
}
module.exports = SearchInput;
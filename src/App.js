import React, { Component } from "react";
import "./App.css";
import Loader from "./Loader/Loader";
import Table1 from "./Table/Table1";
import Filter from './Filter/Filter';
import Pagination from './Pagination/Pagination';

class App extends Component {
  state = {
    isLoading: true,
    data: [],
    sort: " asc",
    sortField: "singer",
    currentPage: 1,
    rowsToDisplay: 5,
    selectedGanre: "all",
    selectedYear: "all"
  };

  async componentDidMount() {
    const response = await fetch("./songs.json");
    const data = await response.json();

    this.setState({
      isLoading: false,
      data
    });
  }

  

  setSelectedGanre = ganre => {
    this.setState({
      selectedGanre: ganre})
      // data: this.state.data.filter(song=>(
      //   song.ganre == ganre
      // ))
  }

  setSelectedYear = year => {
    this.setState({selectedYear: year});
  }

  filterData = (data, ganre, year)=> {
    if(ganre==='all'&&year==="all"){
      return data
    } else if (ganre!=='all'&&year==="all"){
      return data.filter(song=> (
        song.ganre ==ganre
      ))
    } else if(ganre==='all'&&year!=="all"){
      return data.filter(song=> (
        song.year ==year
      ))
    } else if(ganre!=='all'&&year!=="all"){
      return data.filter(song=> (
        song.year ==year
      )).filter(song=>(
        song.ganre==ganre
      ))
    }
  }

  sortBy = (key) =>{
    this.state.sort === 'asc' ? this.setState({
      data: this.state.data.sort(function(a,b){
        
        if(a[key] < b[key]) return 1;
        if(a[key] > b[key]) return -1;
        return 0;
      }),
      sort: this.state.sort === 'asc' ? 'desc' : 'asc'
    }) : this.setState({
      data: this.state.data.sort(function(a,b){
        
        if(a[key] < b[key]) return -1;
        if(a[key] > b[key]) return 1;
        return 0;
      }),
      sort: this.state.sort === 'asc' ? 'desc' : 'asc'
    })
  }

  render() {

    const filteredData = this.filterData(this.state.data, this.state.selectedGanre, this.state.selectedYear);
    
    const indexOfLastPost = this.state.currentPage *this.state.rowsToDisplay;
    const indexOfFirstPost = indexOfLastPost - this.state.rowsToDisplay;
    const currentRows = filteredData.slice(indexOfFirstPost,indexOfLastPost);
    
    const paginate = (pageNumber) => {
      this.setState({currentPage: pageNumber})
    }

    return (
      <div className="App">
       
        
        {this.state.isLoading ? (
          <Loader />
        ) : <>
          <Table1 data={currentRows} sortBy={this.sortBy}/>
          <Pagination postsPerPage={this.state.rowsToDisplay} totalPosts={this.state.data.length} paginate={paginate} currentPage={this.state.currentPage}/>
          <div className="page-size">
                Songs to show:
                <span className={this.state.rowsToDisplay ===3 ?'active-button': null} onClick={() => this.setState({ rowsToDisplay: 3 })}>3</span>
                <span className={this.state.rowsToDisplay ===5 ?'active-button': null} onClick={() => this.setState({ rowsToDisplay: 5 })}>5</span>
                <span className={this.state.rowsToDisplay ===10 ?'active-button': null} onClick={() => this.setState({ rowsToDisplay: 10 })}>
                  10
                </span>
              </div>
          
          <Filter data={this.state.data} setSelectedGanre={this.setSelectedGanre} setSelectedYear={this.setSelectedYear} year={this.state.selectedYear} ganre={this.state.selectedGanre}/>
        </>}
        
      
      </div>
    )
  }
}

export default App;

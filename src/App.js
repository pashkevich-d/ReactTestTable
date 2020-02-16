import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";
import Loader from "./Loader/Loader";
import Table from "./Table/Table";
import _ from "lodash";
import Filter from './Filter/Filter';
import FilteredData from './FilteredData/FilteredData';

class App extends Component {
  state = {
    isLoading: true,
    data: [],
    sort: " asc",
    sortField: "singer",
    currentPage: 0,
    rowsToDisplay: 3,
    selectedGanre: "all",
    selectedYear: "all"
  };



  async componentDidMount() {
    const response = await fetch("./songs.json");
    const data = await response.json();

    this.setState({
      isLoading: false,
      data: _.orderBy(data, this.state.sortField, this.state.sort)
    });
  }

  onSort = sortField => {
    const clonedData = this.state.data.concat();
    const sortType = this.state.sort === "asc" ? "desc" : 'asc';

    const orderedData = _.orderBy(clonedData, sortField, sortType);

    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    });
  };

  pageChangeHandler = ({ selected }) => {
    this.setState({
      currentPage: selected
    });
  };

  changeDisplayedItems = count => {
    this.setState({
      pageRangeDisplayed: count
    });
  };

  setSelectedGanre = ganre => {
    this.setState({selectedGanre: ganre});
    // console.log(this.state.selectedGanre)
  }

  setSelectedYear = year => {
    this.setState({selectedYear: year});
  }

  render() {
    const displayData = _.chunk(this.state.data, this.state.rowsToDisplay)[
      this.state.currentPage
    ];

    const pageCount = Math.ceil(
      this.state.data.length / this.state.rowsToDisplay
    );

    
    

    return (
      <div className="App">
        
        {this.state.isLoading ? (
          <Loader />
        ) : <div className="content-wrap">
          {this.state.selectedYear==='all'&& this.state.selectedGanre==='all'
              ? <React.Fragment> 
              <Table
                onSort={this.onSort}
                data={displayData}
                sort={this.state.sort}
                sortField={this.state.sortField}
              />     
                
              {this.state.data.length > 3 ? (
                <React.Fragment> 
                  <ReactPaginate
                    itemsCountPerPage={"3"}
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={4}
                    pageRangeDisplayed={6}
                    onPageChange={this.pageChangeHandler}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    forcePage={this.state.currentPage}
                  />
                  <div className="bottom-wrap">
                  <div className="page-size">
                    Songs to show:
                    <span onClick={() => this.setState({ rowsToDisplay: 3 })}>3</span>
                    <span onClick={() => this.setState({ rowsToDisplay: 5 })}>5</span>
                    <span onClick={() => this.setState({ rowsToDisplay: 10 })}>
                      10
                    </span>
                  </div>
                  <Filter data={this.state.data} setSelectedGanre={this.setSelectedGanre} setSelectedYear={this.setSelectedYear} year={this.state.selectedYear} ganre={this.state.selectedGanre}/>
                  </div>
                  </React.Fragment> )
                  : null}   
                  
                </React.Fragment>
                
                             
            : <React.Fragment>
            <FilteredData data={this.state.data} year={this.state.selectedYear} ganre={this.state.selectedGanre}/>
            <Filter data={this.state.data} setSelectedGanre={this.setSelectedGanre} setSelectedYear={this.setSelectedYear} year={this.state.selectedYear} ganre={this.state.selectedGanre}/>
            </React.Fragment>
        } </div>}
       
      </div>
    );
  }
}

export default App;

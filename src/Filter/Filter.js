import React from 'react';

export default class Filter extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
          value: "",
          data: this.props.data,
          selectedGanre: "all",
          selectedYear: "all"

          
        };
      }


  handleChangeGanre = event => {
    this.setState({ selectedGanre: event.target.value });
  };

  wrapperFunction = (event) => {
    this.props.setSelectedYear(this.state.selectedYear)
    this.setState({ selectedYear: event.target.value });
    
  }

  getUnique(arr, comp) {
    const unique = arr
      .map(e => e[comp])

      .map((e, i, final) => final.indexOf(e) === i && i)

      .filter(e => arr[e])

      .map(e => arr[e]);
    
    return unique;
  }

    render(){

    const data = this.state.data;
    

    const uniqueYear = this.getUnique(data, "year");
    const uniqueCouse = this.getUnique(data, "ganre");
    

        return (<div className="filter">
                <select className="select"
                  value={this.props.ganre}
                  onChange={event=>this.props.setSelectedGanre(event.target.value)}
                >
                  <option value="all">All</option>
                  {uniqueCouse.map(course => (
                    <option key={course.id} value={course.ganre}>
                        
                      {course.ganre}
                    </option>
                  ))}
                </select>

              <select
              className="select"
                  value={this.props.year}
                    onChange={event=>this.props.setSelectedYear(event.target.value)}
                    // onChange={this.setYear}
                >
                  <option value="all">All</option>
                  {uniqueYear.map(course => (
                    <option key={course.id} value={course.year}>
                        
                      {course.year}
                    </option>
                  ))}
                </select>
            </div>
        )
    }
    
}
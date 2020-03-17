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
    const uniqueGanres = [];
    const uniqueYears = [];
    
    uniqueCouse.map(song => {
      uniqueGanres.push(song.ganre)
    })
    uniqueGanres.sort()

    uniqueYear.map(song => {
      uniqueYears.push(song.year)
    })
    uniqueYears.sort()

    const handleGanreChange = (e) => {
      this.props.setSelectedGanre(e);
      this.props.paginate(1)
    }

    const handleYearChange = (e) => {
      this.props.setSelectedYear(e);
      this.props.paginate(1)
    }
    

        return (<div className="filter">
                <select className="select"
                  value={this.props.ganre}
                  onChange={event=>handleGanreChange(event.target.value)}
                >
                  <option value="all">All</option>
                  {uniqueGanres.map((ganre,id) => (
                    <option key={id} value={ganre}>
                        
                      {ganre}
                    </option>
                  ))}
                </select>

              <select
              className="select"
                  value={this.props.year}
                    onChange={event=>handleYearChange(event.target.value)}
                >
                  <option value="all">All</option>
                  {uniqueYears.map((year,id) => (
                    <option key={id} value={year}>
                        
                      {year}
                    </option>
                  ))}
                </select>
            </div>
        )
    }
    
}
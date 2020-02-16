import React from 'react';

export default props => {

    const filteredYears = props.data.filter(function(result) {
        return result.year === props.year;
      });
    
    const filteredGanres = props.data.filter(function(result) {
      return result.ganre === props.ganre;
    });

    const filteredSongs = filteredGanres.filter(function(result) {
      return result.year === props.year;
    });

    return <div>

        {props.year !== 'all' && props.ganre !== 'all'
        ? <table>
        <thead>
            <tr>
              <th>Singer</th>
              <th>Song</th>
              <th>Ganre</th>
              <th>Year</th>
            </tr>
        </thead>
        <tbody>{filteredSongs.map(item => (
                              
          <tr key={item.id}>
            <td>{item.singer}</td>
            <td>{item.song}</td>
            <td>{item.ganre}</td>
            <td>{item.year}</td>
            </tr>                 
        ))}  </tbody>
        </table> :
        <React.Fragment>
          
        <table>
        <thead>
            <tr>
              <th>Singer</th>
              <th>Song</th>
              <th>Ganre</th>
              <th>Year</th>
            </tr>
        </thead>
            <tbody>
                {filteredGanres.map(item => (
                              
                  <tr key={item.id}>
                    <td>{item.singer}</td>
                    <td>{item.song}</td>
                    <td>{item.ganre}</td>
                    <td>{item.year}</td>
                    </tr>                 
                  
                ))}
            </tbody>
        </table>
        <table>
            <tbody>
                {filteredYears.map(item => (
                              
                  <tr key={item.id}>
                    <td>{item.singer}</td>
                    <td>{item.song}</td>
                    <td>{item.ganre}</td>
                    <td>{item.year}</td>
                    </tr>                 
                  
                ))}
            </tbody>
        </table>
        </React.Fragment>}
        
    </div>
}
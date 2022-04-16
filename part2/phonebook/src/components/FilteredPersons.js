const FilteredPersons = props => {
    return(
        <table>
        <tbody>
          {props.showFiltered.map(element =>
            <tr key={element.id}>
              <td>{element.name}</td><td>{element.number}</td><td><button id={element.id} onClick={props.onDelete}>delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    )
}

export default FilteredPersons;
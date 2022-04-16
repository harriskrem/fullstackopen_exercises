import Weather from "./Weather";

const CountriesExtra = ({element}) => {
    return (
        <div>
            <h2>{element.name.common}</h2>
            <p>capital {element.capital}</p>
            <p>area {element.area}</p>
            <h4>languages: </h4>
            <ul>
                {Object.values(element.languages).map(key => <li key={key}>{key}</li>)}
            </ul>
            <div><img src={element.flags['png']} /></div>
            
        </div>
    );
};

export default CountriesExtra;
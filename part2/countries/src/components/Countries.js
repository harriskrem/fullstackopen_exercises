import CountriesExtra from "./CountriesExtra";
import Weather from "./Weather";

const Countries = props => {
    if (props.listCountries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        );
    }
    if (props.listCountries.length > 1 || props.listCountries.length === 0) {
        return (
            <>
                {props.listCountries.map((element) => {
                    if (props.buttons.includes(element.name.common)) {
                        return (
                            <div key={element.name.common}>
                                <button onClick={props.handleButtonClick} id={element.name.common} >hide</button>
                                <CountriesExtra element={element} />
                            </div>
                        );
                    }
                    return (
                        <div key={element.name.common} >
                            <span>{element.name.common}</span>  <button onClick={props.handleButtonClick} id={element.name.common} > show </button>
                        </div>
                    );
                })}
            </>
        )
    }
    return (
        <>
            {props.listCountries.map(element =>
                <div key={element.name.common}>
                   <CountriesExtra element={element} />
                   <Weather element={element} weather={props.weather} setWeather={props.setWeather} />
                </div>
            )}
        </>
    );
}

export default Countries;
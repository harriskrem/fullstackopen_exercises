const Statistics = props => {

    if (props.good === 0 && props.neutral === 0 & props.bad === 0) {
        return (<div>No feedback given</div>)
    }

    return (
        <div>
            <table>
                <tr>
                    <td>good</td> <td>{props.good}</td> 
                </tr>
                <tr>
                    <td>neutral</td> <td> {props.neutral} </td>
                </tr>
                <tr>
                    <td>bad</td> <td> {props.bad} </td>
                </tr>
                <tr>
                    <td>all</td> <td> {props.good + props.neutral + props.bad} </td>
                </tr>
                <tr>
                    <td>average</td> <td> {(props.good + props.neutral + props.bad) / 3} </td>
                </tr>
                <tr>
                    <td>positive</td> <td>{(props.good / (props.good + props.neutral + props.bad) * 100)} &#37; </td>
                </tr>
            </table>
        </div>
    )
}

export default Statistics
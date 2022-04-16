const Total = (props) => {


    return (
        <>
            <h4>
                total of {
                    props.parts.reduce(
                        (acc, curr) => acc + curr.exercises, 0
                    )
                } exercises
            </h4>
        </>
    )
}

export default Total;
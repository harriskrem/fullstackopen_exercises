const PersonForm = ({handleSubmit, newName, newNumber, handleInputchange, handleNumberchange}) => {
    return (
        <form onSubmit={handleSubmit} >
            <div>name: <input value={newName} onChange={handleInputchange} /></div>
            <div>number: <input value={newNumber} onChange={handleNumberchange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;
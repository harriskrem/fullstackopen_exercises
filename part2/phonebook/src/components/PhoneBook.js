import Notification from "./Notification";

const Phonebook = props => {

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={props.message} notificationType={props.notificationType} />
            <div>filter shown with <input value={props.filteredName} onChange={props.handleFilteredName} /></div>
        </div>
    )
}

export default Phonebook;
const Notification = props => {

    const addStyle = {
        color: 'green',
        backgroundColor: '#d9d9d9',
        border: 'green 1px solid',
        padding: '10px',
        width: '50%',
        marginBottom: '15px',
        borderRadius: '10px'
    }

    const errorStyle = {
        color: 'red',
        backgroundColor: '#d9d9d9',
        border: 'red 1px solid',
        padding: '10px',
        width: '50%',
        marginBottom: '15px',
        borderRadius: '10px'
    }

    const notificationStyle = props.notificationType === 'add' ? addStyle : errorStyle;

    if(props.notificationType === '') {
        return null;
    }
    return(
        <div style={notificationStyle}>
            {props.message}
        </div>
    );
}

export default Notification;
const Notification = ({ errorMessage, successMessage }) => {

  if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  } else if (successMessage) {
    return (
      <div className="success">
        {successMessage}
      </div>
    )
  }

  return null

}

export default Notification
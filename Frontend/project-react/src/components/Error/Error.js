import "./error.css"
import PropTypes from 'prop-types'

export default function Error({error}){
    return(
        <p className="error">{error}</p>
    )
}

Error.propTypes = {
    error: PropTypes.string.isRequired,
  }
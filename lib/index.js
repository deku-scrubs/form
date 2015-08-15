/**
 * Imports
 */

import element from 'magic-virtual-element'
import serialize from 'form-serialize'

/**
 * Default props
 */

const defaultProps = {
  loading: false
}

/**
 * Render
 */

function render ({props}) {
  const {loading, children, onSubmit} = props

  return (
    <form noValidate onSubmit={handleSubmit}>
      {children}
    </form>
  )

  function handleSubmit (e) {
    e.preventDefault()

    // Don't allow multiple concurrent submissions
    if (loading || !onSubmit) {
      return
    }

    const form = e.target
    if (form.checkValidity()) {
      onSubmit(serialize(form), form)
    }
  }
}

/**
 * Exports
 */

export default {render, defaultProps}

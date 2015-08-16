
# form

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Deku form component.  Supports validation and casting.

## Usage

```javascript
function render ({state}) {
  const {loading} = state

  return (
    <Form onSubmit={handleSubmit} validate={validateUser} cast={castUser} loading={loading}>
      <TextField name='email' />
      <TextField name='password' />
    </Form>
  )

  function handleSubmit (user, handleError) {
    dispatch('create_user', {
      onSuccess: handler('user_created'),
      onFailure: handleError
    })
  }
}
```

### Props

  * `onSubmit` - Handle the submit event.  Is not called when the form is invalid or `loading` is true.
  * `validate` - Expects a model, and returns:
        
        {
          valid: Boolean,
          errors: [
            {
              field: String,
              message: String
            }
          ]
        }

  * `cast` - A casting function that accepts the model and outputs a new model.  Called before the model is passed to `validate` and `onSubmit`.
  * `loading` - Indicates whether or not the form is currently processing an asynchronous action.


### Nested fields

Nested field names use the 'square' syntax defined in this module: dominicbarnes/square.

## Custom form controls

If you want to make your own form controls that work with this `Form` component, all they need to do is listen for the `onInvalid` event, and then display the error specified by `control.validationMessage`, and optionally clear that validation message using `setCustomValidity` on any change.  That's it.

```javascript
function render ({state}, setState) {
  return (
    <input type='text' onChange={handleChange} onInvalid={handleInvalid} />
  )

  function handleChange (e) {
    e.target.setCustomValidity('')
  }

  function handleInvalid (e) {
    setState({error: e.target.validationMessage})
  }
}
```

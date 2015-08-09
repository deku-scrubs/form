
# form

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Simple deku form component.  It has no state of its own, and just eliminates a bit of the boilerplate of writing form components.  It is promise-aware, and will translate a promise-returning submit function into `onSuccess` and `onFailure` events.

## Props

  * `onSubmit` called when the form is submitted (unless the form is invalid or loading).  May return a promise, which will be used to generate `onSuccess` and `onFailure` events.
  * `onSuccess` if `onSubmit` returns a promise, this is called in the success case.
  * `onFailure` if `onSubmit` returns a promise, this is called in the failure case.
  * `valid` whether or not the form is currently valid - invalid state blocks submissions
  * `loading` whether or not the form is currently processing a submission - loading state blocks submissions

## Example

```javascript
function render ({props, state}, setState) {
  return (
    <Form onSubmit={submit} onSuccess={success} onFailure={failure} valid={state.valid} loading={state.loading}>
      <input type='text' name='username'>
      {state.message}
    </Form>
  )

  function submit () {
    setState({loading: true})
    return createUser(state.user)
  }

  function success () {
    setState({
      loading: false,
      message: 'user created!'
    })
  }

  function failure (reason) {
    setState({
      valid: false,
      loading: false,
      message: 'user creation failed (' + reason + ')')
    })
  }
}
```

## Installation

    $ npm install @deku-scrubs/form

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

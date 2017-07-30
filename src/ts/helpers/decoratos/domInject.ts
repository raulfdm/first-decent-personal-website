//creating a dectoration to do Lazy loading
export function domInjection(selector: string | Window) {

  return function (target: any, key: string) {
    /*
      we must return a function
      This function receives 2 parameters:
        1. target: will be the "this" context from who are been decorated
        2. key: will be the name of the property
     */
    let element: JQuery

    /*
      Here we've created getter function who will check if
      the element is already filled. If not, we'll do it requiring it from DOM tree.
      Then, we'll return this element
    */
    const getter = function () {
      if (!element) {
        element = $(selector)
      }
      return element
    }

    /*
      Object.defineProperty takes an object to insert a new property valued on it.
      The key will be the name of this property, and in it value will be a get function that
      we'll pass our getter function.
    */
    Object.defineProperty(target, key, {
      get: getter
    })

    /*
      Doing that, when we would use consult the property in it local, will call a get method
      who will invoke our function to look at DOM and return the element
    */
  }
}

/**
 * 拓展存储对象方法：
 * sessionStorage
 * localStorage
 */
class Storage {
  constructor(core) {
    // stafs here
    this.core = core
  }
  async getLive(key, callback) {
    if (typeof callback !== 'function') {
      console.debug('Callback is not a function')
    } else {
      if (typeof key !== 'undefined' && key !== null && typeof key === 'string') {
        let that_ = this
        const values = await that_.asyncGet(key)
        /** *************CALLBACK FUNC******************
        *   local storage is sunc and we set a callbacn function
        *  	for getting live values
        *
        *********************************************/
        callback(values)
      } else {
        callback(null)
      }
    }
  }
  get(key) {
    let values = window[this.core].getItem(key) || ''
    let isObject = values.search('{') >= 0
    let isArray = values.search(']') >= 0
    if (isObject || isArray) {
      return JSON.parse(window[this.core].getItem(key)) || {}
    } else {
      return values
    }
  }
  set(key, values = null) {
    let that_ = this
    if (typeof key !== 'undefined' && key !== null && typeof values === 'object') {
      window[that_.core].setItem(key, JSON.stringify(values))
    } else if (values !== '' && values !== void 0) {
      window[that_.core].setItem(key, values)
    } else {
      console.debug('undefined or null key on Storage.' + this.core + '.set func')
    }
  }
  clear() {
    window[this.core].clear()
  }
  remove(key) {
    if (key !== null && typeof key !== 'undefined' && typeof key === 'string') {
      window[this.core].removeItem(key)
    } else {
      console.debug('Check the obj, it is empty  or undefined')
      console.debug(key)
    }
  }
  async asyncSet(key, value) {
    /**
    * Set the promise function for resolve the live values
    *
    **/
    let that_ = this
    await Promise.resolve()
    window[that_.core].setItem(key, value)
  }
  async asyncGet(key) {
    /**
    *
    * Set the promise function for resolve the live values
    *
    **/
    let that_ = this
    await Promise.resolve()
    return JSON.parse(window[that_.core].getItem(key)) || {}
  }
  length(key) {
    if (key !== null && typeof key !== 'undefined' && typeof key === 'string') {
      let that_ = this
      let obj = JSON.parse(window[that_.core].getItem(key)) || {}

      if (typeof obj === 'object') {
        return Object.keys(obj).length
      } else if (Array.isArray(obj)) {
        return obj.length
      } else {
        return 0
      }
    } else {
      console.debug('Key name is empty')
    }
  }
  lengthAll() {
    return window[this.core].length
  }
}

export const sessionStorage = new Storage('sessionStorage')
export const localStorage = new Storage('localStorage')

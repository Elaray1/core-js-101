/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  const obj = {};
  obj.width = width;
  obj.height = height;
  obj.getArea = () => width * height;
  return obj;
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const object = JSON.parse(json);
  const values = Object.values(object);
  return new proto.constructor(...values);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  string: '',
  flags: [false, false, false, false, false, false],

  cloneInstance(obj, order) {
    const newInstance = { ...obj };
    newInstance.flags = obj.flags.slice();
    newInstance.flags[order] = true;
    return newInstance;
  },

  checkFlags(order, checkCall) {
    if (checkCall && this.flags[order]) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');

    for (let i = order + 1; i < this.flags.length; i += 1) {
      if (this.flags[i]) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
  },

  element(value) {
    this.checkFlags(0, true);
    const newInstance = this.cloneInstance(this, 0);
    newInstance.string += value;
    return newInstance;
  },

  id(value) {
    this.checkFlags(1, true);
    const newInstance = this.cloneInstance(this, 1);
    newInstance.string += `#${value}`;
    return newInstance;
  },

  class(value) {
    this.checkFlags(2);
    const newInstance = this.cloneInstance(this, 2);
    newInstance.string += `.${value}`;
    return newInstance;
  },

  attr(value) {
    this.checkFlags(3);
    const newInstance = this.cloneInstance(this, 3);
    newInstance.string += `[${value}]`;
    return newInstance;
  },

  pseudoClass(value) {
    this.checkFlags(4);
    const newInstance = this.cloneInstance(this, 4);
    newInstance.string += `:${value}`;
    return newInstance;
  },

  pseudoElement(value) {
    this.checkFlags(5, true);
    const newInstance = this.cloneInstance(this, 5);
    newInstance.string += `::${value}`;
    return newInstance;
  },

  combine(selector1, combinator, selector2) {
    const str1 = selector1.stringify();
    const str2 = selector2.stringify();
    this.string = `${str1} ${combinator} ${str2}`;
    return this;
  },

  stringify() {
    const result = this.string;
    this.string = '';
    return result;
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};

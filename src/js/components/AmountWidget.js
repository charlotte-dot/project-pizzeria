import { settings, select } from './../settings.js';

class AmountWidget {
    constructor(element) {
      const thisWidget = this;

      thisWidget.getElements(element);
      thisWidget.initActions();
      thisWidget.setValue(
        thisWidget.input.value || settings.amountWidget.defaultValue
      );
    }

    getElements(element) {
      const thisWidget = this;

      thisWidget.element = element;
      thisWidget.input = thisWidget.element.querySelector(
        select.widgets.amount.input
      );
      thisWidget.linkDecrease = thisWidget.element.querySelector(
        select.widgets.amount.linkDecrease
      );
      thisWidget.linkIncrease = thisWidget.element.querySelector(
        select.widgets.amount.linkIncrease
      );
    }
    setValue(value) {
      const thisWidget = this;

      const newValue = parseInt(value); // "aa" -> NaN

      /* TODO: Add validation */
      if (thisWidget.value !== newValue && !isNaN(newValue)) {
        if (newValue < settings.amountWidget.defaultMin) {
          thisWidget.value = settings.amountWidget.defaultMin;
        } else if (newValue > settings.amountWidget.defaultMax) {
          thisWidget.value = settings.amountWidget.defaultMax;
        } else {
          thisWidget.value = newValue;
        }

        thisWidget.announce();
      }

      thisWidget.input.value = thisWidget.value;
    }

    announce() {
      const thisWidget = this;

      const event = new CustomEvent('updated', {
        bubbles: true,
      });
      thisWidget.element.dispatchEvent(event);
    }

    initActions() {
      const thisWidget = this;
      thisWidget.input.addEventListener('change', function (e) {
        thisWidget.setValue(e.target.value);
      });

      thisWidget.linkDecrease.addEventListener('click', function (e) {
        e.preventDefault();
        thisWidget.setValue(thisWidget.value - 1);
      });

      thisWidget.linkIncrease.addEventListener('click', function (e) {
        e.preventDefault();
        thisWidget.setValue(thisWidget.value + 1);
      });
    }
  }
  export default AmountWidget;
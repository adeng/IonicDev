var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var form_1 = require('../../util/form');
var config_1 = require('../../config/config');
var dom_1 = require('../../util/dom');
/**
 * @name Toggle
 * @description
 * A toggle technically is the same thing as an HTML checkbox input, except it looks different and is easier to use on a touch device. Ionic prefers to wrap the checkbox input with the `<label>` in order to make the entire toggle easy to tap or drag.
 * Togglees can also have colors assigned to them, by adding any color attribute to them.
 *
 * See the [Angular 2 Docs](https://angular.io/docs/js/latest/api/forms/) for more info on forms and input.
 * @property {any} [value] - the inital value of the toggle
 * @property {boolean} [checked] - whether the toggle it toggled or not
 * @property {boolean} [disabled] - whether the toggle is disabled or not
 * @property {string} [id] - a unique ID for a toggle
 * @usage
 * ```html
 * <!-- Create a single toggle -->
 *  <ion-toggle checked="true">
 *    Pineapple
 *  </ion-toggle>
 *
 * <!-- Create a list of togglees -->
 *  <ion-list>
 *
 *    <ion-toggle checked="true">
 *      Apple
 *    </ion-toggle>
 *
 *     <ion-toggle checked="false">
 *       Banana
 *     </ion-toggle>
 *
 *     <ion-toggle disabled="true">
 *       Cherry
 *     </ion-toggle>
 *
 *  </ion-list>
 * ```
 * @demo /docs/v2/demos/toggle/
 * @see {@link /docs/v2/components#toggle Toggle Component Docs}
 */
var Toggle = (function () {
    function Toggle(_form, _elementRef, _renderer, config, ngControl) {
        this._form = _form;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.value = '';
        this.checked = false;
        this.disabled = false;
        // deprecated warning
        if (_elementRef.nativeElement.tagName == 'ION-SWITCH') {
            console.warn('<ion-switch> has been renamed to <ion-toggle>, please update your HTML');
        }
        _form.register(this);
        this.lastTouch = 0;
        this.mode = config.get('mode');
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
        var self = this;
        function pointerMove(ev) {
            var currentX = dom_1.pointerCoord(ev).x;
            if (self.checked) {
                if (currentX + 15 < self.startX) {
                    self.toggle();
                    self.startX = currentX;
                }
            }
            else if (currentX - 15 > self.startX) {
                self.toggle();
                self.startX = currentX;
            }
        }
        function pointerOut(ev) {
            if (ev.currentTarget === ev.target) {
                self.pointerUp(ev);
            }
        }
        var toggleEle = _elementRef.nativeElement.querySelector('.toggle-media');
        this.addMoveListener = function () {
            toggleEle.addEventListener('touchmove', pointerMove);
            toggleEle.addEventListener('mousemove', pointerMove);
            _elementRef.nativeElement.addEventListener('mouseout', pointerOut);
        };
        this.removeMoveListener = function () {
            toggleEle.removeEventListener('touchmove', pointerMove);
            toggleEle.removeEventListener('mousemove', pointerMove);
            _elementRef.nativeElement.removeEventListener('mouseout', pointerOut);
        };
    }
    /**
     * @private
     */
    Toggle.prototype.ngOnInit = function () {
        if (!this.id) {
            this.id = 'tgl-' + this._form.nextId();
            this._renderer.setElementAttribute(this._elementRef, 'id', this.id);
        }
        this.labelId = 'lbl-' + this.id;
        this._renderer.setElementAttribute(this._elementRef, 'aria-labelledby', this.labelId);
    };
    /**
     * Toggle the checked state of this toggle.
     */
    Toggle.prototype.toggle = function () {
        this.checked = !this.checked;
    };
    Object.defineProperty(Toggle.prototype, "checked", {
        get: function () {
            return !!this._checked;
        },
        set: function (val) {
            this._checked = !!val;
            this._renderer.setElementAttribute(this._elementRef, 'aria-checked', this._checked);
            this.onChange(this._checked);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    Toggle.prototype.pointerDown = function (ev) {
        if (/touch/.test(ev.type)) {
            this.lastTouch = Date.now();
        }
        if (this.isDisabled(ev))
            return;
        this.startX = dom_1.pointerCoord(ev).x;
        this.removeMoveListener();
        this.addMoveListener();
        this.isActivated = true;
    };
    /**
     * @private
     */
    Toggle.prototype.pointerUp = function (ev) {
        if (this.isDisabled(ev))
            return;
        var endX = dom_1.pointerCoord(ev).x;
        if (this.checked) {
            if (this.startX + 4 > endX) {
                this.toggle(ev);
            }
        }
        else if (this.startX - 4 < endX) {
            this.toggle(ev);
        }
        this.removeMoveListener();
        this.isActivated = false;
    };
    /**
     * @private
     */
    Toggle.prototype.writeValue = function (value) {
        this.checked = value;
    };
    /**
     * @private
     */
    Toggle.prototype.onChange = function (val) {
        // TODO: figure the whys and the becauses
    };
    /**
     * @private
     */
    Toggle.prototype.onTouched = function (val) {
        // TODO: figure the whys and the becauses
    };
    /**
     * @private
     */
    Toggle.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    /**
     * @private
     */
    Toggle.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /**
     * @private
     */
    Toggle.prototype.ngOnDestroy = function () {
        this.removeMoveListener();
        this.toggleEle = this.addMoveListener = this.removeMoveListener = null;
        this._form.deregister(this);
    };
    /**
     * @private
     */
    Toggle.prototype.isDisabled = function (ev) {
        return (this.lastTouch + 999 > Date.now() && /mouse/.test(ev.type)) || (this.mode == 'ios' && ev.target.tagName == 'ION-TOGGLE');
    };
    /**
     * @private
     */
    Toggle.prototype.initFocus = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Toggle.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Toggle.prototype, "checked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Toggle.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Toggle.prototype, "id", void 0);
    Toggle = __decorate([
        core_1.Component({
            selector: 'ion-toggle,ion-switch',
            host: {
                'role': 'checkbox',
                'class': 'item',
                'tappable': '',
                'tabindex': 0,
                '[attr.aria-disabled]': 'disabled',
                '(touchstart)': 'pointerDown($event)',
                '(mousedown)': 'pointerDown($event)',
                '(touchend)': 'pointerUp($event)',
                '(mouseup)': 'pointerUp($event)'
            },
            template: '<ng-content select="[item-left]"></ng-content>' +
                '<div class="item-inner">' +
                '<ion-item-content id="{{labelId}}">' +
                '<ng-content></ng-content>' +
                '</ion-item-content>' +
                '<div class="toggle-media" [class.toggle-activated]="isActivated" disable-activated>' +
                '<div class="toggle-icon"></div>' +
                '</div>' +
                "</div>"
        }),
        __param(4, core_1.Optional()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof form_1.Form !== 'undefined' && form_1.Form) === 'function' && _a) || Object, (typeof (_b = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _c) || Object, (typeof (_d = typeof config_1.Config !== 'undefined' && config_1.Config) === 'function' && _d) || Object, (typeof (_e = typeof common_1.NgControl !== 'undefined' && common_1.NgControl) === 'function' && _e) || Object])
    ], Toggle);
    return Toggle;
    var _a, _b, _c, _d, _e;
})();
exports.Toggle = Toggle;
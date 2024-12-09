var Car = /** @class */ (function () {
    function Car(name, price, owner) {
        this.name = name;
        this.price = price;
        this._owner = owner;
    }
    Car.prototype.getInfo = function () {
        return "".concat(this.name, " - ").concat(this.price, ". Owner: ").concat(this._owner);
    };
    return Car;
}());
var bmw = new Car('BNW', 10000, 'Ivan');
bmw.getInfo();

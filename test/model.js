import * as model from '../src/model';

const chai = require('chai');
const assert = chai.assert;

describe('model.js', function () {
    describe('The MovingEntity class should exists', function () {
        it('should exists', function () {
            assert.isTrue(model.MovingEntity != undefined)
        })
        it('The MovingEntity constructor should create a new object', function () {
            const e = new model.MovingEntity(1, 100, 100, 100, 100, Math.PI);
            assert.equal(e.id, 1);
            assert.equal(e.t, 100);
            assert.equal(e.x, 100);
            assert.equal(e.y, 100);
            assert.equal(e.speed, 100);
            assert.equal(e.angle, Math.PI);
        });
        it('The move() method should raise an "Not implemented" error', function () {
            const e = new model.MovingEntity(1, 100, 100, 100, 100, Math.PI);
            assert.throws(() => e.move(), Error, 'Not implemented');
        });
        it('The render(context) method should raise an "Not implemented" error', function () {
            const e = new model.MovingEntity(1, 100, 100, 100, 100, Math.PI);
            assert.throws(() => e.move(), Error, 'Not implemented');
        });
    });

    describe('Rocket', function () {
        it('The Rocket class should exists', function () {
            assert.isTrue(model.Rocket != undefined)
        })
        it('The Rocket constructor should create a new object', function () {
            const e = new model.Rocket(1, 100, 100, 100, 100, Math.PI);
            assert.equal(e.id, 1);
            assert.equal(e.t, 100);
            assert.equal(e.x, 100);
            assert.equal(e.y, 100);
            assert.equal(e.speed, 100);
            assert.equal(e.angle, Math.PI);
        });
        it('The move() method should update the state of the object (angle: 0)"', function () {
            const e = new model.Rocket(1, 100, 100, 100, 100, 0);
            e.move();
            assert.equal(e.id, 1);
            assert.equal(e.t, 110);
            assert.equal(e.x, 101);
            assert.equal(e.y, 100);
            assert.equal(e.angle, 0);
            assert.equal(e.speed, 100);
        });
        it('The move() method should update the state of the object (angle: π)"', function () {
            const e = new model.Rocket(1, 100, 100, 100, 100, Math.PI);
            e.move();
            assert.equal(e.id, 1);
            assert.equal(e.t, 110);
            assert.equal(e.x, 99);
            assert.equal(e.y, 100);
            assert.equal(e.angle, Math.PI);
            assert.equal(e.speed, 100);
        });
        it('The move() method should update the state of the object (angle: π/2)"', function () {
            const e = new model.Rocket(1, 100, 100, 100, 100, Math.PI / 2);
            e.move();
            assert.equal(e.id, 1);
            assert.equal(e.t, 110);
            assert.equal(e.x, 100);
            assert.equal(e.y, 101);
            assert.equal(e.angle, Math.PI / 2);
            assert.equal(e.speed, 100);
        });
        it('The move() method should update the state of the object (angle: π/4)"', function () {
            const e = new model.Rocket(1, 100, 100, 100, 100, Math.PI / 4);
            e.move();
            assert.equal(e.id, 1);
            assert.equal(e.t, 110);
            assert.closeTo(e.x, 100.7071, 0.0001);
            assert.closeTo(e.y, 100.7071, 0.0001);
            assert.equal(e.angle, Math.PI / 4);
            assert.equal(e.speed, 100);
        });
        it('The move() method should update the state of the object (angle: 3π/2)"', function () {
            const e = new model.Rocket(1, 100, 100, 100, 100, 3 *  Math.PI / 2);
            e.move();
            assert.equal(e.id, 1);
            assert.equal(e.t, 110);
            assert.equal(e.x, 100);
            assert.equal(e.y, 99);
            assert.equal(e.angle, 3 * Math.PI / 2);
            assert.equal(e.speed, 100);
        });
    });

    describe('Vehicle', function () {
        it('The Vehicle class should exists', function () {
            assert.isTrue(model.Vehicle != undefined)
        })
        it('The Vehicle constructor should create a new object', function () {
            const e = new model.Vehicle(1, 100, 100, 100, 100, Math.PI);
            assert.equal(e.id, 1);
            assert.equal(e.t, 100);
            assert.equal(e.x, 100);
            assert.equal(e.y, 100);
            assert.equal(e.speed, 100);
            assert.equal(e.angle, Math.PI);
        });
        it('The move() method should reduce the speed by the friction constant"', function () {
            const e = new model.Vehicle(1, 100, 100, 100, 100, 0, false, false, false, false, '#000');
            e.move();
            assert.equal(e.id, 1);
            assert.equal(e.speed, 98);
        });
        it('The move() method should increment the speed by the acceleration constant if the vehicle is accelerating"', function () {
            const e = new model.Vehicle(1, 100, 100, 100, 100, 0, true, false, false, false, '#000');
            e.move();
            assert.equal(e.id, 1);
            assert.equal(e.speed, 108);
        });
        it('The move() method should decrement the speed by the reverse constant if the vehicle is reversing"', function () {
            const e = new model.Vehicle(1, 100, 100, 100, 100, 0, false, true, false, false, '#000');
            e.move();
            assert.equal(e.id, 1);
            assert.equal(e.speed, 93);
        });
        it('The move() method should decrement the speed by the reverse constant if the vehicle is reversing"', function () {
            const e = new model.Vehicle(1, 100, 100, 100, 100, 0, false, true, false, false, '#000');
            e.move();
            assert.equal(e.id, 1);
            assert.equal(e.speed, 93);
        });
    });

});

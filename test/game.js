import Game from '../src/game.js';
import {Message} from "../src/message.js";
import * as model from '../src/model.js';
import * as constants from '../src/constants.js';
import {width, height, maxHealth, rocketIncrement, rocketTTL, tick} from '../src/constants.js';
import {Vehicle, Rocket} from "../src/model.js";

var chai = require('chai');
var assert = chai.assert;

describe('game.js', function () {
    describe('Game methods', function () {
        it('id() should return identifiers incrementally starting from 0', function () {
            let game = new Game();
            for (let i = 0; i < 1000; i++) {
                assert.equal(game.id(), i);
            }
        });
        it("*vehicles() is a generator that lists the vehicles of the game", function() {
            let game = new Game();
            let vehicle = new Vehicle(0, 0, 0, 0, 0, 0, false, false, false, false, '#000')
            game.set(0, vehicle);
            let rocket = new Rocket(1, 0, 0, 0, 0, 0);
            game.set(1, rocket);
            let vehicles = Array.from(game.vehicles());
            assert.equal(vehicles.length, 1);
            assert.equal(vehicles[0], vehicle);
        });
        it("*rockets() is a generator that lists the rockets of the game", function() {
            let game = new Game();
            let vehicle = new Vehicle(0, 0, 0, 0, 0, 0, false, false, false, false, '#000')
            game.set(0, vehicle);
            let rocket = new Rocket(1, 0, 0, 0, 0, 0);
            game.set(1, rocket);
            let rockets = Array.from(game.rockets());
            assert.equal(rockets.length, 1);
            assert.equal(rockets[0], rocket);

        });
        it('join() should create a vehicle, add it to the game and return it', function () {
            const game = new Game();
            assert.equal(game.size, 0);
            const id = game.join();
            const vehicle = game.get(id);
            assert.isTrue(game.get(0) instanceof model.Vehicle);
            assert.equal(game.size, 1);
            assert.equal(vehicle.id, 0);
            assert.equal(vehicle.x, width / 2);
            assert.equal(vehicle.y, height / 2);
            assert.equal(vehicle.angle, -Math.PI / 2);
            assert.equal(vehicle.speed, 0);
            assert.equal(vehicle.health, maxHealth);
        });
        it('quit(vehicle) should remove the vehicle from the game', function () {
            let game = new Game();
            let id1 = game.join();
            assert.equal(game.size, 1);
            let id2 = game.join();
            assert.equal(game.size, 2);
            game.quit(id1);
            assert.equal(game.size, 1);
            game.quit(id2);
            assert.equal(game.size, 0);
        });
        it('onMessage(id, new Message("keydown", " ")) should create a rocket for the given vehicle and add it to the game', function () {
            let game = new Game();
            let id = game.join();
            let vehicle = game.get(id);
            assert.equal(game.size, 1);
            game.onMessage(id, new Message("keydown", " "));
            let rocket1 = game.get(1);
            assert.equal(game.size, 2);
            assert.isTrue(game.get(1) instanceof model.Rocket);
            assert.equal(rocket1.angle, vehicle.angle);
            assert.equal(rocket1.speed, vehicle.speed + rocketIncrement);
        });
        it('onMessage(id, new Message("keydown", "ArrowLeft")) should rotate the vehicle on the left', function () {
            let game = new Game();
            let id = game.join();
            game.onMessage(id, new Message("keydown", "ArrowLeft"));
            let vehicle = game.get(id);
            assert.isTrue(vehicle.isTurningLeft);
        });
        it('onMessage(id, new Message("keydown", "ArrowRight")) should rotate the vehicle on the left', function () {
            let game = new Game();
            let id = game.join();
            game.onMessage(id, new Message("keydown", "ArrowRight"));
            let vehicle = game.get(id);
            assert.isTrue(vehicle.isTurningRight);
        });
        it('onMessage(id, new Message("keydown", "ArrowUp")) should accelerate the vehicle', function () {
            let game = new Game();
            let id = game.join();
            game.onMessage(id, new Message("keydown", "ArrowUp"));
            let vehicle = game.get(id);
            assert.isTrue(vehicle.isAccelerating);
        });
        it('onMessage(id, new Message("keydown", "ArrowDown")) should reverse the vehicle', function () {
            let game = new Game();
            let id = game.join();
            game.onMessage(id, new Message("keydown", "ArrowDown"));
            let vehicle = game.get(id);
            assert.isTrue(vehicle.isReversing);
        });
        it('move() should detect collisions between rockets and vehicles and decrease the health', function () {
            let game = new Game();
            let vehicle = new Vehicle(0, 0, 0, 0, 0, 0, false, false, false, false, '#000')
            game.set(0, vehicle);
            let rocket = new Rocket(1, 0, 0, 0, 0, 0);
            game.set(1, rocket);
            assert.equal(game.size, 2);
            game.move();
            assert.equal(game.size, 1);

        });
        it('move() should delete rockets when they expire (rocketTTL constant)', () => {
            let game = new Game();
            game.set(0, new Rocket(0, game.timestamp(), 0, 0, 0, 0));
            for (var i = 0; i < rocketTTL; i += tick) {
                game.move();
                assert.equal(game.size, 1);
            }
            game.move();
            assert.equal(game.size, 0);

        });
    });
});

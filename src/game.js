import {
  width,
  height,
  rocketTTL,
  rocketIncrement,
  collisionRadius,
  keysValues,
} from './constants.js';
import { Vehicle, Rocket } from './model.js';
import { collision } from './util.js';

/**
 * A class to manage the state of the game.
 */
class Game extends Map {
  /**
   * Construct a Game object
   */
  constructor() {
    super();
    this.counter = 0;
  }

  /**
   * Returns the current timestamp.
   */
  timestamp() {
    return new Date().getTime();
  }

  /**
   * Return the vehicles.
   */
  // TODO: Create the vehicles() method (generator)
  * vehicles() {
    for (const e of this.values()) {
      if (e instanceof Vehicle) {
        yield e;
      }
    }
  }

  /**
   * Return the rockets.
   */
  // TODO: Create the rockets() method (generator)
  * rockets() {
    for (const e of this.values()) {
      if (e instanceof Rocket) {
        yield e;
      }
    }
  }

  /**
   * Generate a unique identifier for storing and synchronizing objects.
   */
  // TODO: Create the id() method
  id() {
    return this.counter++;
  }

  /**
   * Initialize a vehicle and set a new key-value element in the class map.
   *
   * @returns {*}
   */
  // TODO: Create the join() method
  join() {
    const vehicle = new Vehicle(this.id(), this.timestamp(), width / 2, height / 2, 0, -Math.PI / 2, false, false, false, false, '#000');
    this.set(vehicle.id, vehicle);
    return vehicle.id;
  }

  /**
   * Delete a vehicle by its id.
   *
   * @param id
   */
  // TODO: Create the quit(id) method
  quit(id) {
    this.delete(id);
  }

  /**
   * Handle the player messages.
   *
   * @param player
   * @param message
   */
  // TODO: Create the onMessage(id, message) method
  onMessage(id, message) {
    const vehicle = this.get(id);
    const isKeyDownPressed = message.action === 'keydown';
    switch (message.object) {
      case keysValues.arrowLeft:
        vehicle.isTurningLeft = isKeyDownPressed;
        break;
      case keysValues.arrowRight:
        vehicle.isTurningRight = isKeyDownPressed;
        break;
      case keysValues.arrowUp:
        vehicle.isAccelerating = isKeyDownPressed;
        break;
      case keysValues.arrowDown:
        vehicle.isReversing = isKeyDownPressed;
        break;
      case keysValues.space:
        if (isKeyDownPressed) {
          const rocket = new Rocket(
            this.id(),
            this.timestamp(),
            vehicle.x,
            vehicle.y,
            vehicle.speed + rocketIncrement,
            vehicle.angle,
          );
          this.set(rocket.id, rocket);
        }
        break;
      default:
        break;
    }
  }

  /**
   * Updates the state of the game
   */
  move() {
    for (const entity of this.values()) {
      entity.move();
    }

    // TODO: Check for collisions and remove old rockets
    for (const rocket of this.rockets()) {
      if (rocket.timestamp - rocket.created > rocketTTL) {
        this.delete(rocket.id);
      } else {
        for (const vehicle of this.vehicles()) {
          if (collision(rocket.x, rocket.y, vehicle.x, vehicle.y, collisionRadius)) {
            vehicle.health = Math.max(vehicle.health - 1, 0);
            this.delete(rocket.id);
          }
        }
      }
    }
  }
}

export default Game;

import {
  width,
  height,
  rocketTTL,
  rocketIncrement,
  collisionRadius,
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
   * Return the spaceships.
   */
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
  id() {
    return this.counter++;
  }

  /**
   * Returns the current timestamp.
   */
  timestamp() {
    return new Date().getTime();
  }

  /**
   * Initialize a vehicle its id.
   *
   * @returns {*}
   */
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
  quit(id) {
    this.delete(id);
  }

  /**
   * Handle player events.
   *
   * @param player
   * @param event
   */
  onMessage(id, event) {
    const vehicle = this.get(id);
    switch (event.object) {
      case 'ArrowLeft':
        vehicle.isTurningLeft = event.action === 'keydown';
        break;
      case 'ArrowRight':
        vehicle.isTurningRight = event.action === 'keydown';
        break;
      case 'ArrowUp':
        vehicle.isAccelerating = event.action === 'keydown';
        break;
      case 'ArrowDown':
        vehicle.isReversing = event.action === 'keydown';
        break;
      case ' ':
        if (event.action === 'keydown') {
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
    for (const rocket of this.rockets()) {
      if (rocket.t - rocket.created > rocketTTL) {
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

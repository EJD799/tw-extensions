//
// Gyroscope Extension for Turbowarp
// By EJD799 (cwkelliott47732 on Scratch)
//
// Licensed under:
// Mozilla Public License Version 2.0
//
var is_running = false;
var event_count = 0;
var orient_a = 0;
var orient_b = 0;
var orient_g = 0;
var accel_gx = 0;
var accel_gy = 0;
var accel_gz = 0;
var accel_x = 0;
var accel_y = 0;
var accel_z = 0;
var accel_i = 0;
var gyro_x = 0;
var gyro_y = 0;
var gyro_z = 0;

function handleOrientation(event) {
  orient_a = event.alpha;
  orient_b = event.beta;
  orient_g = event.gamma;
  event_count = event_count + 1;
}

function handleMotion(event) {
  accel_gx = event.accelerationIncludingGravity.x;
  accel_gy = event.accelerationIncludingGravity.y;
  accel_gz = event.accelerationIncludingGravity.z;

  accel_x = event.acceleration.x;
  accel_y = event.acceleration.y;
  accel_z = event.acceleration.z;

  accel_i = event.interval, 2;

  gyro_z = event.rotationRate.alpha;
  gyro_x = event.rotationRate.beta;
  gyro_y = event.rotationRate.gamma;
  event_count = event_count + 1;
}

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
  }

  class GyroscopeExtension {
    getInfo() {
      return {
        id: 'gyroscopeextension',
        name: 'Gyroscope',
        color1: "#0044ff",
        color2: "#0036c9",
        color3: "#0036c9",
        blocks: [
          {
            opcode: 'startgyro',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set gyroscope to [MODE]',
            arguments: {
              MODE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'ON_OFF_TOGGLE'
              }
            }
          },
          {
            opcode: 'resetgyro',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset'
          },
          {
            opcode: 'getorienta',
            blockType: Scratch.BlockType.REPORTER,
            text: 'orientation alpha'
          },
          {
            opcode: 'getorientb',
            blockType: Scratch.BlockType.REPORTER,
            text: 'orientation beta'
          },
          {
            opcode: 'getorientg',
            blockType: Scratch.BlockType.REPORTER,
            text: ' orientation gamma'
          },
          {
            opcode: 'getaccelgx',
            blockType: Scratch.BlockType.REPORTER,
            text: 'accelerometer x (with gravity)'
          },
          {
            opcode: 'getaccelgy',
            blockType: Scratch.BlockType.REPORTER,
            text: 'accelerometer y (with gravity)'
          },
          {
            opcode: 'getaccelgz',
            blockType: Scratch.BlockType.REPORTER,
            text: 'accelerometer z (with gravity)'
          },
          {
            opcode: 'getaccelx',
            blockType: Scratch.BlockType.REPORTER,
            text: 'accelerometer x'
          },
          {
            opcode: 'getaccely',
            blockType: Scratch.BlockType.REPORTER,
            text: 'accelerometer y'
          },
          {
            opcode: 'getaccelz',
            blockType: Scratch.BlockType.REPORTER,
            text: 'accelerometer z'
          },
          {
            opcode: 'getacceli',
            blockType: Scratch.BlockType.REPORTER,
            text: 'accelerometer interval'
          },
          {
            opcode: 'getgyrox',
            blockType: Scratch.BlockType.REPORTER,
            text: 'gyroscope x'
          },
          {
            opcode: 'getgyroy',
            blockType: Scratch.BlockType.REPORTER,
            text: 'gyroscope y'
          },
          {
            opcode: 'getgyroz',
            blockType: Scratch.BlockType.REPORTER,
            text: 'gyroscope z'
          },
          {
            opcode: 'geteventc',
            blockType: Scratch.BlockType.REPORTER,
            text: 'event count'
          },
          {
            opcode: 'isgyrorunning',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is gyroscope running?'
          }
        ],
        menus: {
          ON_OFF_TOGGLE: {
            accept_reporters: false,
            items: ["on", "off", "toggle"]
          }
        }
      };
    }
    startgyro(args) {
      if (args.MODE == "toggle") {
        if (is_running) {
          window.removeEventListener("devicemotion", handleMotion);
          window.removeEventListener("deviceorientation", handleOrientation);
          is_running = false;
        } else {
          window.addEventListener("devicemotion", handleMotion);
          window.addEventListener("deviceorientation", handleOrientation);
          is_running = true;
        }
      } else if (args.MODE == "on") {
        if (is_running == false) {
          window.addEventListener("devicemotion", handleMotion);
          window.addEventListener("deviceorientation", handleOrientation);
          is_running = true;
        }
      } else if (args.MODE == "off") {
        if (is_running == true) {
          window.removeEventListener("devicemotion", handleMotion);
          window.removeEventListener("deviceorientation", handleOrientation);
          is_running = false;
        }
      }
    }
    resetgyro() {
      if (is_running == true) {
        window.removeEventListener("devicemotion", handleMotion);
        window.removeEventListener("deviceorientation", handleOrientation);
        is_running = false;
      }
      event_count = 0;
      orient_a = 0;
      orient_b = 0;
      orient_g = 0;
      accel_gx = 0;
      accel_gy = 0;
      accel_gz = 0;
      accel_x = 0;
      accel_y = 0;
      accel_z = 0;
      accel_i = 0;
      gyro_x = 0;
      gyro_y = 0;
      gyro_z = 0;
    }
    getorienta() {
      return orient_a;
    }
    getorientb() {
      return orient_b;
    }
    getorientg() {
      return orient_g;
    }
    getaccelgx() {
      return accel_gx;
    }
    getaccelgy() {
      return accel_gy;
    }
    getaccelgz() {
      return accel_gz;
    }
    getaccelx() {
      return accel_x;
    }
    getaccely() {
      return accel_y;
    }
    getaccelz() {
      return accel_z;
    }
    getacceli() {
      return accel_i;
    }
    getgyrox() {
      return gyro_x;
    }
    getgyroy() {
      return gyro_y;
    }
    getgyroz() {
      return gyro_z;
    }
    geteventc() {
      return event_count;
    }
    isgyrorunning() {
      return is_running;
    }
  }
  Scratch.extensions.register(new GyroscopeExtension());
})(Scratch);

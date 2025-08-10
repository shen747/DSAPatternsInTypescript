/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  VehicleType,
  SpotType,
  SpotStatus,
  Motorcycle,
  Car,
  Bus,
  ParkingSpot,
  Level,
  ParkingLot,
  VehicleFactory,
  ParkingLotBuilder
} from './problem';

describe('Parking Lot System Design', () => {
  describe('Vehicle Classes', () => {
    describe('Motorcycle', () => {
      let motorcycle: Motorcycle;

      beforeEach(() => {
        motorcycle = new Motorcycle('M123');
      });

      test('should create motorcycle with correct properties', () => {
        expect(motorcycle.getLicensePlate()).toBe('M123');
        expect(motorcycle.getType()).toBe(VehicleType.MOTORCYCLE);
        expect(motorcycle.getSpotsNeeded()).toBe(1);
      });

      test('should fit in any spot type', () => {
        expect(motorcycle.canFitInSpot(SpotType.MOTORCYCLE)).toBe(true);
        expect(motorcycle.canFitInSpot(SpotType.COMPACT)).toBe(true);
        expect(motorcycle.canFitInSpot(SpotType.LARGE)).toBe(true);
      });
    });

    describe('Car', () => {
      let car: Car;

      beforeEach(() => {
        car = new Car('C456');
      });

      test('should create car with correct properties', () => {
        expect(car.getLicensePlate()).toBe('C456');
        expect(car.getType()).toBe(VehicleType.CAR);
        expect(car.getSpotsNeeded()).toBe(1);
      });

      test('should fit in compact and large spots only', () => {
        expect(car.canFitInSpot(SpotType.MOTORCYCLE)).toBe(false);
        expect(car.canFitInSpot(SpotType.COMPACT)).toBe(true);
        expect(car.canFitInSpot(SpotType.LARGE)).toBe(true);
      });
    });

    describe('Bus', () => {
      let bus: Bus;

      beforeEach(() => {
        bus = new Bus('B789');
      });

      test('should create bus with correct properties', () => {
        expect(bus.getLicensePlate()).toBe('B789');
        expect(bus.getType()).toBe(VehicleType.BUS);
        expect(bus.getSpotsNeeded()).toBe(5);
      });

      test('should fit in large spots only', () => {
        expect(bus.canFitInSpot(SpotType.MOTORCYCLE)).toBe(false);
        expect(bus.canFitInSpot(SpotType.COMPACT)).toBe(false);
        expect(bus.canFitInSpot(SpotType.LARGE)).toBe(true);
      });
    });
  });

  describe('ParkingSpot', () => {
    let spot: ParkingSpot;

    beforeEach(() => {
      spot = new ParkingSpot(1, SpotType.COMPACT);
    });

    test('should create spot with correct properties', () => {
      expect(spot.getId()).toBe(1);
      expect(spot.getType()).toBe(SpotType.COMPACT);
      expect(spot.getStatus()).toBe(SpotStatus.AVAILABLE);
      expect(spot.isAvailable()).toBe(true);
      expect(spot.getVehicle()).toBeNull();
    });

    test('should park vehicle successfully', () => {
      const car = new Car('C123');
      expect(spot.park(car)).toBe(true);
      expect(spot.getStatus()).toBe(SpotStatus.OCCUPIED);
      expect(spot.getVehicle()).toBe(car);
      expect(spot.isAvailable()).toBe(false);
    });

    test('should not park vehicle if spot is occupied', () => {
      const car1 = new Car('C123');
      const car2 = new Car('C456');
      
      spot.park(car1);
      expect(spot.park(car2)).toBe(false);
      expect(spot.getVehicle()).toBe(car1);
    });

    test('should not park vehicle if it cannot fit', () => {
      const bus = new Bus('B123');
      expect(spot.park(bus)).toBe(false);
      expect(spot.getStatus()).toBe(SpotStatus.AVAILABLE);
    });

    test('should leave vehicle successfully', () => {
      const car = new Car('C123');
      spot.park(car);
      
      const leftVehicle = spot.leave();
      expect(leftVehicle).toBe(car);
      expect(spot.getStatus()).toBe(SpotStatus.AVAILABLE);
      expect(spot.getVehicle()).toBeNull();
      expect(spot.isAvailable()).toBe(true);
    });
  });

  describe('Level', () => {
    let level: Level;

    beforeEach(() => {
      level = new Level(1, 2, 3, 4); // 2 motorcycle, 3 compact, 4 large spots
    });

    test('should create level with correct properties', () => {
      expect(level.getLevelNumber()).toBe(1);
      expect(level.getAvailableSpots(SpotType.MOTORCYCLE)).toBe(2);
      expect(level.getAvailableSpots(SpotType.COMPACT)).toBe(3);
      expect(level.getAvailableSpots(SpotType.LARGE)).toBe(4);
    });

    test('should park motorcycle successfully', () => {
      const motorcycle = new Motorcycle('M123');
      expect(level.parkVehicle(motorcycle)).toBe(true);
      expect(level.getAvailableSpots(SpotType.MOTORCYCLE)).toBe(1);
    });

    test('should park car in compact spot', () => {
      const car = new Car('C123');
      expect(level.parkVehicle(car)).toBe(true);
      expect(level.getAvailableSpots(SpotType.COMPACT)).toBe(2);
    });

    test('should park car in large spot when compact is full', () => {
      // Fill all compact spots
      for (let i = 0; i < 3; i++) {
        level.parkVehicle(new Car(`C${i}`));
      }
      
      const car = new Car('C123');
      expect(level.parkVehicle(car)).toBe(true);
      expect(level.getAvailableSpots(SpotType.LARGE)).toBe(3);
    });

    test('should not park bus when not enough consecutive large spots', () => {
      const bus = new Bus('B123');
      expect(level.parkVehicle(bus)).toBe(false);
    });

    test('should park bus when enough consecutive large spots', () => {
      // Create level with 5 consecutive large spots
      const levelWithLargeSpots = new Level(1, 0, 0, 5);
      const bus = new Bus('B123');
      expect(levelWithLargeSpots.parkVehicle(bus)).toBe(true);
      expect(levelWithLargeSpots.getAvailableSpots(SpotType.LARGE)).toBe(0);
    });
  });

  describe('ParkingLot', () => {
    let parkingLot: ParkingLot;

    beforeEach(() => {
      const level1 = new Level(1, 2, 3, 4);
      const level2 = new Level(2, 1, 2, 3);
      parkingLot = new ParkingLot([level1, level2]);
    });

    test('should park vehicle on first available level', () => {
      const car = new Car('C123');
      expect(parkingLot.parkVehicle(car)).toBe(true);
      expect(parkingLot.isVehicleParked('C123')).toBe(true);
    });

    test('should park vehicle on second level when first is full', () => {
      // Fill first level
      for (let i = 0; i < 9; i++) {
        parkingLot.parkVehicle(new Car(`C${i}`));
      }
      
      const car = new Car('C123');
      expect(parkingLot.parkVehicle(car)).toBe(true);
      expect(parkingLot.isVehicleParked('C123')).toBe(true);
    });

    test('should leave vehicle successfully', () => {
      const car = new Car('C123');
      parkingLot.parkVehicle(car);
      
      expect(parkingLot.leaveVehicle('C123')).toBe(true);
      expect(parkingLot.isVehicleParked('C123')).toBe(false);
    });

    test('should return parking info for parked vehicle', () => {
      const car = new Car('C123');
      parkingLot.parkVehicle(car);
      
      const info = parkingLot.getParkingInfo('C123');
      expect(info).not.toBeNull();
      expect(info!.level).toBe(1);
      expect(info!.spots.length).toBe(1);
    });

    test('should return null for non-parked vehicle', () => {
      const info = parkingLot.getParkingInfo('C123');
      expect(info).toBeNull();
    });

    test('should get total available spots', () => {
      const available = parkingLot.getAvailableSpots();
      expect(available.get(SpotType.MOTORCYCLE)).toBe(3);
      expect(available.get(SpotType.COMPACT)).toBe(5);
      expect(available.get(SpotType.LARGE)).toBe(7);
    });

    test('should get total spots', () => {
      const total = parkingLot.getTotalSpots();
      expect(total.get(SpotType.MOTORCYCLE)).toBe(3);
      expect(total.get(SpotType.COMPACT)).toBe(5);
      expect(total.get(SpotType.LARGE)).toBe(7);
    });
  });

  describe('VehicleFactory', () => {
    test('should create motorcycle', () => {
      const vehicle = VehicleFactory.createVehicle(VehicleType.MOTORCYCLE, 'M123');
      expect(vehicle).toBeInstanceOf(Motorcycle);
      expect(vehicle.getLicensePlate()).toBe('M123');
    });

    test('should create car', () => {
      const vehicle = VehicleFactory.createVehicle(VehicleType.CAR, 'C123');
      expect(vehicle).toBeInstanceOf(Car);
      expect(vehicle.getLicensePlate()).toBe('C123');
    });

    test('should create bus', () => {
      const vehicle = VehicleFactory.createVehicle(VehicleType.BUS, 'B123');
      expect(vehicle).toBeInstanceOf(Bus);
      expect(vehicle.getLicensePlate()).toBe('B123');
    });

    test('should throw error for unknown vehicle type', () => {
      expect(() => {
        VehicleFactory.createVehicle('unknown' as VehicleType, 'X123');
      }).toThrow('Unknown vehicle type: unknown');
    });
  });

  describe('ParkingLotBuilder', () => {
    test('should build parking lot with multiple levels', () => {
      const parkingLot = new ParkingLotBuilder()
        .addLevel(2, 3, 4)
        .addLevel(1, 2, 3)
        .build();

      const totalSpots = parkingLot.getTotalSpots();
      expect(totalSpots.get(SpotType.MOTORCYCLE)).toBe(3);
      expect(totalSpots.get(SpotType.COMPACT)).toBe(5);
      expect(totalSpots.get(SpotType.LARGE)).toBe(7);
    });

    test('should throw error when building without levels', () => {
      expect(() => {
        new ParkingLotBuilder().build();
      }).toThrow('Parking lot must have at least one level');
    });
  });

  describe('Integration Tests', () => {
    test('should handle multiple vehicles parking and leaving', () => {
      const parkingLot = new ParkingLotBuilder()
        .addLevel(2, 3, 4)
        .build();

      // Park different types of vehicles
      const motorcycle = VehicleFactory.createVehicle(VehicleType.MOTORCYCLE, 'M123');
      const car = VehicleFactory.createVehicle(VehicleType.CAR, 'C123');
      const bus = VehicleFactory.createVehicle(VehicleType.BUS, 'B123');

      expect(parkingLot.parkVehicle(motorcycle)).toBe(true);
      expect(parkingLot.parkVehicle(car)).toBe(true);
      expect(parkingLot.parkVehicle(bus)).toBe(false); // Not enough consecutive large spots

      // Leave vehicles
      expect(parkingLot.leaveVehicle('M123')).toBe(true);
      expect(parkingLot.leaveVehicle('C123')).toBe(true);
      expect(parkingLot.isVehicleParked('M123')).toBe(false);
      expect(parkingLot.isVehicleParked('C123')).toBe(false);
    });

    test('should handle edge cases', () => {
      const parkingLot = new ParkingLotBuilder()
        .addLevel(0, 0, 5) // Only large spots
        .build();

      const bus = VehicleFactory.createVehicle(VehicleType.BUS, 'B123');
      expect(parkingLot.parkVehicle(bus)).toBe(true);

      // Try to leave non-existent vehicle
      expect(parkingLot.leaveVehicle('NONEXISTENT')).toBe(false);
    });
  });
}); 
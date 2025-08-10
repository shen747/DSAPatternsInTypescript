/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
// Parking Lot System Design
// Problem: Design a parking lot system that can handle different types of vehicles
// and parking spots with various constraints.

export enum VehicleType {
  MOTORCYCLE = 'motorcycle',
  CAR = 'car',
  BUS = 'bus'
}

export enum SpotType {
  MOTORCYCLE = 'motorcycle',
  COMPACT = 'compact',
  LARGE = 'large'
}

export enum SpotStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  RESERVED = 'reserved'
}

// Base Vehicle class
export abstract class Vehicle {
  protected licensePlate: string;
  protected type: VehicleType;

  constructor(licensePlate: string, type: VehicleType) {
    this.licensePlate = licensePlate;
    this.type = type;
  }

  getLicensePlate(): string {
    return this.licensePlate;
  }

  getType(): VehicleType {
    return this.type;
  }

  abstract getSpotsNeeded(): number;
  abstract canFitInSpot(spotType: SpotType): boolean;
}

// Concrete Vehicle classes
export class Motorcycle extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.MOTORCYCLE);
  }

  getSpotsNeeded(): number {
    return 1;
  }

  canFitInSpot(spotType: SpotType): boolean {
    return spotType === SpotType.MOTORCYCLE || 
           spotType === SpotType.COMPACT || 
           spotType === SpotType.LARGE;
  }
}

export class Car extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.CAR);
  }

  getSpotsNeeded(): number {
    return 1;
  }

  canFitInSpot(spotType: SpotType): boolean {
    return spotType === SpotType.COMPACT || spotType === SpotType.LARGE;
  }
}

export class Bus extends Vehicle {
  constructor(licensePlate: string) {
    super(licensePlate, VehicleType.BUS);
  }

  getSpotsNeeded(): number {
    return 5;
  }

  canFitInSpot(spotType: SpotType): boolean {
    return spotType === SpotType.LARGE;
  }
}

// Parking Spot class
export class ParkingSpot {
  private id: number;
  private type: SpotType;
  private status: SpotStatus;
  private vehicle: Vehicle | null;

  constructor(id: number, type: SpotType) {
    this.id = id;
    this.type = type;
    this.status = SpotStatus.AVAILABLE;
    this.vehicle = null;
  }

  getId(): number {
    return this.id;
  }

  getType(): SpotType {
    return this.type;
  }

  getStatus(): SpotStatus {
    return this.status;
  }

  getVehicle(): Vehicle | null {
    return this.vehicle;
  }

  isAvailable(): boolean {
    return this.status === SpotStatus.AVAILABLE;
  }

  park(vehicle: Vehicle): boolean {
    if (!this.isAvailable() || !vehicle.canFitInSpot(this.type)) {
      return false;
    }
    this.vehicle = vehicle;
    this.status = SpotStatus.OCCUPIED;
    return true;
  }

  leave(): Vehicle | null {
    const vehicle = this.vehicle;
    this.vehicle = null;
    this.status = SpotStatus.AVAILABLE;
    return vehicle;
  }
}

// Level class to manage parking spots
export class Level {
  private levelNumber: number;
  private spots: ParkingSpot[];
  private availableSpots: Map<SpotType, number>;

  constructor(levelNumber: number, motorcycleSpots: number, compactSpots: number, largeSpots: number) {
    this.levelNumber = levelNumber;
    this.spots = [];
    this.availableSpots = new Map();

    let spotId = 0;
    
    // Create motorcycle spots
    for (let i = 0; i < motorcycleSpots; i++) {
      this.spots.push(new ParkingSpot(spotId++, SpotType.MOTORCYCLE));
    }
    this.availableSpots.set(SpotType.MOTORCYCLE, motorcycleSpots);

    // Create compact spots
    for (let i = 0; i < compactSpots; i++) {
      this.spots.push(new ParkingSpot(spotId++, SpotType.COMPACT));
    }
    this.availableSpots.set(SpotType.COMPACT, compactSpots);

    // Create large spots
    for (let i = 0; i < largeSpots; i++) {
      this.spots.push(new ParkingSpot(spotId++, SpotType.LARGE));
    }
    this.availableSpots.set(SpotType.LARGE, largeSpots);
  }

  getLevelNumber(): number {
    return this.levelNumber;
  }

  getSpots(): ParkingSpot[] {
    return [...this.spots];
  }

  getAvailableSpots(spotType: SpotType): number {
    return this.availableSpots.get(spotType) || 0;
  }

  parkVehicle(vehicle: Vehicle): boolean {
    const spotsNeeded = vehicle.getSpotsNeeded();
    
    if (spotsNeeded === 1) {
      // Try to find a single spot
      for (const spot of this.spots) {
        if (spot.park(vehicle)) {
          this.updateAvailableSpots(spot.getType(), -1);
          return true;
        }
      }
    } else {
      // For vehicles needing multiple spots (like buses)
      const consecutiveSpots = this.findConsecutiveSpots(spotsNeeded, vehicle);
      if (consecutiveSpots.length === spotsNeeded) {
        for (const spot of consecutiveSpots) {
          spot.park(vehicle);
          this.updateAvailableSpots(spot.getType(), -1);
        }
        return true;
      }
    }
    
    return false;
  }

  private findConsecutiveSpots(count: number, vehicle: Vehicle): ParkingSpot[] {
    const result: ParkingSpot[] = [];
    let consecutive = 0;
    
    for (const spot of this.spots) {
      if (spot.isAvailable() && vehicle.canFitInSpot(spot.getType())) {
        result.push(spot);
        consecutive++;
        if (consecutive === count) {
          return result;
        }
      } else {
        result.length = 0;
        consecutive = 0;
      }
    }
    
    return [];
  }

  private updateAvailableSpots(spotType: SpotType, change: number): void {
    const current = this.availableSpots.get(spotType) || 0;
    this.availableSpots.set(spotType, Math.max(0, current + change));
  }

  leaveVehicle(vehicle: Vehicle): boolean {
    for (const spot of this.spots) {
      if (spot.getVehicle() === vehicle) {
        spot.leave();
        this.updateAvailableSpots(spot.getType(), 1);
        return true;
      }
    }
    return false;
  }
}

// Main Parking Lot class
export class ParkingLot {
  private levels: Level[];
  private parkedVehicles: Map<string, { level: Level; spots: ParkingSpot[] }>;

  constructor(levels: Level[]) {
    this.levels = levels;
    this.parkedVehicles = new Map();
  }

  parkVehicle(vehicle: Vehicle): boolean {
    for (const level of this.levels) {
      if (level.parkVehicle(vehicle)) {
        // Track where the vehicle is parked
        const spots = level.getSpots().filter(spot => spot.getVehicle() === vehicle);
        this.parkedVehicles.set(vehicle.getLicensePlate(), { level, spots });
        return true;
      }
    }
    return false;
  }

  leaveVehicle(licensePlate: string): boolean {
    const vehicleInfo = this.parkedVehicles.get(licensePlate);
    if (!vehicleInfo) {
      return false;
    }

    const { level, spots } = vehicleInfo;
    for (const spot of spots) {
      level.leaveVehicle(spot.getVehicle()!);
    }
    
    this.parkedVehicles.delete(licensePlate);
    return true;
  }

  isVehicleParked(licensePlate: string): boolean {
    return this.parkedVehicles.has(licensePlate);
  }

  getParkingInfo(licensePlate: string): { level: number; spots: number[] } | null {
    const vehicleInfo = this.parkedVehicles.get(licensePlate);
    if (!vehicleInfo) {
      return null;
    }

    return {
      level: vehicleInfo.level.getLevelNumber(),
      spots: vehicleInfo.spots.map(spot => spot.getId())
    };
  }

  getAvailableSpots(): Map<SpotType, number> {
    const totalAvailable = new Map<SpotType, number>();

    for (const level of this.levels) {
      for (const spotType of Object.values(SpotType)) {
        const count = level.getAvailableSpots(spotType);
        const current = totalAvailable.get(spotType) || 0;
        totalAvailable.set(spotType, current + count);
      }
    }

    return totalAvailable;
  }

  getTotalSpots(): Map<SpotType, number> {
    const totalSpots = new Map<SpotType, number>();
    
    for (const level of this.levels) {
      for (const spot of level.getSpots()) {
        const spotType = spot.getType();
        const current = totalSpots.get(spotType) || 0;
        totalSpots.set(spotType, current + 1);
      }
    }
    
    return totalSpots;
  }
}

// Factory pattern for creating vehicles
export class VehicleFactory {
  static createVehicle(type: VehicleType, licensePlate: string): Vehicle {
    switch (type) {
      case VehicleType.MOTORCYCLE:
        return new Motorcycle(licensePlate);
      case VehicleType.CAR:
        return new Car(licensePlate);
      case VehicleType.BUS:
        return new Bus(licensePlate);
      default:
        throw new Error(`Unknown vehicle type: ${type}`);
    }
  }
}

// Builder pattern for creating parking lots
export class ParkingLotBuilder {
  private levels: Level[] = [];

  addLevel(motorcycleSpots: number, compactSpots: number, largeSpots: number): ParkingLotBuilder {
    const levelNumber = this.levels.length + 1;
    this.levels.push(new Level(levelNumber, motorcycleSpots, compactSpots, largeSpots));
    return this;
  }

  build(): ParkingLot {
    if (this.levels.length === 0) {
      throw new Error('Parking lot must have at least one level');
    }
    return new ParkingLot(this.levels);
  }
} 
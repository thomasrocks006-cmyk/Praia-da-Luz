export interface CameraView {
  position: [number, number, number];
  target: [number, number, number];
  label: string;
}

export interface WallSegment {
  x: number;
  z: number;
  width: number;
  height: number;
  rotation: number; // in radians
  type: 'external' | 'internal' | 'partition';
  features?: {
    type: 'door' | 'window' | 'patio_door';
    offset: number; // offset from center of wall
    width: number;
    height: number;
  }[];
}

// 1 Unit = 1 Meter
export const CONSTANTS = {
  WALL_HEIGHT: 2.8,
  BLOCK_5_WIDTH: 30, // Approximate total width of block 5
  BLOCK_5_DEPTH: 10,
  POOL_RADIUS: 8,
  TAPAS_DISTANCE_Z: 45, // Distance from Block 5 to Tapas roughly
};

export const VIEWS: Record<string, CameraView> = {
  OVERVIEW: {
    position: [40, 50, 40],
    target: [0, 0, 0],
    label: "Satellie Overview"
  },
  TAPAS: {
    position: [15, 1.7, 40], 
    target: [-15, 2, -30],
    label: "Witness View (Tapas)"
  },
  STREET: {
    position: [-25, 1.7, -38],
    target: [-15, 1.7, -30],
    label: "Street View (Rua Dr Agostinho)"
  },
  PATIO: {
    position: [-15, 1.7, -22],
    target: [-15, 1.7, -30],
    label: "Apt 5A Patio"
  },
  BEDROOM: {
    position: [-16, 2.5, -31],
    target: [-16, 1.0, -34],
    label: "Kids Bedroom Window"
  }
};
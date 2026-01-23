export interface PlanetType {
  id: string;
  name: string;
  color: string;
  size: number;
  orbitSize: number;
  speed: number;
  description: string;
  habitability: number; 
  resources: number; 
}

export const PLANET_DATA: PlanetType[] = [
  { id: 'p1', name: 'Astra', color: '#a0e1ff', size: 22, orbitSize: 230, speed: 6, 
    description: 'A frozen world with vast subsurface oceans and high resource density.',
    habitability: 35, resources: 92 
  },
  { id: 'p2', name: 'Helios', color: '#ffb347', size: 28, orbitSize: 310, speed: 10, 
    description: 'Scorched by the central star, featuring highly volatile atmospheric storms.',
    habitability: 5, resources: 65 
  },
  { id: 'p3', name: 'Nova', color: '#ff6b6b', size: 24, orbitSize: 390, speed: 15, 
    description: 'A fiery, highly active volcanic world rich in rare minerals.',
    habitability: 12, resources: 88 
  },
  { id: 'p4', name: 'Kyber', color: '#4ade80', size: 38, orbitSize: 480, speed: 22, 
    description: 'Lush and overgrown, covered in bioluminescent flora.',
    habitability: 89, resources: 45 
  },
  { id: 'p5', name: 'Orion', color: '#c084fc', size: 32, orbitSize: 580, speed: 30, 
    description: 'A gas giant with beautiful rings and a highly unstable core.',
    habitability: 0, resources: 78 
  },
];
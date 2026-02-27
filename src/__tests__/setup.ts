import { vi } from 'vitest'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
} as any;
global.IntersectionObserver = class IntersectionObserver {
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
} as any;

// Mock Firebase App (Client)
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({})),
  getApps: vi.fn(() => []),
  getApp: vi.fn(() => ({})),
}))

// Mock Firebase Auth (Client)
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({
      app: {},})),
  onAuthStateChanged: vi.fn((auth, cb) => {
    // Default to unauthenticated for tests unless overridden
    cb(null)
    return () => {}
  }),
  signOut: vi.fn(() => Promise.resolve()),
}))

// Mock Firebase Firestore (Client)
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  Timestamp: {
    now: vi.fn(() => ({ toDate: () => new Date() })),
    fromDate: vi.fn((date) => ({ toDate: () => date })),
  },
}))

// Mock Firebase Admin (Server)
vi.mock('firebase-admin', () => {
  const admin = {
    apps: [],
    initializeApp: vi.fn().mockImplementation(() => {
      // @ts-ignore
      admin.apps.push({} as any)
      return admin.apps[0]
    }),
    credential: {
      cert: vi.fn(() => ({})),
    },
    auth: vi.fn(() => ({
      verifyIdToken: vi.fn().mockResolvedValue({ role: 'ADMIN', email: 'admin@smartmotor.ae' }),
      listUsers: vi.fn().mockResolvedValue({ users: [] }),
      createUser: vi.fn((data: any) => Promise.resolve({ uid: 'mock-uid', email: data.email })),
      deleteUser: vi.fn().mockResolvedValue(true),
      getUser: vi.fn().mockResolvedValue({ customClaims: { role: 'ADMIN' } }),
      setCustomUserClaims: vi.fn().mockResolvedValue(true),
    })),
    database: vi.fn(() => {
      const dbMock: any = {
        ref: vi.fn().mockReturnThis(),
        once: vi.fn().mockResolvedValue({ exists: () => true, val: () => ({ message: 'RTDB test', source: 'test', type: 'consistency-test', status: 'connected' }) }),
        set: vi.fn().mockResolvedValue({}),
        update: vi.fn().mockResolvedValue({}),
        remove: vi.fn().mockResolvedValue({}),
        child: vi.fn().mockReturnThis(),
      }
      return dbMock;
    }),
    app: vi.fn(() => ({
      database: vi.fn(() => ({
        ref: vi.fn().mockReturnThis(),
      })),
      auth: vi.fn(() => ({})),
    })),
  }
  return { default: admin }
})

vi.mock('firebase-admin/auth', () => {
  return {
    getAuth: vi.fn(() => ({
      app: {},
      verifyIdToken: vi.fn().mockResolvedValue({ role: 'ADMIN', email: 'admin@smartmotor.ae' }),
      listUsers: vi.fn().mockResolvedValue({ users: [] }),
      createUser: vi.fn((data: any) => Promise.resolve({ uid: 'mock-uid', email: data.email })),
      deleteUser: vi.fn().mockResolvedValue(true),
      getUser: vi.fn().mockResolvedValue({ customClaims: { role: 'ADMIN' } }),
      setCustomUserClaims: vi.fn().mockResolvedValue(true),
    }))
  };
});

vi.mock('firebase-admin/database', () => {
  return {
    getDatabase: vi.fn(() => {
      const refMock = vi.fn().mockReturnThis();
      const mockSnap = { exists: () => true, val: () => ({ message: 'RTDB test', source: 'test', type: 'consistency-test', status: 'connected' }) };
      return {
        ref: vi.fn(() => ({
          once: vi.fn().mockResolvedValue(mockSnap),
          set: vi.fn().mockResolvedValue({}),
          update: vi.fn().mockResolvedValue({}),
          remove: vi.fn().mockResolvedValue({}),
          child: vi.fn(() => ({
             once: vi.fn().mockResolvedValue({ val: () => 'test' })
          })),
        }))
      }
    })
  };
});

vi.mock('firebase-admin/firestore', () => {
  const mockQuery = {
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    get: vi.fn().mockResolvedValue({ docs: [], empty: true, size: 0 }),
  };

  const mockDoc = {
    get: vi.fn().mockResolvedValue({ exists: true, data: () => ({ success: true, type: 'consistency-test', items: new Array(100), array: [1,2,3], object: { nested: 'value'} }) }),
    set: vi.fn().mockResolvedValue({}),
    update: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  };

  const mockCollection = vi.fn(() => ({
    ...mockQuery,
    doc: vi.fn(() => mockDoc),
    add: vi.fn().mockResolvedValue({ id: 'new-id' }),
  }));

  return {
    getFirestore: vi.fn(() => ({
      collection: mockCollection,
      batch: vi.fn(() => ({
        set: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
        commit: vi.fn().mockResolvedValue({}),
      })),
      runTransaction: vi.fn(async (cb: any) => {
         await cb({
           get: vi.fn().mockResolvedValue({ exists: true, data: () => ({}) }),
           set: vi.fn(),
           update: vi.fn(),
           delete: vi.fn(),
         });
         return {};
      }),
    })),
    Timestamp: {
      now: vi.fn(() => ({ toDate: () => new Date() })),
      fromDate: vi.fn((date: any) => ({ toDate: () => date })),
    },
  };
});

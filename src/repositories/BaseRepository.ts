import { Entity } from '@/entities/Entity';
import { firestore } from '@/lib/firebase';
import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  Query,
  QueryConstraint,
  QuerySnapshot,
  Unsubscribe,
  WriteBatch,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

export class BaseFirebaseRepository<T extends Entity> {
  protected readonly collectionName: string;
  protected readonly db: Firestore;

  constructor(collectionName: string, db: Firestore = firestore) {
    this.db = db;
    this.collectionName = collectionName;
  }

  async create(data: Omit<T, 'id'>): Promise<T> {
    const docRef = doc(collection(this.db, this.collectionName));
    const timestamp = new Date();

    const entity = {
      ...data,
      id: docRef.id,
      createdAt: timestamp,
      updatedAt: timestamp,
    } as T;

    await setDoc(docRef, this.serialize(entity));
    return entity;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(this.db, this.collectionName, id);
    const updateData = {
      ...data,
      updatedAt: new Date(),
    };

    await updateDoc(docRef, this.serialize(updateData));
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  async findById(id: string): Promise<T | null> {
    const docRef = doc(this.db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return this.deserialize(docSnap);
  }

  async findAll(): Promise<T[]> {
    const querySnapshot = await getDocs(
      collection(this.db, this.collectionName)
    );
    return querySnapshot.docs.map((doc) => this.deserialize(doc));
  }

  async findWhere(field: keyof T, value: any): Promise<T[]> {
    const q = query(
      collection(this.db, this.collectionName),
      where(field as string, '==', value)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => this.deserialize(doc));
  }

  async createBatch(items: Omit<T, 'id'>[]): Promise<T[]> {
    const batch = writeBatch(this.db);
    const timestamp = new Date();

    const entities: T[] = items.map((item) => {
      const docRef = doc(collection(this.db, this.collectionName));
      const entity = {
        ...item,
        id: docRef.id,
        createdAt: timestamp,
        updatedAt: timestamp,
      } as T;

      batch.set(docRef, this.serialize(entity));
      return entity;
    });

    await batch.commit();
    return entities;
  }

  async updateBatch(
    items: Array<{ id: string; data: Partial<T> }>
  ): Promise<void> {
    const batch = writeBatch(this.db);
    const timestamp = new Date();

    items.forEach(({ id, data }) => {
      const docRef = doc(this.db, this.collectionName, id);
      const updateData = {
        ...data,
        updatedAt: timestamp,
      };
      batch.update(docRef, this.serialize(updateData));
    });

    await batch.commit();
  }

  async deleteBatch(ids: string[]): Promise<void> {
    const batch = writeBatch(this.db);

    ids.forEach((id) => {
      const docRef = doc(this.db, this.collectionName, id);
      batch.delete(docRef);
    });

    await batch.commit();
  }

  async exists(id: string): Promise<boolean> {
    const docRef = doc(this.db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  }

  /**
   * Listen to a single document's real-time updates
   * @param id Document ID to listen to
   * @param onNext Callback function for document updates
   * @param onError Optional error handler
   * @returns Unsubscribe function
   */
  listenToDocument(
    id: string,
    onNext: (data: T | null) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const docRef = doc(this.db, this.collectionName, id);

    return onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          onNext(null);
          return;
        }
        onNext(this.deserialize(snapshot));
      },
      onError
    );
  }

  /**
   * Listen to multiple documents with optional query constraints
   * @param queryConstraints Optional array of query constraints (where, orderBy, limit, etc.)
   * @param onNext Callback function for query updates
   * @param onError Optional error handler
   * @returns Unsubscribe function
   */
  listenToCollection(
    onNext: (data: T[]) => void,
    queryConstraints: QueryConstraint[] = [],
    onError?: (error: Error) => void
  ): Unsubscribe {
    const collectionRef = collection(this.db, this.collectionName);
    const queryRef = query(collectionRef, ...queryConstraints);

    return onSnapshot(
      queryRef,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => this.deserialize(doc));
        onNext(items);
      },
      onError
    );
  }

  /**
   * Listen to collection changes with automatic query builder
   * @param conditions Object containing field conditions for the query
   * @param onNext Callback function for query updates
   * @param onError Optional error handler
   * @returns Unsubscribe function
   */
  listenWhere(
    conditions: Partial<Record<keyof T, any>>,
    onNext: (data: T[]) => void,
    onError?: (error: Error) => void
  ): Unsubscribe {
    const queryConstraints: QueryConstraint[] = Object.entries(conditions).map(
      ([field, value]) => where(field, '==', value)
    );
    const queryRef = query(
      collection(this.db, this.collectionName),
      ...queryConstraints
    );
    return onSnapshot(
      queryRef,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => this.deserialize(doc));
        onNext(items);
      },
      onError
    );
  }

  /**
   * Helper method to serialize dates and remove undefined values before storing in Firestore
   */
  protected serialize(obj: Partial<T>): DocumentData {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value === undefined) {
        return acc;
      }
      if (value instanceof Date) {
        acc[key] = value;
      } else {
        acc[key] = value;
      }

      return acc;
    }, {} as DocumentData);
  }

  /**
   * Helper method to deserialize Firestore data into entity type
   */
  protected deserialize(doc: DocumentSnapshot): T {
    const data = doc.data();
    if (!data) {
      throw new Error(`No data found for document ${doc.id}`);
    }
    return {
      ...data,
      id: doc.id,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as T;
  }
}

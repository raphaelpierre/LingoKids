import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  arrayUnion,
  increment
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import { UserProgress, GameScore } from '../../types';

export class ProgressService {
  private static instance: ProgressService;

  private constructor() {}

  public static getInstance(): ProgressService {
    if (!ProgressService.instance) {
      ProgressService.instance = new ProgressService();
    }
    return ProgressService.instance;
  }

  public async getUserProgress(userId: string): Promise<UserProgress> {
    const docRef = doc(db, 'progress', userId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      const initialProgress: UserProgress = {
        points: 0,
        wordsLearned: [],
        gameScores: [],
        language: 'en'
      };
      await setDoc(docRef, initialProgress);
      return initialProgress;
    }

    return docSnap.data() as UserProgress;
  }

  public async updatePoints(userId: string, points: number): Promise<void> {
    const docRef = doc(db, 'progress', userId);
    await updateDoc(docRef, {
      points: increment(points)
    });
  }

  public async addLearnedWord(userId: string, wordId: string): Promise<void> {
    const docRef = doc(db, 'progress', userId);
    await updateDoc(docRef, {
      wordsLearned: arrayUnion(wordId)
    });
  }

  public async addGameScore(userId: string, score: GameScore): Promise<void> {
    const docRef = doc(db, 'progress', userId);
    await updateDoc(docRef, {
      gameScores: arrayUnion(score)
    });
  }

  public async updateLanguage(userId: string, language: 'en' | 'fr'): Promise<void> {
    const docRef = doc(db, 'progress', userId);
    await updateDoc(docRef, { language });
  }
}

export const progressService = ProgressService.getInstance();
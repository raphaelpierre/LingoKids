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
import { getAuth } from 'firebase/auth';

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
    try {
      console.log(`🔍 Fetching progress for user: ${userId}`);
      
      // Additional authentication check
      const auth = getAuth();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error('No authenticated user found');
      }
      
      if (currentUser.uid !== userId) {
        throw new Error('Unauthorized access to user progress');
      }

      const docRef = doc(db, 'progress', userId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        console.log(`📝 Creating initial progress for user: ${userId}`);
        const initialProgress: UserProgress = {
          points: 0,
          wordsLearned: [],
          gameScores: [],
          language: 'en'
        };
        await setDoc(docRef, initialProgress, { merge: true });
        return initialProgress;
      }

      const progress = docSnap.data() as UserProgress;
      console.log('✅ Progress fetched successfully', progress);
      return progress;
    } catch (error) {
      console.error('❌ Error in getUserProgress:', error);
      throw error;
    }
  }

  public async updatePoints(userId: string, points: number): Promise<void> {
    try {
      console.log(`💯 Updating points for user: ${userId}, Points: ${points}`);
      const docRef = doc(db, 'progress', userId);
      await updateDoc(docRef, {
        points: increment(points)
      });
      console.log('✅ Points updated successfully');
    } catch (error) {
      console.error('❌ Error updating points:', error);
      throw error;
    }
  }

  public async addLearnedWord(userId: string, wordId: string): Promise<void> {
    try {
      console.log(`📚 Adding learned word for user: ${userId}, Word: ${wordId}`);
      const docRef = doc(db, 'progress', userId);
      await updateDoc(docRef, {
        wordsLearned: arrayUnion(wordId)
      });
      console.log('✅ Learned word added successfully');
    } catch (error) {
      console.error('❌ Error adding learned word:', error);
      throw error;
    }
  }

  public async addGameScore(userId: string, score: GameScore): Promise<void> {
    try {
      console.log(`📊 Adding game score for user: ${userId}, Score: ${score}`);
      const docRef = doc(db, 'progress', userId);
      await updateDoc(docRef, {
        gameScores: arrayUnion(score)
      });
      console.log('✅ Game score added successfully');
    } catch (error) {
      console.error('❌ Error adding game score:', error);
      throw error;
    }
  }

  public async updateLanguage(userId: string, language: 'en' | 'fr'): Promise<void> {
    try {
      console.log(`🇫🇷 Updating language for user: ${userId}, Language: ${language}`);
      const docRef = doc(db, 'progress', userId);
      await updateDoc(docRef, { language });
      console.log('✅ Language updated successfully');
    } catch (error) {
      console.error('❌ Error updating language:', error);
      throw error;
    }
  }
}

export const progressService = ProgressService.getInstance();
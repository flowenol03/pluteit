import { app } from '../../config';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

export const database = getDatabase(app);
export const storage = getStorage(app);
export default app;
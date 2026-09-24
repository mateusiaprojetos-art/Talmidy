import { db } from './index.ts';
import { users, notes, flashcards, generatedStudies } from './schema.ts';
import { eq, and, desc } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, displayName?: string, photoUrl?: string) {
  try {
    const result = await db.insert(users)
      .values({
        uid,
        email,
        displayName,
        photoUrl,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          displayName: displayName || undefined,
          photoUrl: photoUrl || undefined,
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Failed in getOrCreateUser:', error);
    throw new Error('Database operation failed', { cause: error });
  }
}

export async function updateUserProfile(uid: string, data: Partial<typeof users.$inferInsert>) {
  try {
    const result = await db.update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.uid, uid))
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to update user profile:', error);
    throw new Error('Database operation failed', { cause: error });
  }
}

export async function getUserNotes(uid: string) {
  try {
    return await db.select().from(notes).where(eq(notes.userId, uid)).orderBy(desc(notes.updatedAt));
  } catch (error) {
    console.error('Failed to fetch user notes:', error);
    throw new Error('Database operation failed', { cause: error });
  }
}

export async function createUserNote(uid: string, noteData: { title: string; content: string; verseRef?: string; tags?: string[]; isFavorite?: boolean }) {
  try {
    const result = await db.insert(notes)
      .values({
        userId: uid,
        title: noteData.title,
        content: noteData.content,
        verseRef: noteData.verseRef,
        tags: noteData.tags || [],
        isFavorite: noteData.isFavorite || false,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to create user note:', error);
    throw new Error('Database operation failed', { cause: error });
  }
}

export async function updateUserNote(uid: string, noteId: number, noteData: Partial<typeof notes.$inferInsert>) {
  try {
    const result = await db.update(notes)
      .set({ ...noteData, updatedAt: new Date() })
      .where(and(eq(notes.id, noteId), eq(notes.userId, uid)))
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to update note:', error);
    throw new Error('Database operation failed', { cause: error });
  }
}

export async function deleteUserNote(uid: string, noteId: number) {
  try {
    const result = await db.delete(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, uid)))
      .returning();
    return result[0];
  } catch (error) {
    console.error('Failed to delete note:', error);
    throw new Error('Database operation failed', { cause: error });
  }
}

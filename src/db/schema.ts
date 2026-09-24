import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

// Users table (synced with Firebase Auth UID)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  photoUrl: text('photo_url'),
  level: text('level').default('Talmid'), // Talmid, Chaver, Rabbi
  xp: integer('xp').default(0),
  shabbatCity: text('shabbat_city').default('São Paulo'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// User Notes & Studies
export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // references users.uid
  title: text('title').notNull(),
  content: text('content').notNull(),
  verseRef: text('verse_ref'),
  tags: jsonb('tags').$type<string[]>().default([]),
  isFavorite: boolean('is_favorite').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Flashcards progress
export const flashcards = pgTable('flashcards', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // references users.uid
  cardId: text('card_id').notNull(),
  hebrew: text('hebrew').notNull(),
  transliteration: text('transliteration').notNull(),
  translation: text('translation').notNull(),
  box: integer('box').default(1),
  nextReviewDate: timestamp('next_review_date').defaultNow(),
  timesCorrect: integer('times_correct').default(0),
  timesIncorrect: integer('times_incorrect').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// Study Plans & Generated Studies
export const generatedStudies = pgTable('generated_studies', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  topic: text('topic').notNull(),
  mode: text('mode').notNull(),
  depthLevel: text('depth_level').notNull(),
  contentMarkdown: text('content_markdown').notNull(),
  slides: jsonb('slides').$type<any[]>().default([]),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  notes: many(notes),
  flashcards: many(flashcards),
  generatedStudies: many(generatedStudies),
}));

// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id            String         @id @default(auto()) @map("_id") @db.ObjectId
  clerkId       String        @unique
  transcriptions Transcription[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model Transcription {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  text      String
  corrected String?
  userId    String   @db.ObjectId
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "uploadedById" INTEGER;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "audioPostUrl" TEXT,
ADD COLUMN     "readTime" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImageUrl" TEXT;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

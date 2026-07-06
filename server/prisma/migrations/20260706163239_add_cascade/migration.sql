-- DropForeignKey
ALTER TABLE "Point" DROP CONSTRAINT "Point_routeId_fkey";

-- DropForeignKey
ALTER TABLE "RoutesImg" DROP CONSTRAINT "RoutesImg_routeId_fkey";

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutesImg" ADD CONSTRAINT "RoutesImg_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

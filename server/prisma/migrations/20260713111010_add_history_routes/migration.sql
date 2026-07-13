-- CreateTable
CREATE TABLE "HistoryRoutes" (
    "id" SERIAL NOT NULL,
    "routeId" INTEGER NOT NULL,
    "version" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL,
    "statusId" INTEGER,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HistoryRoutes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryPoint" (
    "id" SERIAL NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "historyId" INTEGER NOT NULL,

    CONSTRAINT "HistoryPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryRoutesImg" (
    "id" SERIAL NOT NULL,
    "img" TEXT NOT NULL,
    "historyId" INTEGER NOT NULL,

    CONSTRAINT "HistoryRoutesImg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HistoryRoutes_routeId_version_key" ON "HistoryRoutes"("routeId", "version");

-- AddForeignKey
ALTER TABLE "HistoryRoutes" ADD CONSTRAINT "HistoryRoutes_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Routes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryRoutes" ADD CONSTRAINT "HistoryRoutes_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "RoutStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryRoutes" ADD CONSTRAINT "HistoryRoutes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryPoint" ADD CONSTRAINT "HistoryPoint_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "HistoryRoutes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryRoutesImg" ADD CONSTRAINT "HistoryRoutesImg_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "HistoryRoutes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

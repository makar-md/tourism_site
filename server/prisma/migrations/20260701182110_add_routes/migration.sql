-- CreateTable
CREATE TABLE "Routes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Point" (
    "id" SERIAL NOT NULL,
    "lat" INTEGER NOT NULL,
    "lng" INTEGER NOT NULL,
    "routeId" INTEGER,

    CONSTRAINT "Point_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Routes_name_key" ON "Routes"("name");

-- AddForeignKey
ALTER TABLE "Point" ADD CONSTRAINT "Point_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Routes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

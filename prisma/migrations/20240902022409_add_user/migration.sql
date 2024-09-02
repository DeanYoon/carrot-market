-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "github_id" TEXT,
    "avatar" TEXT DEFAULT 'https://media.istockphoto.com/id/476085198/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9%E3%83%9E%E3%83%B3%E3%82%B7%E3%83%AB%E3%82%A8%E3%83%83%E3%83%88%E3%81%AE%E3%82%A2%E3%83%90%E3%82%BF%E3%83%BC%E3%81%BE%E3%81%9F%E3%81%AF%E5%88%9D%E6%9C%9F%E7%99%BB%E9%8C%B2%E6%83%85%E5%A0%B1%E3%81%AE%E5%86%99%E7%9C%9F.jpg?s=612x612&w=is&k=20&c=pRJh3FkzwgkuJte_KCTd6U6agSNFvcBd9ai49F5pg6g=',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");

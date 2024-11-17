const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try{
        // await database.category.deleteMany();
        await database.category.createMany({
            data: [
                // {name: "Web Development"},
            ]
        });

        console.log("Data seeded successfully");
    }
    catch(error){
        console.log("Error seeding data", error);
    }
    finally{
        await database.$disconnect();
    }
}

main();
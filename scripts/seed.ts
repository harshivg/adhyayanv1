const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try{
        // await database.category.deleteMany();
        await database.category.createMany({
            data: [
                { name: "Web Development" },
                { name: "Mobile Development" },
                { name: "Data Science" },
                { name: "Machine Learning" },
                { name: "UI/UX" },
                { name: "Game Development" },
                { name: "Cybersecurity" },
                { name: "Cloud Computing" },
                { name: "DevOps" },
                { name: "Digital Marketing" },
                { name: "Business" },
                { name: "Finance" },
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
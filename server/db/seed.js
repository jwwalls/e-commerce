const client = require("./client");

const dropTables = async () => {
    try {
        console.log("Starting to drop all tables...");
        await client.query(`
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS carts CASCADE;
    `);
        console.log("Finished dropping all tables successfully!");
    } catch (error) {
        console.error("Error dropping tables");
        throw error;
    }
};

const createTables = async () => {
    try {
        console.log("Starting to create all tables...");
        await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      shoeFeatures VARCHAR(255),
      materialQuality VARCHAR(255),
      sizesAccessories VARCHAR(255),
      price NUMERIC(10, 2) NOT NULL,
      category VARCHAR(255),
      image_url VARCHAR(255)
    );
    CREATE TABLE carts (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      product_id INT REFERENCES products(id),
      image_url VARCHAR(255),
      quantity INT,
      price VARCHAR(255)
    );
    `);
        console.log(
            "Finished creating all tables successfully! Now, to add some data!"
        );
    } catch (error) {
        console.error("Error creating tables");
        throw error;
    }
};

const createInitialUsers = async () => {
    try {
        console.log('Adding initial users to "Users" table...');

        const users = [
            { username: "user1", password: "password1" },
            { username: "user2", password: "password2" },
            // Add more user objects as needed
        ];

        for (let user of users) {
            await client.query(
                `
        INSERT INTO users (username, password)
        VALUES ($1, $2)
        RETURNING *;
      `,
                [user.username, user.password]
            );
            // Create a cart for the user
        }

        console.log("Finished adding users and carts!");
    } catch (error) {
        console.error("Error creating initial users and carts:", error);
        throw error;
    }
};

const path = require("path");

const createInitialProducts = async () => {
    try {
        console.log('Adding initial products to "Products" table...');

        const products = [
            {
                name: "SparkStride",
                shoeFeatures: "Lightweight",
                materialQuality: `
          - Premium leather upper for a luxurious look and durability. 
          - High-quality craftsmanship for long-lasting performance.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes. 
          - Comes with an additional set of colorful shoelaces for customization. 
          - Shoebox included.`,
                price: 130,
                category: "men",
                image_url: "/pics/SparkStride.png",
            },
            {
                name: "TrailBlazer",
                shoeFeatures: `
          - Rugged design, perfect for hiking and off-road adventures.
          - Water-resistant material to keep feet dry. 
          - Reinforced toe box for protection.`,
                materialQuality: `
          - Made with durable leather and synthetic upper for high-performance. 
          - Slip-resistant rubber outsole for reliable traction.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Includes spare laces in a contrast color.
          - Shoebox included.`,
                price: 120,
                category: "men",
                image_url: "/pics/TrailBlazer.png",
            },
            {
                name: "UrbanWalker",
                shoeFeatures: `
          - Stylish design, perfect for city life and casual walks.
          - Eco-friendly canvas upper for a trendy look.
          - Comfort insole for all-day wear.`,
                materialQuality: `
          - Constructed with organic cotton upper and natural rubber soles.
          - Ethically produced for sustainable fashion.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with additional colored shoelaces for personal customization.
          - Shoebox included.`,
                price: 95,
                category: "men",
                image_url: "/pics/UrbanWalker.png",
            },
            {
                name: "GymFlex",
                shoeFeatures: `
          - Flexibility-focused design, perfect for gym workouts and yoga.
          - Lightweight and breathable material for maximum comfort.
          - Soft insole to reduce foot strain.`,
                materialQuality: `
          - Made with breathable fabric upper for air circulation.
          - High elasticity outsole for diverse movements.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Includes an extra pair of comfort insoles.
          - Shoebox included.`,
                price: 105,
                category: "men",
                image_url: "/pics/GymFlex.png",
            },
            {
                name: "AquaStride",
                shoeFeatures: `
          - Water-ready design, perfect for beaches and water sports.
          - Quick-drying material for continuous comfort.
          - Grippy outsole for slippery surfaces.`,
                materialQuality: `
          - Made with quick-dry neoprene upper and rubber outsole for water resistance.
          - Durable construction for longevity.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with a mesh carry bag for transportation.
          - Shoebox included.`,
                price: 115,
                category: "men",
                image_url: "/pics/AquaStride.png",
            },
            {
                name: "WinterGuard",
                shoeFeatures: `
          - Insulated design, perfect for cold weather and snow.
          - Waterproof material to keep feet dry.
          - High-grip outsole for ice and snow.`,
                materialQuality: `
          - Constructed with waterproof leather upper and synthetic soles.
          - Thermal insulation for extreme cold weather conditions.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Includes an extra pair of warm socks.
          - Shoebox included.`,
                price: 140,
                category: "men",
                image_url: "/pics/WinterGuard.png",
            },
            {
                name: "SummerBreeze",
                shoeFeatures: `
          - Open design, perfect for hot weather and beaches.
          - Breathable material for continuous comfort.
          - Lightweight and easy to wear.`,
                materialQuality: `
          - Constructed with eco-friendly hemp fibers and rubber soles.
          - High-quality stitching for long-term use.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with a shoe cleaner kit.
          - Shoebox included.`,
                price: 100,
                category: "men",
                image_url: "/pics/SummerBreeze.png",
            },
            {
                name: "SpeedRunner",
                shoeFeatures: `
          - Performance design, perfect for sprinting and marathons.
          - Lightweight and aerodynamic for optimal speed.
          - Cushioned insole for shock absorption.`,
                materialQuality: `
          - Constructed with high-quality synthetic upper and rubber soles.
          - Engineered for high-speed performance and durability.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with an additional set of high-performance shoelaces.
          - Shoebox included.`,
                price: 215,
                category: "men",
                image_url: "/pics/SpeedRunner.png",
            },
            {
                name: "TrailMaster",
                shoeFeatures: `
          - Heavy-duty design, perfect for hiking and trail running.
          - Reinforced toe and heel for protection.
          - High-traction outsole for grip on rough terrain.`,
                materialQuality: `
          - Constructed with durable leather upper and rubber outsoles.
          - Built to withstand challenging outdoor conditions.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with an additional set of heavy-duty shoelaces.
          - Shoebox included.`,
                price: 200,
                category: "sale",
                image_url: "/pics/TrailMaster.png",
            },
            {
                name: "DanceRhythm",
                shoeFeatures: `
          - Flexible design, perfect for dancing and rhythmic gymnastics.
          - Soft and lightweight for effortless movements.
          - Cushioned insole for comfort.`,
                materialQuality: `
          - Constructed with premium synthetic upper and flexible rubber soles.
          - Designed for performance and durability.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with an additional set of colored shoelaces for personal customization.
          - Shoebox included.`,
                price: 120,
                category: "men",
                image_url: "/pics/DanceRhythm.png",
            },
            {
                name: "Midnight Enchantress",
                shoeFeatures: `
          - Heavy-duty design, perfect for hiking and trail running.
          - Reinforced toe and heel for protection.
          - High-traction outsole for grip on rough terrain.`,
                materialQuality: `
          - Constructed with durable leather upper and rubber outsoles.
          - Built to withstand challenging outdoor conditions.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with an additional set of heavy-duty shoelaces.
          - Shoebox included.`,
                price: 200,
                category: "women",
                image_url: "/pics/Midnight Enchantress.png",
            },
            {
                name: "Velvet Whisper",
                shoeFeatures: `
          - Flexible design, perfect for dancing and rhythmic gymnastics.
          - Soft and lightweight for effortless movements.
          - Cushioned insole for comfort.`,
                materialQuality: `
          - Constructed with premium synthetic upper and flexible rubber soles.
          - Designed for performance and durability.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with an additional set of colored shoelaces for personal customization.
          - Shoebox included.`,
                price: 120,
                category: "women",
                image_url: "/pics/Velvet Whisper.png",
            },
            {
                name: "Celestial Charm",
                shoeFeatures: `
          - Designed for flexibility and comfort.
          - Breathable material allows for maximum airflow.
          - Cushioned soles provide support during workouts.`,
                materialQuality: `
          - Crafted from high-grade synthetic materials.
          - Outsoles are made from durable rubber that provides grip on a variety of surfaces.`,
                sizesAccessories: `
          - Available in sizes from US 7 to 13, including half sizes.
          - Extra set of shoelaces included for customization.
          - Comes with a reusable shoebox.`,
                price: 105,
                category: "women",
                image_url: "/pics/Celestial Charm.png",
            },

            {
                name: "Crimson Desire",
                shoeFeatures: `
    - Sustainable design with an eco-friendly focus.
    - Shock-absorbing midsole for comfortable walking.
    - All-terrain outsole for traction and stability.`,
                materialQuality: `
    - Made with recycled materials and natural cork footbed.
    - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
    - Available in sizes ranging from US 5.5 to 10, including half sizes.
    - Comes with a plantable seed paper insole and recycled shoelaces.`,
                price: 175,
                category: "women",
                image_url: "/pics/Crimson Desire.png",
            },
            {
                name: "Dazzling Heights",
                shoeFeatures: `
    - Sustainable design with an eco-friendly focus.
    - Arch support for added comfort and stability.
    - Water-resistant upper for all-weather wear.`,
                materialQuality: `
    - Made with recycled materials and natural rubber soles.
    - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
    - Available in sizes ranging from US 6 to 11, including half sizes.
    - Comes with a reusable shoe bag made from recycled polyester.`,
                price: 195,
                category: "women",
                image_url: "/pics/Dazzling Heights.png",
            },
            {
                name: "Opulent Allure",
                shoeFeatures: `
    - Sustainable design with an eco-friendly focus.
    - Cushioned footbed for all-day comfort.
    - Slip-on style for easy wear.`,
                materialQuality: `
    - Made with recycled materials and natural jute soles.
    - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
    - Available in sizes ranging from US 5.5 to 9, including half sizes.
    - Comes with a biodegradable shoebox and organic cotton shoelaces.`,
                price: 135,
                category: "women",
                image_url: "/pics/Opulent Allure.png",
            },
            {
                name: "Radiant Glamour",
                shoeFeatures: `
    - Insulated design, perfect for cold weather and snow.
    - Waterproof material to keep feet dry.
    - High-grip outsole for ice and snow.`,
                materialQuality: `
    - Constructed with waterproof leather upper and synthetic soles.
    - Thermal insulation for extreme cold weather conditions.`,
                sizesAccessories: `
    - Available in sizes ranging from US 7 to 13, including half sizes.
    - Includes an extra pair of warm socks.
    - Shoebox included.`,
                price: 140,
                category: "sale",
                image_url: "/pics/Radiant Glamour.png",
            },
            {
                name: "Siren's Temptation",
                shoeFeatures: `
    - Open design, perfect for hot weather and beaches.
    - Breathable material for continuous comfort.
    - Lightweight and easy to wear.`,
                materialQuality: `
    - Constructed with eco-friendly hemp fibers and rubber soles.
    - High-quality stitching for long-term use.`,
                sizesAccessories: `
    - Available in sizes ranging from US 7 to 13, including half sizes.
    - Comes with a shoe cleaner kit.
    - Shoebox included.`,
                price: 100,
                category: "women",
                image_url: "/pics/Siren's Temptation.png",
            },
            {
                name: "Exquisite Grace",
                shoeFeatures: `
    - Performance design, perfect for sprinting and marathons.
    - Lightweight and aerodynamic for optimal speed.
    - Cushioned insole for shock absorption.`,
                materialQuality: `
    - Constructed with high-quality synthetic upper and rubber soles.
    - Engineered for high-speed performance and durability.`,
                sizesAccessories: `
    - Available in sizes ranging from US 7 to 13, including half sizes.
    - Comes with an additional set of high-performance shoelaces.
    - Shoebox included.`,
                price: 215,
                category: "women",
                image_url: "/pics/Exquisite Grace.png",
            },
            {
                name: "Gilded Elegance",
                shoeFeatures: `
    - Heavy-duty design, perfect for hiking and trail running.
    - Reinforced toe and heel for protection.
    - High-traction outsole for grip on rough terrain.`,
                materialQuality: `
    - Constructed with durable leather upper and rubber outsoles.
    - Built to withstand challenging outdoor conditions.`,
                sizesAccessories: `
    - Available in sizes ranging from US 7 to 13, including half sizes.
    - Comes with an additional set of heavy-duty shoelaces.
    - Shoebox included.`,
                price: 200,
                category: "women",
                image_url: "/pics/Gilded Elegance.png",
            },
            {
                name: "Enchanting Aura",
                shoeFeatures: `
    - Flexible design, perfect for dancing and rhythmic gymnastics.
    - Soft and lightweight for effortless movements.
    - Cushioned insole for comfort.`,
                materialQuality: `
    - Constructed with premium synthetic upper and flexible rubber soles.
    - Designed for performance and durability.`,
                sizesAccessories: `
    - Available in sizes ranging from US 7 to 13, including half sizes.
    - Comes with an additional set of colored shoelaces for personal customization.
    - Shoebox included.`,
                price: 120,
                category: "women",
                image_url: "/pics/Enchanting Aura.png",
            },
            {
                name: "Jewel Empress",
                shoeFeatures: `
    - Designed for flexibility and comfort.
    - Breathable material allows for maximum airflow.
    - Cushioned soles provide support during workouts.`,
                materialQuality: `
    - Crafted from high-grade synthetic materials.
    - Outsoles are made from durable rubber that provides grip on a variety of surfaces.`,
                sizesAccessories: `
    - Available in sizes from US 7 to 13, including half sizes.
    - Extra set of shoelaces included for customization.
    - Comes with a reusable shoebox.`,
                price: 105,
                category: "women",
                image_url: "/pics/Jewel Empress.png",
            },

            {
                name: "FlexFit",
                shoeFeatures: `
          - Designed for flexibility and comfort.
          - Breathable material allows for maximum airflow.
          - Cushioned soles provide support during workouts.`,
                materialQuality: `
          - Crafted from high-grade synthetic materials.
          - Outsoles are made from durable rubber that provides grip on a variety of surfaces.`,
                sizesAccessories: `
          - Available in sizes from US 7 to 13, including half sizes.
          - Extra set of shoelaces included for customization.
          - Comes with a reusable shoebox.`,
                price: 105,
                category: "men",
                image_url: "/pics/FlexFit.png",
            },
            {
                name: "SportWave",
                shoeFeatures: `
          - Designed for intense sporting activities.
          - Mesh material ensures maximum breathability.
          - Extra cushioning for prolonged comfort.`,
                materialQuality: `
          - Made from high-performance synthetic materials.
          - Durable rubber outsoles provide superior grip.`,
                sizesAccessories: `
          - Sizes US 7 to 13 available, including half sizes.
          - Comes with an extra pair of shoelaces.
          - Packed in a sustainable shoebox.`,
                price: 110,
                category: "women",
                image_url: "/pics/SportWave.png",
            },
            {
                name: "TrendStride",
                shoeFeatures: `
          - Fashionable design suitable for every outfit.
          - Breathable fabric ensures comfort all day.
          - Light cushioning for relaxed and easy strides.`,
                materialQuality: `
          - Composed of top-grade synthetic materials.
          - Outsoles made from sturdy rubber that ensures long-lasting use.`,
                sizesAccessories: `
          - Available in sizes US 7 to 13, including half sizes.
          - Additional shoelaces provided for customization.
          - Packaged in a reusable shoebox.`,
                price: 100,
                category: "men",
                image_url: "/pics/TrendStride.png",
            },
            {
                name: "ComfyWalk",
                shoeFeatures: `
          - Casual design perfect for everyday wear.
          - Breathable materials for all-day comfort.
          - Cushioned soles for easy walking.`,
                materialQuality: `
          - Made from high-quality synthetic materials.
          - Durable rubber outsoles for long-lasting use.`,
                sizesAccessories: `
          - Available in sizes US 7 to 13, including half sizes.
          - Extra pair of shoelaces included for customization.
          - Comes with a reusable shoebox.`,
                price: 100,
                category: "sale",
                image_url: "/pics/ComfyWalk.png",
            },
            {
                name: "SprintPro",
                shoeFeatures: `
          - Designed for running and athletic performance.
          - Breathable and lightweight for optimal comfort.
          - Cushioned soles for shock absorption.`,
                materialQuality: `
          - Made from high-quality synthetic materials.
          - Durable rubber outsoles for excellent traction.`,
                sizesAccessories: `
          - Sizes US 7 to 13 available, including half sizes.
          - Extra pair of shoelaces included.
          - Comes with a reusable shoebox.`,
                price: 130,
                category: "sale",
                image_url: "/pics/SprintPro.png",
            },
            {
                name: "TrailQueen",
                shoeFeatures: `
          - Rugged design perfect for hiking and outdoor adventures.
          - Water-resistant materials to keep feet dry.
          - Reinforced toe box for protection.`,
                materialQuality: `
          - Crafted from durable synthetic materials and rugged rubber outsoles.
          - Designed for long-lasting use in various terrains.`,
                sizesAccessories: `
          - Available in sizes US 7 to 13, including half sizes.
          - Additional shoelaces provided for customization.
          - Reusable shoebox included.`,
                price: 120,
                category: "women",
                image_url: "/pics/TrailQueen.png",
            },
            {
                name: "UrbanSleek",
                shoeFeatures: `
          - Stylish design perfect for city life and casual outings.
          - Comfortable and breathable for all-day wear.
          - Lightweight and easy to walk in.`,
                materialQuality: `
          - Made from high-quality synthetic materials.
          - Durable rubber outsoles for long-lasting use.`,
                sizesAccessories: `
          - Sizes US 7 to 13 available, including half sizes.
          - Comes with an extra pair of shoelaces.
          - Packed in a sustainable shoebox.`,
                price: 105,
                category: "sale",
                image_url: "/pics/UrbanSleek.png",
            },
            {
                name: "GlamFit",
                shoeFeatures: `
          - Fashionable design with a fitness focus.
          - Breathable mesh material for maximum comfort.
          - Cushioned soles for support during workouts.`,
                materialQuality: `
          - Crafted from high-quality synthetic materials.
          - Outsoles made from durable rubber for excellent grip.`,
                sizesAccessories: `
          - Availablein sizes from US 7 to 13, including half sizes.
          - Extra set of shoelaces included for customization.
          - Comes with a reusable shoebox.`,
                price: 115,
                category: "women",
                image_url: "/pics/GlamFit.png",
            },
            {
                name: "EcoChic",
                shoeFeatures: `
          - Sustainable design with an eco-friendly focus.
          - Breathable fabric for all-day comfort.
          - Lightweight and comfortable for everyday wear.`,
                materialQuality: `
          - Made with recycled materials and natural rubber soles.
          - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with an additional set of eco-friendly shoelaces.
          - Shoebox made from recycled materials included.`,
                price: 110,
                category: "women",
                image_url: "/pics/EcoChic.png",
            },
            {
                name: "EcoStyle",
                shoeFeatures: `
          - Sustainable design with an eco-friendly focus.
          - Cushioned insole for added comfort.
          - Stylish and versatile for any occasion.`,
                materialQuality: `
          - Made with recycled materials and vegan leather.
          - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
          - Available in sizes ranging from US 5 to 11, including half sizes.
          - Comes with a reusable shoe bag made from organic cotton.`,
                price: 145,
                category: "women",
                image_url: "/pics/EcoStyle.png",
            },
            {
                name: "GreenSole",
                shoeFeatures: `
          - Sustainable design with an eco-friendly focus.
          - Flexible sole for natural movement.
          - Breathable mesh upper for enhanced airflow.`,
                materialQuality: `
          - Made with recycled materials and natural latex soles.
          - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
          - Available in sizes ranging from US 6 to 12, including half sizes.
          - Comes with a recycled shoebox and eco-friendly shoe cleaner.`,
                price: 155,
                category: "sale",
                image_url: "/pics/GreenSole.png",
            },
            {
                name: "EarthWalk",
                shoeFeatures: `
          - Sustainable design with an eco-friendly focus.
          - Shock-absorbing midsole for comfortable walking.
          - All-terrain outsole for traction and stability.`,
                materialQuality: `
          - Made with recycled materials and natural cork footbed.
          - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
          - Available in sizes ranging from US 5.5 to 10, including half sizes.
          - Comes with a plantable seed paper insole and recycled shoelaces.`,
                price: 175,
                category: "sale",
                image_url: "/pics/EarthWalk.png",
            },
            {
                name: "SustainStep",
                shoeFeatures: `
          - Sustainable design with an eco-friendly focus.
          - Arch support for added comfort and stability.
          - Water-resistant upper for all-weather wear.`,
                materialQuality: `
          - Made with recycled materials and natural rubber soles.
          - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
          - Available in sizes ranging from US 6 to 11, including half sizes.
          - Comes with a reusable shoe bag made from recycled polyester.`,
                price: 195,
                category: "sale",
                image_url: "/pics/SustainStep.png",
            },
            {
                name: "NatureStride",
                shoeFeatures: `
          - Sustainable design with an eco-friendly focus.
          - Cushioned footbed for all-day comfort.
          - Slip-on style for easy wear.`,
                materialQuality: `
          - Made with recycled materials and natural jute soles.
          - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
          - Available in sizes ranging from US 5.5 to 9, including half sizes.
          - Comes with a biodegradable shoebox and organic cotton shoelaces.`,
                price: 135,
                category: "women",
                image_url: "/pics/NatureStride.png",
            },
            {
                name: "Aurora Elegance",
                shoeFeatures: `
          - Insulated design, perfect for cold weather and snow.
          - Waterproof material to keep feet dry.
          - High-grip outsole for ice and snow.`,
                materialQuality: `
          - Constructed with waterproof leather upper and synthetic soles.
          - Thermal insulation for extreme cold weather conditions.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Includes an extra pair of warm socks.
          - Shoebox included.`,
                price: 140,
                category: "women",
                image_url: "/pics/Aurora Elegance.png",
            },
            {
                name: "Serene Frost",
                shoeFeatures: `
          - Open design, perfect for hot weather and beaches.
          - Breathable material for continuous comfort.
          - Lightweight and easy to wear.`,
                materialQuality: `
          - Constructed with eco-friendly hemp fibers and rubber soles.
          - High-quality stitching for long-term use.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with a shoe cleaner kit.
          - Shoebox included.`,
                price: 100,
                category: "women",
                image_url: "/pics/Serene Frost.png",
            },
            {
                name: "Ember Blossom",
                shoeFeatures: `
          - Performance design, perfect for sprinting and marathons.
          - Lightweight and aerodynamic for optimal speed.
          - Cushioned insole for shock absorption.`,
                materialQuality: `
          - Constructed with high-quality synthetic upper and rubber soles.
          - Engineered for high-speed performance and durability.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with an additional set of high-performance shoelaces.
          - Shoebox included.`,
                price: 215,
                category: "women",
                image_url: "/pics/Ember Blossom.png",
            },
            {
                name: "Diamond Dazzle",
                shoeFeatures: `
        - Heavy-duty design, perfect for hiking and trail running.
        - Reinforced toe and heel for protection.
        - High-traction outsole for grip on rough terrain.`,
                materialQuality: `
        - Constructed with durable leather upper and rubber outsoles.
        - Built to withstand challenging outdoor conditions.`,
                sizesAccessories: `
        - Available in sizes ranging from US 7 to 13, including half sizes.
        - Comes with an additional set of heavy-duty shoelaces.
        - Shoebox included.`,
                price: 200,
                category: "women",
                image_url: "/pics/Diamond Dazzle.png",
            },
            {
                name: "Velvet Seduction",
                shoeFeatures: `
        - Flexible design, perfect for dancing and rhythmic gymnastics.
        - Soft and lightweight for effortless movements.
        - Cushioned insole for comfort.`,
                materialQuality: `
        - Constructed with premium synthetic upper and flexible rubber soles.
        - Designed for performance and durability.`,
                sizesAccessories: `
        - Available in sizes ranging from US 7 to 13, including half sizes.
        - Comes with an additional set of colored shoelaces for personal customization.
        - Shoebox included.`,
                price: 120,
                category: "women",
                image_url: "/pics/Velvet Seduction.png",
            },
            {
                name: "Glimmering Enigma",
                shoeFeatures: `
        - Designed for flexibility and comfort.
        - Breathable material allows for maximum airflow.
        - Cushioned soles provide support during workouts.`,
                materialQuality: `
        - Crafted from high-grade synthetic materials.
        - Outsoles are made from durable rubber that provides grip on a variety of surfaces.`,
                sizesAccessories: `
        - Available in sizes from US 7 to 13, including half sizes.
        - Extra set of shoelaces included for customization.
        - Comes with a reusable shoebox.`,
                price: 105,
                category: "women",
                image_url: "/pics/Glimmering Enigma.png",
            },

            {
                name: "Midnight Opulence",
                shoeFeatures: `
  - Sustainable design with an eco-friendly focus.
  - Shock-absorbing midsole for comfortable walking.
  - All-terrain outsole for traction and stability.`,
                materialQuality: `
  - Made with recycled materials and natural cork footbed.
  - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
  - Available in sizes ranging from US 5.5 to 10, including half sizes.
  - Comes with a plantable seed paper insole and recycled shoelaces.`,
                price: 175,
                category: "women",
                image_url: "/pics/Midnight Opulence.png",
            },
            {
                name: "Golden Siren",
                shoeFeatures: `
  - Sustainable design with an eco-friendly focus.
  - Arch support for added comfort and stability.
  - Water-resistant upper for all-weather wear.`,
                materialQuality: `
  - Made with recycled materials and natural rubber soles.
  - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
  - Available in sizes ranging from US 6 to 11, including half sizes.
  - Comes with a reusable shoe bag made from recycled polyester.`,
                price: 195,
                category: "women",
                image_url: "/pics/Golden Siren.png",
            },
            {
                name: "Pearl Infatuation",
                shoeFeatures: `
  - Sustainable design with an eco-friendly focus.
  - Cushioned footbed for all-day comfort.
  - Slip-on style for easy wear.`,
                materialQuality: `
  - Made with recycled materials and natural jute soles.
  - Ethically produced and environmentally friendly.`,
                sizesAccessories: `
  - Available in sizes ranging from US 5.5 to 9, including half sizes.
  - Comes with a biodegradable shoebox and organic cotton shoelaces.`,
                price: 135,
                category: "women",
                image_url: "/pics/Pearl Infatuation.png",
            },
            {
                name: "Crystal Euphoria",
                shoeFeatures: `
  - Insulated design, perfect for cold weather and snow.
  - Waterproof material to keep feet dry.
  - High-grip outsole for ice and snow.`,
                materialQuality: `
  - Constructed with waterproof leather upper and synthetic soles.
  - Thermal insulation for extreme cold weather conditions.`,
                sizesAccessories: `
  - Available in sizes ranging from US 7 to 13, including half sizes.
  - Includes an extra pair of warm socks.
  - Shoebox included.`,
                price: 140,
                category: "women",
                image_url: "/pics/Crystal Euphoria.png",
            },
            {
                name: "Bronze Temptress",
                shoeFeatures: `
  - Open design, perfect for hot weather and beaches.
  - Breathable material for continuous comfort.
  - Lightweight and easy to wear.`,
                materialQuality: `
  - Constructed with eco-friendly hemp fibers and rubber soles.
  - High-quality stitching for long-term use.`,
                sizesAccessories: `
  - Available in sizes ranging from US 7 to 13, including half sizes.
  - Comes with a shoe cleaner kit.
  - Shoebox included.`,
                price: 100,
                category: "women",
                image_url: "/pics/Bronze Temptress.png",
            },
            {
                name: "Radiant Belle",
                shoeFeatures: `
  - Performance design, perfect for sprinting and marathons.
  - Lightweight and aerodynamic for optimal speed.
  - Cushioned insole for shock absorption.`,
                materialQuality: `
  - Constructed with high-quality synthetic upper and rubber soles.
  - Engineered for high-speed performance and durability.`,
                sizesAccessories: `
  - Available in sizes ranging from US 7 to 13, including half sizes.
  - Comes with an additional set of high-performance shoelaces.
  - Shoebox included.`,
                price: 215,
                category: "women",
                image_url: "/pics/Radiant Belle.png",
            },
            {
                name: "Embroidered Elegance",
                shoeFeatures: `
  - Heavy-duty design, perfect for hiking and trail running.
  - Reinforced toe and heel for protection.
  - High-traction outsole for grip on rough terrain.`,
                materialQuality: `
  - Constructed with durable leather upper and rubber outsoles.
  - Built to withstand challenging outdoor conditions.`,
                sizesAccessories: `
  - Available in sizes ranging from US 7 to 13, including half sizes.
  - Comes with an additional set of heavy-duty shoelaces.
  - Shoebox included.`,
                price: 200,
                category: "women",
                image_url: "/pics/Embroidered Elegance.png",
            },

            {
                name: "Noble Classic",
                shoeFeatures: `
          - Lightweight design, perfect for running and jogging. 
          - Breathable mesh upper for enhanced airflow. 
          - Cushioned midsole for superior comfort and shock absorption.`,
                materialQuality: `
          - Premium leather upper for a luxurious look and durability. 
          - High-quality craftsmanship for long-lasting performance.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes. 
          - Comes with an additional set of colorful shoelaces for customization. 
          - Shoebox included.`,
                price: 130,
                category: "men",
                image_url: "/pics/Noble Classic.png",
            },
            {
                name: "Vanguard Gentlemen",
                shoeFeatures: `
          - Rugged design, perfect for hiking and off-road adventures.
          - Water-resistant material to keep feet dry. 
          - Reinforced toe box for protection.`,
                materialQuality: `
          - Made with durable leather and synthetic upper for high-performance. 
          - Slip-resistant rubber outsole for reliable traction.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Includes spare laces in a contrast color.
          - Shoebox included.`,
                price: 120,
                category: "men",
                image_url: "/pics/Vanguard Gentlemen.png",
            },
            {
                name: "Dapper Elite",
                shoeFeatures: `
          - Stylish design, perfect for city life and casual walks.
          - Eco-friendly canvas upper for a trendy look.
          - Comfort insole for all-day wear.`,
                materialQuality: `
          - Constructed with organic cotton upper and natural rubber soles.
          - Ethically produced for sustainable fashion.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with additional colored shoelaces for personal customization.
          - Shoebox included.`,
                price: 95,
                category: "men",
                image_url: "/pics/Dapper Elite.png",
            },
            {
                name: "Regal Heritage",
                shoeFeatures: `
          - Flexibility-focused design, perfect for gym workouts and yoga.
          - Lightweight and breathable material for maximum comfort.
          - Soft insole to reduce foot strain.`,
                materialQuality: `
          - Made with breathable fabric upper for air circulation.
          - High elasticity outsole for diverse movements.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Includes an extra pair of comfort insoles.
          - Shoebox included.`,
                price: 105,
                category: "men",
                image_url: "/pics/Regal Heritage.png",
            },
            {
                name: "Refined Charm",
                shoeFeatures: `
          - Water-ready design, perfect for beaches and water sports.
          - Quick-drying material for continuous comfort.
          - Grippy outsole for slippery surfaces.`,
                materialQuality: `
          - Made with quick-dry neoprene upper and rubber outsole for water resistance.
          - Durable construction for longevity.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with a mesh carry bag for transportation.
          - Shoebox included.`,
                price: 115,
                category: "men",
                image_url: "/pics/Refined Charm.png",
            },
            {
                name: "Aristocrat's Choice",
                shoeFeatures: `
          - Insulated design, perfect for cold weather and snow.
          - Waterproof material to keep feet dry.
          - High-grip outsole for ice and snow.`,
                materialQuality: `
          - Constructed with waterproof leather upper and synthetic soles.
          - Thermal insulation for extreme cold weather conditions.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Includes an extra pair of warm socks.
          - Shoebox included.`,
                price: 140,
                category: "men",
                image_url: "/pics/Aristocrat's Choice.png",
            },
            {
                name: "Polished Sophistication",
                shoeFeatures: `
          - Open design, perfect for hot weather and beaches.
          - Breathable material for continuous comfort.
          - Lightweight and easy to wear.`,
                materialQuality: `
          - Constructed with eco-friendly hemp fibers and rubber soles.
          - High-quality stitching for long-term use.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with a shoe cleaner kit.
          - Shoebox included.`,
                price: 100,
                category: "men",
                image_url: "/pics/Polished Sophistication.png",
            },
            {
                name: "Modern Elegance",
                shoeFeatures: `
          - Performance design, perfect for sprinting and marathons.
          - Lightweight and aerodynamic for optimal speed.
          - Cushioned insole for shock absorption.`,
                materialQuality: `
          - Constructed with high-quality synthetic upper and rubber soles.
          - Engineered for high-speed performance and durability.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with an additional set of high-performance shoelaces.
          - Shoebox included.`,
                price: 215,
                category: "men",
                image_url: "/pics/Modern Elegance.png",
            },
            {
                name: "Exquisite Craftsmanship",
                shoeFeatures: `
          - Heavy-duty design, perfect for hiking and trail running.
          - Reinforced toe and heel for protection.
          - High-traction outsole for grip on rough terrain.`,
                materialQuality: `
          - Constructed with durable leather upper and rubber outsoles.
          - Built to withstand challenging outdoor conditions.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Comes with an additional set of heavy-duty shoelaces.
          - Shoebox included.`,
                price: 200,
                category: "men",
                image_url: "/pics/Exquisite Craftsmanship.png",
            },
            {
                name: "Timeless Prestige",
                shoeFeatures: `
          - Insulated design, perfect for cold weather and snow.
          - Waterproof material to keep feet dry.
          - High-grip outsole for ice and snow.`,
                materialQuality: `
          - Constructed with waterproof leather upper and synthetic soles.
          - Thermal insulation for extreme cold weather conditions.`,
                sizesAccessories: `
          - Available in sizes ranging from US 7 to 13, including half sizes.
          - Includes an extra pair of warm socks.
          - Shoebox included.`,
                price: 140,
                category: "men",
                image_url: "/pics/Timeless Prestige.png",
            },
        ];

        for (let product of products) {
            await client.query(
                `
        INSERT INTO products (name, shoeFeatures, materialQuality, sizesAccessories, price, category, image_url)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `,
                [
                    product.name,
                    product.shoeFeatures,
                    product.materialQuality,
                    product.sizesAccessories,
                    product.price,
                    product.category,
                    product.image_url,
                ]
            );
        }

        console.log("Finished adding products!");
    } catch (error) {
        console.error("Error creating initial products:", error);
        throw error;
    }
};
const rebuildDB = async () => {
    try {
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialProducts();
    } catch (error) {
        console.error("Error during rebuildDB", error);
        throw error;
    } finally {
        await client.end();
        console.log("Database has been rebuilt, and you're good to go!");
    }
};

rebuildDB();

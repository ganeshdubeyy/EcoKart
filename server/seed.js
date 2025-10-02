import mongoose from "mongoose";
import dotenv from "dotenv";
import CategoryModel from "./models/category.model.js";
import SubCategoryModel from "./models/subCategory.model.js";
import ProductModel from "./models/product.model.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear old data
    await ProductModel.deleteMany();
    await CategoryModel.deleteMany();
    await SubCategoryModel.deleteMany();

    // Insert categories
    const categories = await CategoryModel.insertMany([
      { name: "Fruits", image: "https://via.placeholder.com/150" },
      { name: "Dairy", image: "https://via.placeholder.com/150" },
      { name: "Bakery", image: "https://via.placeholder.com/150" },
    ]);

    // Insert subcategories
    const subCategories = await SubCategoryModel.insertMany([
      { name: "Fresh Fruits", image: "https://via.placeholder.com/150", category: [categories[0]._id] },
      { name: "Milk", image: "https://via.placeholder.com/150", category: [categories[1]._id] },
      { name: "Breads", image: "https://via.placeholder.com/150", category: [categories[2]._id] },
    ]);

    // Insert products linked to category + subCategory
    await ProductModel.insertMany([
      {
        name: "Fresh Apple",
        image: ["https://via.placeholder.com/150"],
        category: [categories[0]._id],
        subCategory: [subCategories[0]._id],
        unit: "1kg",
        stock: 100,
        price: 120,
        discount: 10,
        description: "Crisp and sweet apples.",
        more_details: { origin: "Himachal" },
      },
      {
        name: "Whole Milk",
        image: ["https://via.placeholder.com/150"],
        category: [categories[1]._id],
        subCategory: [subCategories[1]._id],
        unit: "1L",
        stock: 50,
        price: 60,
        discount: 5,
        description: "Rich and creamy full cream milk.",
        more_details: { fat: "4%" },
      },
      {
        name: "Brown Bread",
        image: ["https://via.placeholder.com/150"],
        category: [categories[2]._id],
        subCategory: [subCategories[2]._id],
        unit: "400g",
        stock: 80,
        price: 40,
        discount: 0,
        description: "Soft brown bread loaf.",
        more_details: { shelfLife: "3 days" },
      },
    ]);

    console.log("✅ Categories, Subcategories, and Products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedData();

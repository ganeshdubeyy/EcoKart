import connectDB from '../server/config/connectDB.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import models
import CategoryModel from '../server/models/category.model.js';
import SubCategoryModel from '../server/models/subCategory.model.js';
import ProductModel from '../server/models/product.model.js';

// Configure dotenv
dotenv.config();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SEED_TAG = 'seedProducts.js';
const DATA_DIR = path.join(__dirname, '..', 'data', 'seeds');

// Category and subcategory mappings
const CATEGORY_MAPPINGS = {
  'fruits.json': {
    name: 'Fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150',
    subcategories: ['Fresh Fruits', 'Certified Organic', 'Sustainable']
  },
  'vegetables.json': {
    name: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150',
    subcategories: ['Fresh', 'Organic', 'Conventional', 'Frozen Veg', 'Hydroponic', 'Leafy']
  },
  'dairy.json': {
    name: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150',
    subcategories: ['Milk', 'Ghee', 'Cheese', 'Paneer', 'Cream', 'Curd', 'Honey']
  },
  'bakery.json': {
    name: 'Bakery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150',
    subcategories: ['Bread', 'Toast', 'Pav', 'Cookies']
  },
  'masala_oils.json': {
    name: 'Masala & Oils',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=150',
    subcategories: ['Dates and Seeds', 'Dry Fruits', 'Ghee', 'Salt and Sugar', 'Oils', 'Masala']
  },
  'snacks.json': {
    name: 'Snacks',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=150',
    subcategories: ['Chips', 'Bhujia', 'Indian Pickles', 'Corn Flakes', 'Namkeen']
  },
  'tea_coffee.json': {
    name: 'Tea & Coffee',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=150',
    subcategories: ['Coffee', 'Energy Drinks', 'Fruit Juices', 'Herbal Drinks', 'Tea']
  },
  'atta_rice.json': {
    name: 'Atta & Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150',
    subcategories: ['Atta', 'Besan', 'Maida', 'Rice', 'Dal']
  }
};

class ProductSeeder {
  constructor() {
    this.stats = {
      categoriesCreated: 0,
      categoriesUsed: 0,
      subcategoriesCreated: 0,
      subcategoriesUsed: 0,
      productsInserted: 0,
      productsUpdated: 0,
      productsDeleted: 0,
      warnings: [],
      errors: []
    };
  }

  async disconnectDB() {
    try {
      await mongoose.disconnect();
      console.log('✅ Disconnected from MongoDB');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error.message);
    }
  }

  async upsertCategory(categoryData) {
    try {
      const category = await CategoryModel.findOneAndUpdate(
        { name: categoryData.name },
        {
          name: categoryData.name,
          image: categoryData.image,
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true, new: true }
      );

      if (category.wasNew) {
        this.stats.categoriesCreated++;
        console.log(`  📁 Created category: ${categoryData.name}`);
      } else {
        this.stats.categoriesUsed++;
        console.log(`  📁 Using existing category: ${categoryData.name}`);
      }

      return category;
    } catch (error) {
      console.error(`❌ Error upserting category ${categoryData.name}:`, error.message);
      this.stats.errors.push(`Failed to upsert category: ${categoryData.name} - ${error.message}`);
      throw error;
    }
  }

  async upsertSubCategory(subCategoryData, categoryId) {
    try {
      const subCategory = await SubCategoryModel.findOneAndUpdate(
        { name: subCategoryData.name, category: { $in: [categoryId] } },
        {
          name: subCategoryData.name,
          image: subCategoryData.image || 'https://via.placeholder.com/150',
          category: [categoryId],
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true, new: true }
      );

      if (subCategory.wasNew) {
        this.stats.subcategoriesCreated++;
        console.log(`    📂 Created subcategory: ${subCategoryData.name}`);
      } else {
        this.stats.subcategoriesUsed++;
        console.log(`    📂 Using existing subcategory: ${subCategoryData.name}`);
      }

      return subCategory;
    } catch (error) {
      console.error(`❌ Error upserting subcategory ${subCategoryData.name}:`, error.message);
      this.stats.errors.push(`Failed to upsert subcategory: ${subCategoryData.name} - ${error.message}`);
      throw error;
    }
  }

  async upsertProduct(productData, categoryId, subCategoryId) {
    try {
      const slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const product = await ProductModel.findOneAndUpdate(
        { name: productData.name, 'more_details.seededBy': SEED_TAG },
        {
          name: productData.name,
          image: productData.image || ['https://via.placeholder.com/400'],
          category: [categoryId],
          subCategory: [subCategoryId],
          unit: productData.unit || '1 piece',
          stock: productData.stock || 0,
          price: productData.price || 0,
          discount: productData.discount || 0,
          description: productData.description || '',
          more_details: { ...productData.more_details, seededBy: SEED_TAG, slug },
          publish: true,
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true, new: true }
      );

      if (product.wasNew) {
        this.stats.productsInserted++;
        console.log(`      🛍️  Inserted product: ${productData.name}`);
      } else {
        this.stats.productsUpdated++;
        console.log(`      🛍️  Updated product: ${productData.name}`);
      }

      return product;
    } catch (error) {
      console.error(`❌ Error upserting product ${productData.name}:`, error.message);
      this.stats.errors.push(`Failed to upsert product: ${productData.name} - ${error.message}`);
    }
  }

  async loadProductData(filename) {
    try {
      const filePath = path.join(DATA_DIR, filename);
      if (!fs.existsSync(filePath)) {
        this.stats.warnings.push(`File not found: ${filename}`);
        return [];
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      if (!Array.isArray(data)) {
        this.stats.warnings.push(`Invalid data format in ${filename}: expected array`);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error(`❌ Error loading ${filename}:`, error.message);
      this.stats.errors.push(`Failed to load ${filename}: ${error.message}`);
      return [];
    }
  }

  async seedProducts() {
    console.log('🌱 Starting product seeding...\n');

    for (const [filename, categoryData] of Object.entries(CATEGORY_MAPPINGS)) {
      console.log(`📦 Processing ${filename}...`);

      const products = await this.loadProductData(filename);
      if (products.length === 0) {
        console.log(`  ⚠️  No products found in ${filename}`);
        continue;
      }

      const category = await this.upsertCategory(categoryData);
      const subCategoryMap = new Map();

      for (const product of products) {
        const subCategoryName = product.subcategory;
        if (!subCategoryName) {
          this.stats.warnings.push(`Product ${product.name} missing subcategory`);
          continue;
        }

        if (!categoryData.subcategories.includes(subCategoryName)) {
          this.stats.warnings.push(`Subcategory ${subCategoryName} not in mapping for ${categoryData.name}`);
        }

        if (!subCategoryMap.has(subCategoryName)) {
          const subCategory = await this.upsertSubCategory(
            { name: subCategoryName, image: 'https://via.placeholder.com/150' },
            category._id
          );
          subCategoryMap.set(subCategoryName, subCategory);
        }

        const subCategory = subCategoryMap.get(subCategoryName);
        await this.upsertProduct(product, category._id, subCategory._id);
      }

      console.log(`  ✅ Completed ${filename} (${products.length} products)\n`);
    }
  }

  async deleteSeededProducts() {
    console.log('🗑️  Deleting seeded products...\n');

    try {
      const productResult = await ProductModel.deleteMany({
        'more_details.seededBy': SEED_TAG
      });

      this.stats.productsDeleted = productResult.deletedCount;
      console.log(`  🛍️  Deleted ${productResult.deletedCount} products`);
    } catch (error) {
      console.error('❌ Error deleting seeded products:', error.message);
      this.stats.errors.push(`Failed to delete products: ${error.message}`);
      throw error;
    }
  }

  async previewData() {
    console.log('👀 Previewing seed data...\n');

    let totalProducts = 0;
    let totalCategories = Object.keys(CATEGORY_MAPPINGS).length;
    let totalSubcategories = Object.values(CATEGORY_MAPPINGS).reduce((sum, cat) => sum + cat.subcategories.length, 0);

    for (const [filename, categoryData] of Object.entries(CATEGORY_MAPPINGS)) {
      const products = await this.loadProductData(filename);
      totalProducts += products.length;

      console.log(`📦 ${filename}:`);
      console.log(`  Category: ${categoryData.name}`);
      console.log(`  Subcategories: ${categoryData.subcategories.join(', ')}`);
      console.log(`  Products: ${products.length}`);

      if (products.length > 0) {
        console.log(`  Sample products:`);
        products.slice(0, 3).forEach(product => {
          console.log(`    - ${product.name} (${product.subcategory}) - ₹${product.price}`);
        });
        if (products.length > 3) {
          console.log(`    ... and ${products.length - 3} more`);
        }
      }
      console.log('');
    }

    console.log(`📊 Total products to be seeded: ${totalProducts}`);
    console.log(`📊 Total categories: ${totalCategories}`);
    console.log(`📊 Total subcategories: ${totalSubcategories}`);
    
    if (this.stats.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.stats.warnings.forEach(warning => console.log(`  - ${warning}`));
    }
  }

  printSummary() {
    console.log('\n📊 SEEDING SUMMARY');
    console.log('==================');
    console.log(`📁 Categories created: ${this.stats.categoriesCreated}`);
    console.log(`📁 Categories used: ${this.stats.categoriesUsed}`);
    console.log(`📂 Subcategories created: ${this.stats.subcategoriesCreated}`);
    console.log(`📂 Subcategories used: ${this.stats.subcategoriesUsed}`);
    console.log(`🛍️  Products inserted: ${this.stats.productsInserted}`);
    console.log(`🛍️  Products updated: ${this.stats.productsUpdated}`);
    console.log(`🗑️  Products deleted: ${this.stats.productsDeleted}`);

    if (this.stats.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      this.stats.warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    if (this.stats.errors.length > 0) {
      console.log('\n❌ ERRORS:');
      this.stats.errors.forEach(error => console.log(`  - ${error}`));
    }

    console.log('\n✅ Operation completed successfully!');
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const seeder = new ProductSeeder();

  try {
    await connectDB();

    switch (command) {
      case '--import':
        await seeder.seedProducts();
        break;

      case '--delete':
        await seeder.deleteSeededProducts();
        break;

      case '--preview':
        await seeder.previewData();
        break;

      default:
        console.log('Usage: node scripts/seedProducts.js [--import|--delete|--preview]');
        console.log('');
        console.log('Commands:');
        console.log('  --import  Import/add/update products from /data/seeds/*.json');
        console.log('  --delete  Delete all seeded products');
        console.log('  --preview Dry-run: print counts and examples without touching DB');
        process.exit(1);
    }

    seeder.printSummary();
  } catch (error) {
    console.error('❌ Operation failed:', error.message);
    process.exit(1);
  } finally {
    await seeder.disconnectDB();
  }
}

// Run the script
main();

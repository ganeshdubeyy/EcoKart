import connectDB from './config/connectDB.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Models
import CategoryModel from './models/category.model.js';
import SubCategoryModel from './models/subCategory.model.js';
import ProductModel from './models/product.model.js';

// Config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data/seeds');
const SEED_TAG = 'seedProducts.js';

// Category and subcategory mappings
const CATEGORY_MAPPINGS = {
  'fruits.json': {
    name: 'Fruits',
    image: 'https://res.cloudinary.com/dpglftwoo/image/upload/v1758366123/Fruits_wvjrea.png',
    subcategories: [
      { name: 'Fresh Fruits', image: 'https://assets.oyegifts.com/flowers-n-gifts/vendordata/product/5-kg-small-fresh-fruits-basket.jpg' },
      { name: 'Certified Organic', image: 'https://img.freepik.com/free-vector/pure-natural-organic-label-badge_1017-26210.jpg?semt=ais_incoming&w=740&q=80' },
      { name: 'Seasonal', image: 'https://cdn.vectorstock.com/i/1000v/04/37/seasonal-offer-label-or-sticker-vector-36470437.jpg' },
      { name: 'Citrus Fruits', image: 'https://media.istockphoto.com/id/475076550/photo/citrus-fruits-in-the-basket-on-the-rustic-table.jpg?s=612x612&w=0&k=20&c=-WsJcQmfhArjmITgPmU5z_fCZ42VWHsrg3sabGwbRj8=' },
      { name: 'Exotics', image: 'https://www.shutterstock.com/image-photo/world-best-exotic-fruit-platter-260nw-2490229919.jpg' }
    ]
  },
  'vegetables.json': {
    name: 'Vegetables',
    image: 'https://res.cloudinary.com/dpglftwoo/image/upload/v1758366128/Vegetables_wbmcn4.png',
    subcategories: [
      { name: 'Fresh', image: 'https://cdn.grofers.com/app/images/category/cms_images/rc-upload-1702463308432-3' },
      { name: 'Organic', image: 'https://5.imimg.com/data5/VF/CT/MY-49857352/organic-vegetables-500x500.png' },
      { name: 'Root Vegetables', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSiuYqHJd6IaE1S1Sd3LRVxsyGieXh3a6__g&s' },
      { name: 'Legumes', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdwTxWTwLHaL3mA65jIp2ILEw50KjP3tGvMA&s' },
      { name: 'Leafy Vegetables', image: 'https://www.hindustantimes.com/ht-img/img/2024/12/17/original/green_veggies_1734470419127.jpg' }
    ]
  },
  'dairy.json': {
    name: 'Dairy',
    image: 'https://res.cloudinary.com/dpglftwoo/image/upload/v1758461351/dairy_products_category_m8ydqs.png',
    subcategories: [
      { name: 'Milk', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/922_1643384380004.png' },
      { name: 'Cheese', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/da/cms-assets/cms/product/37bf3dc2-c66a-4c44-b0d5-88398d3f2879.jpg' },
      { name: 'Paneer', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/923_1643384369257.png' },
      { name: 'Cream', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/1092_1643384330629.png' },
      { name: 'Curd', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/123_1643384414434.png' },
      { name: 'Honey', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/609_1695366756108.png' }
    ]
  },
  'bakery.json': {
    name: 'Bakery',
    image: 'https://res.cloudinary.com/dpglftwoo/image/upload/v1758359140/Bakery_Biscuits_swhgyi.png',
    subcategories: [
      { name: 'Bread', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/d530857b-40c0-4b59-9edf-c9ff49a7e597.png' },
      { name: 'Cakes and Rolls', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/4a21bcbc-7334-4845-9350-d3eaf6e75fc7.png' },
      { name: 'Cookies', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/6afa705b-a2a6-499d-afb6-3790ce3f6f0b.png' },
      { name: 'Toast', image: 'https://m.media-amazon.com/images/I/51-+HH9Z+NS._UF894,1000_QL80_.jpg' },
      { name: 'Glucose and Marie', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/6e984e48-07b9-4a5b-8915-21b70ae5f7e5.png' }  
    ]
  },
  'masala_oils.json': {
    name: 'Masala, Oils & more',
    image: 'https://res.cloudinary.com/dpglftwoo/image/upload/v1758359142/Masala_Oil_More_wuhg4x.png',
    subcategories: [
      { name: 'Dry Fruits', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/8bc1c83a-fcaf-4d2f-ac7a-dc2d375326d6.png' },
      { name: 'Salt and Sugar', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/933_1643446066738.png' },
      { name: 'Oils', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/917_1643446040818.png' },
      { name: 'Masala', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/50_1643446001120.png' }
    ]
  },
  'snacks.json': {
    name: 'Snacks',
    image: 'https://res.cloudinary.com/dpglftwoo/image/upload/v1758359142/Snacks_Munchies_secwzz.png',
    subcategories: [
      { name: 'Chips', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/f55e87f5-ecab-4d91-aca9-62883084374d.png' },
      { name: 'Bhujia', image: 'http://res.cloudinary.com/dljwfy0pe/image/upload/v1726474983/binkeyit/f1iorezj5lo7gtauqwsq.jpg' },
      { name: 'Popcorn', image: 'http://res.cloudinary.com/dljwfy0pe/image/upload/v1726133445/binkeyit/p34pr5pshbajxgq4tacg.webp' },
      { name: 'Namkeen', image: 'http://res.cloudinary.com/dljwfy0pe/image/upload/v1726133417/binkeyit/k44svdd3jx9qz8ud4mco.webp' }
    ]
  },
  'tea_coffee.json': {
    name: 'Tea & Coffee',
    image: 'https://res.cloudinary.com/dpglftwoo/image/upload/v1758359142/Tea_Coffe_Health_Drink_yhbcuk.png',
    subcategories: [
      { name: 'Coffee', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/1322_1643445664338.png' },
      { name: 'Energy Drinks', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/91_1684226377332.png' },
      { name: 'Soft Drinks', image: 'https://i2.wp.com/www.spiritofindiapattaya.com/wp-content/uploads/2018/09/softdrinks.jpg?fit=1280%2C853&ssl=1' },
      { name: 'Tea', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/957_1643445598079.png' }
    ]
  },
  'atta_rice.json': {
    name: 'Atta & Rice',
    image: 'https://res.cloudinary.com/dpglftwoo/image/upload/v1758359140/Atta_Rice_Dal_skn41s.png',
    subcategories: [
      { name: 'Atta', image: 'https://m.media-amazon.com/images/I/51vCf15JkyL.jpg' },
      { name: 'Besan', image: 'https://m.media-amazon.com/images/I/61XTBnVY8ML.jpg' },
      { name: 'Maida', image: 'https://m.media-amazon.com/images/I/61JK6s+IIaL._UF894,1000_QL80_.jpg' },
      { name: 'Rice', image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQw8sNU1fNbcAEclttTSjMm6QWlqzbkvVPeeKrkvGuMDwI-31Hf8kSXindtlMaOjGRlkzVU4ToRhAHtgVwpmSZWQ8rHm8zCc0sVcG-s-5c' },
      { name: 'Dal', image: 'https://m.media-amazon.com/images/I/61HWmesEe-L._SX679_.jpg' }
    ]
  },
  'breakfast_instant_food.json': {
    name: 'Breakfast & Instant Food',
    image: 'https://res.cloudinary.com/dpglftwoo/image/upload/v1758364386/Breakfast_Instant_Food_erwtpo.png',
    subcategories: [
      { name: 'Instant Noodles', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/962_1643384795557.png' },
      { name: 'Frozen Veg Snacks', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/8eed6c57-c17f-4753-9483-06d27f5a76f0.png' },
      { name: 'Oats and Corn Flakes', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/c2ecb6ac-1b8d-4dae-9eae-31c8c2cc7afc.png' },
      { name: 'Pasta & more', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/968_1669884568341.png' }
    ]
  },
  'sweet_tooth.json': {
    name: 'Sweet Tooth',
    image: 'https://res.cloudinary.com/dpglftwoo/image/upload/v1758364410/Sweet_Tooth_xgadxf.png',
    subcategories: [
      { name: 'Chocolates', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/e930270b-df49-4547-98fb-7a1e7d9eb35a.png' },
      { name: 'Indian Sweets', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/82fd024d-1d0a-4fb7-b384-c319e2a8646f.png' },
      { name: 'Ice Cream & Desserts', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/30a88e6b-5b3f-43b6-9ea8-08706a6e981e.png' },
      { name: 'Energy Bars', image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/ba8e2e24-bdb0-453c-bd5e-2c3d1433e893.png' }
    ]
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
      // FIXED: Use $in operator for category array
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

        let subCategoryConfig;
        if (Array.isArray(categoryData.subcategories)) {
          subCategoryConfig = categoryData.subcategories.find(
            sc => (sc.name || sc) === subCategoryName
          );
        }

        if (!subCategoryConfig) {
          this.stats.warnings.push(`Subcategory ${subCategoryName} not in mapping for ${categoryData.name}`);
        }

        if (!subCategoryMap.has(subCategoryName)) {
          const subCategory = await this.upsertSubCategory(
            {
              name: subCategoryName,
              image: subCategoryConfig?.image || 'https://via.placeholder.com/150'
            },
            category._id
          );
          
          // CRITICAL FIX: Check if subCategory is null before adding to map
          if (subCategory) {
            subCategoryMap.set(subCategoryName, subCategory);
          } else {
            this.stats.errors.push(`Failed to create subcategory: ${subCategoryName}`);
            continue;
          }
        }

        const subCategory = subCategoryMap.get(subCategoryName);
        // CRITICAL FIX: Check if subCategory exists before using it
        if (subCategory && subCategory._id) {
          await this.upsertProduct(product, category._id, subCategory._id);
        } else {
          this.stats.errors.push(`Subcategory not found for product: ${product.name}`);
        }
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
    let totalSubcategories = Object.values(CATEGORY_MAPPINGS).reduce(
      (sum, cat) => sum + (Array.isArray(cat.subcategories) ? cat.subcategories.length : 0),
      0
    );

    for (const [filename, categoryData] of Object.entries(CATEGORY_MAPPINGS)) {
      const products = await this.loadProductData(filename);
      totalProducts += products.length;

      console.log(`📦 ${filename}:`);
      console.log(`  Category: ${categoryData.name}`);
      console.log(
        `  Subcategories: ${
          Array.isArray(categoryData.subcategories)
            ? categoryData.subcategories.map(sc => (sc.name ? sc.name : sc)).join(', ')
            : ''
        }`
      );
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
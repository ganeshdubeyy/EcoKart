# Product Seeding System

This directory contains product seed data for the EcoKart e-commerce platform. The seeding system allows you to easily populate the database with products, categories, and subcategories.

## Overview

The seeding system includes:
- **8 product categories** with multiple subcategories each
- **100+ products** distributed across all categories
- **Automated seeding script** with CLI commands
- **Upsert functionality** to prevent duplicates
- **Preview mode** for dry-run testing

## Categories and Subcategories

### 1. Fruits
- **Subcategories**: Fresh Fruits, Certified Organic, Sustainable
- **Products**: 10 items including apples, bananas, mangoes, grapes, oranges, etc.

### 2. Vegetables
- **Subcategories**: Fresh, Organic, Conventional, Frozen Veg, Hydroponic, Leafy
- **Products**: 14 items including tomatoes, onions, carrots, spinach, broccoli, etc.

### 3. Dairy
- **Subcategories**: Milk, Ghee, Cheese, Paneer, Cream, Curd, Honey
- **Products**: 15 items including various milk types, paneer, cheese, ghee, etc.

### 4. Bakery
- **Subcategories**: Bread, Toast, Pav, Cookies
- **Products**: 11 items including different bread types, pav, cookies, etc.

### 5. Masala & Oils
- **Subcategories**: Dates and Seeds, Dry Fruits, Ghee, Salt and Sugar, Oils, Masala
- **Products**: 21 items including oils, spices, dry fruits, seeds, etc.

### 6. Snacks
- **Subcategories**: Chips, Bhujia, Indian Pickles, Corn Flakes, Namkeen
- **Products**: 15 items including various chips, bhujia, pickles, etc.

### 7. Tea & Coffee
- **Subcategories**: Coffee, Energy Drinks, Fruit Juices, Herbal Drinks, Tea
- **Products**: 18 items including coffee, tea, juices, energy drinks, etc.

### 8. Atta & Rice
- **Subcategories**: Atta, Besan, Maida, Rice, Dal
- **Products**: 18 items including various flours, rice types, dals, etc.

## Usage

### Prerequisites
- Node.js installed
- MongoDB database running
- Environment variables configured

### Available Commands

#### From Root Directory
```bash
# Preview all seed data (dry run)
npm run seed:preview

# Import all products to database
npm run seed:import

# Delete all seeded products
npm run seed:delete
```

#### From Server Directory
```bash
# Preview all seed data (dry run)
npm run seed:preview

# Import all products to database
npm run seed:import

# Delete all seeded products
npm run seed:delete
```

#### Direct Script Execution
```bash
# Preview mode
node scripts/seedProducts.js --preview

# Import products
node scripts/seedProducts.js --import

# Delete seeded products
node scripts/seedProducts.js --delete
```

## Adding New Products

### 1. Edit JSON Files
Modify the appropriate JSON file in this directory:
- `fruits.json` - Add fruit products
- `vegetables.json` - Add vegetable products
- `dairy.json` - Add dairy products
- `bakery.json` - Add bakery products
- `masala_oils.json` - Add masala and oil products
- `snacks.json` - Add snack products
- `tea_coffee.json` - Add tea and coffee products
- `atta_rice.json` - Add atta and rice products

### 2. Product Structure
Each product should follow this structure:
```json
{
  "name": "Product Name",
  "image": ["https://example.com/image.jpg"],
  "subcategory": "Subcategory Name",
  "unit": "1kg",
  "stock": 50,
  "price": 100,
  "discount": 10,
  "description": "Product description",
  "more_details": {
    "brand": "Brand Name",
    "origin": "Origin",
    "organic": true,
    "sustainable": false
  }
}
```

### 3. Update Subcategories
If adding new subcategories, update the `CATEGORY_MAPPINGS` in `scripts/seedProducts.js`:
```javascript
'fruits.json': {
  name: 'Fruits',
  image: 'https://example.com/category-image.jpg',
  subcategories: ['Fresh Fruits', 'Certified Organic', 'Sustainable', 'New Subcategory']
}
```

### 4. Run Import
After making changes, run:
```bash
npm run seed:import
```

## Removing Products

### Delete All Seeded Products
```bash
npm run seed:delete
```

### Remove Specific Products
1. Edit the appropriate JSON file
2. Remove the product objects
3. Run `npm run seed:import` (this will update the database)

## Features

### Upsert Functionality
- Products are upserted based on name and seed tag
- No duplicate products will be created
- Existing products will be updated with new data

### Seed Tagging
- All seeded products are tagged with `seededBy: 'seedProducts.js'`
- Only tagged products are affected by delete operations
- Manual products remain untouched

### Error Handling
- Comprehensive error logging
- Warning system for missing fields
- Graceful handling of file errors

### Preview Mode
- Dry-run functionality shows what will be imported
- Displays counts and sample products
- No database modifications

## File Structure

```
data/seeds/
├── README.md              # This documentation
├── fruits.json            # Fruit products
├── vegetables.json        # Vegetable products
├── dairy.json            # Dairy products
├── bakery.json           # Bakery products
├── masala_oils.json      # Masala and oil products
├── snacks.json           # Snack products
├── tea_coffee.json       # Tea and coffee products
└── atta_rice.json        # Atta and rice products
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MongoDB is running
   - Check environment variables
   - Verify database URL

2. **File Not Found Error**
   - Ensure JSON files exist in `data/seeds/` directory
   - Check file permissions

3. **Invalid JSON Format**
   - Validate JSON syntax
   - Check for missing commas or brackets

4. **Missing Required Fields**
   - Ensure all products have required fields: name, subcategory, price
   - Check subcategory names match category mappings

### Getting Help

- Check the console output for detailed error messages
- Use `--preview` mode to test before importing
- Verify JSON file structure matches the expected format

## Best Practices

1. **Always preview before importing** to catch errors early
2. **Use descriptive product names** that are unique
3. **Include high-quality images** for better user experience
4. **Set realistic stock and pricing** values
5. **Use consistent subcategory names** across products
6. **Test with small batches** when adding many products
7. **Keep backups** of your JSON files
8. **Document custom fields** in the more_details object




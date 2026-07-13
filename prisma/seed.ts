import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  // Fruits
  { name: "Organic Apples", slug: "organic-apples", description: "Crisp and juicy organic apples picked from local orchards. Perfect for snacking or baking.", price: 3.99, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=600&fit=crop", category: "fruits", stock: 150, featured: true },
  { name: "Fresh Strawberries", slug: "fresh-strawberries", description: "Sweet, sun-ripened strawberries bursting with flavor. Hand-selected for quality.", price: 5.99, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=600&fit=crop", category: "fruits", stock: 80, featured: true },
  { name: "Ripe Bananas", slug: "ripe-bananas", description: "Perfectly ripe bananas from tropical farms. Great source of potassium.", price: 1.99, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=600&fit=crop", category: "fruits", stock: 200, featured: false },
  { name: "Juicy Oranges", slug: "juicy-oranges", description: "Navel oranges packed with vitamin C. Sweet, seedless, and ready to eat.", price: 4.49, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=600&fit=crop", category: "fruits", stock: 120, featured: false },
  { name: "Fresh Avocados", slug: "fresh-avocados", description: "Creamy Hass avocados, perfect for guacamole, toast, or salads.", price: 2.49, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=600&fit=crop", category: "fruits", stock: 90, featured: true },

  // Vegetables
  { name: "Baby Spinach", slug: "baby-spinach", description: "Tender baby spinach leaves, pre-washed and ready to eat. Iron-rich superfood.", price: 3.49, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=600&fit=crop", category: "vegetables", stock: 100, featured: true },
  { name: "Cherry Tomatoes", slug: "cherry-tomatoes", description: "Vine-ripened cherry tomatoes. Sweet and perfect for salads or snacking.", price: 4.29, image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=600&h=600&fit=crop", category: "vegetables", stock: 130, featured: false },
  { name: "Fresh Broccoli", slug: "fresh-broccoli", description: "Crisp, green broccoli crowns. Packed with vitamins and perfect for steaming.", price: 2.99, image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop", category: "vegetables", stock: 75, featured: false },
  { name: "Sweet Corn", slug: "sweet-corn", description: "Freshly picked sweet corn on the cob. Grill, boil, or microwave for a tasty side.", price: 1.49, image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&h=600&fit=crop", category: "vegetables", stock: 160, featured: false },

  // Beverages
  { name: "Cold Press Orange Juice", slug: "cold-press-orange-juice", description: "100% pure cold-pressed orange juice. No added sugar, no preservatives.", price: 6.99, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&h=600&fit=crop", category: "beverages", stock: 60, featured: true },
  { name: "Matcha Green Tea", slug: "matcha-green-tea", description: "Premium ceremonial grade matcha. Rich in antioxidants with a smooth, earthy flavor.", price: 12.99, image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600&h=600&fit=crop", category: "beverages", stock: 45, featured: true },
  { name: "Sparkling Water", slug: "sparkling-water", description: "Crisp, refreshing sparkling water. Zero calories, zero sugar, pure hydration.", price: 1.99, image: "https://images.unsplash.com/photo-1523362628745-0c100fc988a6?w=600&h=600&fit=crop", category: "beverages", stock: 200, featured: false },
  { name: "Almond Milk", slug: "almond-milk", description: "Creamy unsweetened almond milk. Perfect for smoothies, cereal, or coffee.", price: 3.99, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&fit=crop", category: "beverages", stock: 85, featured: false },
  { name: "Iced Coffee Blend", slug: "iced-coffee-blend", description: "Ready-to-drink cold brew coffee. Smooth, bold, and perfectly caffeinated.", price: 4.99, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=600&fit=crop", category: "beverages", stock: 70, featured: false },

  // Snacks
  { name: "Mixed Nuts", slug: "mixed-nuts", description: "Premium blend of almonds, cashews, and walnuts. Lightly salted for perfect snacking.", price: 8.99, image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=600&h=600&fit=crop", category: "snacks", stock: 110, featured: true },
  { name: "Dark Chocolate Bar", slug: "dark-chocolate-bar", description: "72% cacao dark chocolate. Rich, intense flavor with antioxidant benefits.", price: 4.49, image: "https://images.unsplash.com/photo-1549007994-cb924ebd0a74?w=600&h=600&fit=crop", category: "snacks", stock: 95, featured: false },
  { name: "Granola Bars", slug: "granola-bars", description: "Crunchy oat granola bars with honey and dried fruits. Perfect on-the-go energy.", price: 6.49, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop", category: "snacks", stock: 140, featured: false },
  { name: "Trail Mix", slug: "trail-mix", description: "Adventure-ready trail mix with nuts, seeds, and dried berries.", price: 7.99, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&h=600&fit=crop", category: "snacks", stock: 80, featured: false },

  // Dairy
  { name: "Greek Yogurt", slug: "greek-yogurt", description: "Thick, creamy Greek yogurt with live probiotics. High protein, low sugar.", price: 5.49, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop", category: "dairy", stock: 90, featured: true },
  { name: "Aged Cheddar", slug: "aged-cheddar", description: "Sharp, aged cheddar cheese. Perfect for sandwiches, cheese boards, or cooking.", price: 7.99, image: "https://images.unsplash.com/photo-1618176204552-53f98cdc5c4d?w=600&h=600&fit=crop", category: "dairy", stock: 55, featured: false },
  { name: "Free Range Eggs", slug: "free-range-eggs", description: "Farm-fresh free range eggs. Rich yolks from happy, pasture-raised hens.", price: 4.99, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=600&fit=crop", category: "dairy", stock: 120, featured: false },

  // Bakery
  { name: "Sourdough Bread", slug: "sourdough-bread", description: "Artisan sourdough bread with a crispy crust and tangy, chewy interior.", price: 5.99, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop", category: "bakery", stock: 40, featured: true },
  { name: "Croissants", slug: "croissants", description: "Buttery, flaky French croissants. Baked fresh every morning.", price: 3.99, image: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=600&h=600&fit=crop", category: "bakery", stock: 60, featured: false },
  { name: "Blueberry Muffins", slug: "blueberry-muffins", description: "Moist, fluffy muffins loaded with fresh blueberries. A breakfast favorite.", price: 4.49, image: "https://images.unsplash.com/photo-1607958996333-41a6db8386b1?w=600&h=600&fit=crop", category: "bakery", stock: 50, featured: false },
];

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@ecomvora.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@ecomvora.com",
      password: adminPassword,
      role: "admin",
    },
  });
  console.log(`Created admin: ${admin.email}`);

  // Create demo customer
  const customerPassword = await hash("password123", 12);
  const customer = await prisma.user.upsert({
    where: { email: "user@ecomvora.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "user@ecomvora.com",
      password: customerPassword,
      role: "customer",
    },
  });
  console.log(`Created customer: ${customer.email}`);

  // Create products
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { image: product.image },
      create: product,
    });
  }
  console.log(`Created ${products.length} products`);

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

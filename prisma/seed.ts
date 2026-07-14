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

const blogPosts = [
  {
    title: "10 Simple Ways to Eat Healthier Every Day",
    slug: "10-simple-ways-to-eat-healthier",
    excerpt: "Discover easy, practical tips to improve your diet without overwhelming changes. Small steps lead to big results.",
    content: "<p>Eating healthier doesn't have to mean a complete lifestyle overhaul. Here are 10 simple swaps you can make today:</p><h3>1. Add More Vegetables</h3><p>Fill half your plate with vegetables at every meal. They're packed with nutrients and fiber.</p><h3>2. Choose Whole Grains</h3><p>Switch from white bread and rice to whole grain alternatives for more fiber and sustained energy.</p><h3>3. Drink More Water</h3><p>Replace sugary drinks with water. Add lemon or cucumber for flavor.</p><h3>4. Snack Smart</h3><p>Keep healthy snacks like nuts, fruits, and yogurt handy instead of reaching for processed options.</p><h3>5. Cook at Home</h3><p>Preparing meals at home gives you control over ingredients and portions.</p>",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=500&fit=crop",
    category: "Nutrition",
    author: "Sarah Johnson",
    readTime: "5 min read",
    published: true,
  },
  {
    title: "Seasonal Produce Guide: What to Buy This Summer",
    slug: "seasonal-produce-guide-summer",
    excerpt: "Make the most of summer's bounty with our guide to the freshest, most flavorful seasonal fruits and vegetables.",
    content: "<p>Summer brings an incredible abundance of fresh produce. Here's what to look for at your local market:</p><h3>Berries</h3><p>Strawberries, blueberries, and raspberries are at their peak. Load up on these antioxidant-rich fruits.</p><h3>Stone Fruits</h3><p>Peaches, nectarines, and plums are sweet and juicy right now. Perfect for grilling or eating fresh.</p><h3>Tomatoes</h3><p>Vine-ripened tomatoes have the best flavor in summer. Use them in salads, sandwiches, or pasta.</p><h3>Corn</h3><p>Fresh sweet corn is a summer staple. Grill it, boil it, or use it in salsas.</p>",
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=800&h=500&fit=crop",
    category: "Seasonal",
    author: "Mike Chen",
    readTime: "4 min read",
    published: true,
  },
  {
    title: "The Ultimate Guide to Meal Prepping",
    slug: "ultimate-meal-prep-guide",
    excerpt: "Save time, money, and stress with our comprehensive meal prepping guide. Learn strategies that actually work.",
    content: "<p>Meal prepping is one of the best ways to stay on track with healthy eating. Here's how to get started:</p><h3>Start Small</h3><p>Begin by prepping just lunches for the work week. Once that feels easy, expand to breakfasts and dinners.</p><h3>Choose Versatile Ingredients</h3><p>Pick proteins, grains, and vegetables that can be mixed and matched throughout the week.</p><h3>Invest in Good Containers</h3><p>Bquality glass containers keep food fresh longer and are microwave-safe.</p><h3>Batch Cook</h3><p>Cook large quantities of proteins and grains on Sunday. Portion them out for the week.</p>",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=500&fit=crop",
    category: "Lifestyle",
    author: "Sarah Johnson",
    readTime: "7 min read",
    published: true,
  },
  {
    title: "5 Kitchen Hacks That Will Change Your Life",
    slug: "kitchen-hacks-that-will-change-your-life",
    excerpt: "These clever kitchen tricks will save you time, reduce waste, and make cooking more enjoyable.",
    content: "<p>Every home cook needs a few tricks up their sleeve. Here are our favorites:</p><h3>1. Freeze Fresh Herbs in Olive Oil</h3><p>Chop fresh herbs, place them in ice cube trays, cover with olive oil, and freeze. Perfect for cooking.</p><h3>2. Use a Muffin Tin for Condiments</h3><p>When hosting, use a muffin tin to serve multiple condiments or toppings neatly.</p><h3>3. Store Greens with Paper Towels</h3><p>Place a paper towel in your salad container to absorb moisture and keep greens fresh longer.</p><h3>4. Revive Wilting Herbs</h3><p>Soak wilted herbs in ice water for 15 minutes to bring them back to life.</p>",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop",
    category: "Tips",
    author: "Emily Davis",
    readTime: "3 min read",
    published: true,
  },
  {
    title: "Understanding Organic vs Conventional Produce",
    slug: "organic-vs-conventional-produce",
    excerpt: "Is organic really better? We break down the differences, benefits, and help you make informed choices.",
    content: "<p>The organic vs conventional debate can be confusing. Here's what you need to know:</p><h3>What Makes Produce Organic?</h3><p>Organic farming avoids synthetic pesticides and fertilizers, using natural methods instead.</p><h3>Nutritional Differences</h3><p>Studies show minimal nutritional differences between organic and conventional produce.</p><h3>Pesticide Residue</h3><p>Organic produce typically has lower pesticide residue, though conventional levels are within safety limits.</p><h3>Environmental Impact</h3><p>Organic farming generally has a lower environmental impact, promoting biodiversity and soil health.</p>",
    image: "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=800&h=500&fit=crop",
    category: "Education",
    author: "Dr. Lisa Wang",
    readTime: "6 min read",
    published: true,
  },
  {
    title: "Quick and Delicious Smoothie Recipes",
    slug: "quick-delicious-smoothie-recipes",
    excerpt: "Five nutritious smoothie recipes ready in under 5 minutes. Perfect for busy mornings or post-workout refueling.",
    content: "<p>Smoothies are the perfect quick meal or snack. Here are five of our favorites:</p><h3>1. Green Power Smoothie</h3><p>Spinach, banana, mango, almond milk, and a tablespoon of chia seeds. Packed with nutrients.</p><h3>2. Berry Blast</h3><p>Mixed berries, Greek yogurt, honey, and a splash of orange juice. High in protein and antioxidants.</p><h3>3. Tropical Sunrise</h3><p>Mango, pineapple, coconut milk, and a squeeze of lime. Like vacation in a glass.</p><h3>4. Chocolate Peanut Butter</h3><p>Banana, peanut butter, cocoa powder, and oat milk. A healthy treat that tastes indulgent.</p><h3>5. Apple Cinnamon</h3><p>Apple, oats, cinnamon, yogurt, and maple syrup. Like apple pie in smoothie form.</p>",
    image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=800&h=500&fit=crop",
    category: "Recipes",
    author: "Emily Davis",
    readTime: "4 min read",
    published: true,
  },
  {
    title: "How to Build a Balanced Grocery List",
    slug: "build-balanced-grocery-list",
    excerpt: "Stop wandering the aisles aimlessly. Learn how to create a grocery list that covers all your nutritional needs.",
    content: "<p>A well-planned grocery list saves time, money, and helps you eat better. Here's our framework:</p><h3>Proteins</h3><p>Include 2-3 protein sources: chicken, fish, beans, tofu, or eggs.</p><h3>Vegetables</h3><p>Aim for variety: leafy greens, root vegetables, and colorful options.</p><h3>Fruits</h3><p>Choose a mix of fresh seasonal fruits and frozen options for smoothies.</p><h3>Whole Grains</h3><p>Brown rice, quinoa, oats, and whole wheat bread should be staples.</p><h3>Healthy Fats</h3><p>Avocados, nuts, seeds, and olive oil are essential for brain health.</p>",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=500&fit=crop",
    category: "Tips",
    author: "Mike Chen",
    readTime: "5 min read",
    published: false,
  },
  {
    title: "The Benefits of Cooking with Kids",
    slug: "benefits-of-cooking-with-kids",
    excerpt: "Cooking together isn't just fun — it teaches kids valuable life skills, math, science, and healthy habits.",
    content: "<p>Getting kids involved in the kitchen has remarkable benefits beyond just making dinner:</p><h3>Builds Life Skills</h3><p>Measuring, mixing, and following recipes teach practical skills they'll use forever.</p><h3>Encourages Healthy Eating</h3><p>Kids are more likely to try foods they helped prepare.</p><h3>Math and Science</h3><p>Cooking involves fractions, measurements, and chemical reactions — it's learning disguised as fun.</p><h3>Boosts Confidence</h3><p>Creating something from scratch gives kids a sense of accomplishment.</p>",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&h=500&fit=crop",
    category: "Lifestyle",
    author: "Sarah Johnson",
    readTime: "4 min read",
    published: false,
  },
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

  // Create blog posts
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: { image: post.image, published: post.published },
      create: post,
    });
  }
  console.log(`Created ${blogPosts.length} blog posts`);

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

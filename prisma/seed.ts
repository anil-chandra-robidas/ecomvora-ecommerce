import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const products = [
  // Tops
  { name: "Classic White T-Shirt", slug: "classic-white-tshirt", description: "Premium cotton crew neck t-shirt. A timeless essential for every wardrobe.", price: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop", category: "tops", stock: 150, featured: true },
  { name: "Oversized Graphic Tee", slug: "oversized-graphic-tee", description: "Relaxed fit tee with bold graphic print. 100% organic cotton.", price: 34.99, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop", category: "tops", stock: 80, featured: true },
  { name: "Linen Summer Shirt", slug: "linen-summer-shirt", description: "Breathable linen button-down shirt. Perfect for warm weather.", price: 59.99, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop", category: "tops", stock: 65, featured: false },
  { name: "Striped Polo Shirt", slug: "striped-polo-shirt", description: "Classic striped polo with ribbed collar. Smart casual essential.", price: 44.99, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&h=600&fit=crop", category: "tops", stock: 90, featured: false },

  // Bottoms
  { name: "Slim Fit Denim Jeans", slug: "slim-fit-denim-jeans", description: "Dark wash slim fit jeans with stretch comfort. Modern classic.", price: 79.99, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop", category: "bottoms", stock: 120, featured: true },
  { name: "Cargo Jogger Pants", slug: "cargo-jogger-pants", description: "Relaxed cargo joggers with multiple pockets. Streetwear essential.", price: 54.99, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&h=600&fit=crop", category: "bottoms", stock: 100, featured: true },
  { name: "Chino Shorts", slug: "chino-shorts", description: "Tailored chino shorts in khaki. Summer wardrobe staple.", price: 39.99, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=600&fit=crop", category: "bottoms", stock: 75, featured: false },
  { name: "Pleated Wide Leg Trousers", slug: "pleated-wide-leg-trousers", description: "Elegant wide leg trousers with front pleats. Effortlessly chic.", price: 89.99, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop", category: "bottoms", stock: 55, featured: false },

  // Dresses
  { name: "Floral Midi Dress", slug: "floral-midi-dress", description: "Romantic floral print midi dress with flowing silhouette.", price: 89.99, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=600&fit=crop", category: "dresses", stock: 60, featured: true },
  { name: "Little Black Dress", slug: "little-black-dress", description: "Timeless black dress. Versatile day-to-night essential.", price: 99.99, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop", category: "dresses", stock: 45, featured: true },
  { name: "Wrap Maxi Dress", slug: "wrap-maxi-dress", description: "Flowing wrap dress in solid colors. Flattering on every body type.", price: 74.99, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop", category: "dresses", stock: 50, featured: false },

  // Outerwear
  { name: "Classic Leather Jacket", slug: "classic-leather-jacket", description: "Genuine leather biker jacket. Iconic style that gets better with age.", price: 199.99, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop", category: "outerwear", stock: 30, featured: true },
  { name: "Oversized Blazer", slug: "oversized-blazer", description: "Relaxed fit blazer in charcoal. Power dressing meets comfort.", price: 129.99, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop", category: "outerwear", stock: 40, featured: false },
  { name: "Denim Trucker Jacket", slug: "denim-trucker-jacket", description: "Classic denim jacket in medium wash. A layering essential.", price: 89.99, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&h=600&fit=crop", category: "outerwear", stock: 55, featured: false },

  // Accessories
  { name: "Minimal Leather Watch", slug: "minimal-leather-watch", description: "Swiss movement with genuine leather strap. Understated elegance.", price: 149.99, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=600&fit=crop", category: "accessories", stock: 70, featured: true },
  { name: "Classic Aviator Sunglasses", slug: "classic-aviator-sunglasses", description: "Polarized lenses with gold frame. Timeless cool.", price: 69.99, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop", category: "accessories", stock: 85, featured: false },
  { name: "Canvas Tote Bag", slug: "canvas-tote-bag", description: "Heavy-duty canvas tote with leather handles. Everyday carry.", price: 39.99, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=600&fit=crop", category: "accessories", stock: 100, featured: false },
  { name: "Wool Beanie", slug: "wool-beanie", description: "Soft merino wool beanie. Keep warm in style.", price: 24.99, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=600&fit=crop", category: "accessories", stock: 110, featured: false },

  // Footwear
  { name: "White Leather Sneakers", slug: "white-leather-sneakers", description: "Clean white leather sneakers. The foundation of any outfit.", price: 119.99, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop", category: "footwear", stock: 95, featured: true },
  { name: "Suede Chelsea Boots", slug: "suede-chelsea-boots", description: "Premium suede Chelsea boots. Effortlessly refined.", price: 159.99, image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=600&fit=crop", category: "footwear", stock: 45, featured: false },
  { name: "Strappy Heel Sandals", slug: "strappy-heel-sandals", description: "Elegant strappy heels in nude. Perfect for special occasions.", price: 89.99, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop", category: "footwear", stock: 60, featured: false },
];

const blogPosts = [
  {
    title: "10 Wardrobe Essentials Everyone Needs",
    slug: "10-wardrobe-essentials",
    excerpt: "Build a timeless wardrobe with these must-have pieces that never go out of style.",
    content: "<p>A well-curated wardrobe starts with the right essentials. Here are 10 pieces every closet needs:</p><h3>1. White T-Shirt</h3><p>The most versatile piece in fashion. Dress it up or down.</p><h3>2. Dark Denim Jeans</h3><p>A great pair of dark jeans works for almost any occasion.</p><h3>3. Classic Blazer</h3><p>Instantly elevates any outfit from casual to polished.</p><h3>4. Little Black Dress</h3><p>The ultimate go-to for events and evenings out.</p><h3>5. Leather Jacket</h3><p>Adds edge to any look and lasts a lifetime.</p>",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=500&fit=crop",
    category: "Style",
    author: "Sarah Johnson",
    readTime: "5 min read",
    published: true,
  },
  {
    title: "Summer Trending: The Best Colors to Wear",
    slug: "summer-trending-colors",
    excerpt: "From earthy tones to vibrant hues, discover the color palette defining this season.",
    content: "<p>Color can transform your entire look. This summer, these shades are leading the way:</p><h3>Earth Tones</h3><p>Terracotta, olive, and sand create a grounded, natural aesthetic.</p><h3>Pastels</h3><p>Soft lavender, mint, and blush bring a fresh, romantic vibe.</p><h3>Bold Accents</h3><p>Pop of coral, cobalt, or emerald makes any outfit memorable.</p>",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop",
    category: "Trends",
    author: "Mike Chen",
    readTime: "4 min read",
    published: true,
  },
  {
    title: "How to Style Denim for Every Occasion",
    slug: "style-denim-guide",
    excerpt: "Denim is the most versatile fabric in fashion. Here's how to wear it right.",
    content: "<p>From casual Fridays to weekend brunch, denim fits everywhere:</p><h3>Casual Day Out</h3><p>Pair jeans with a graphic tee and white sneakers for effortless cool.</p><h3>Date Night</h3><p>Dark denim with a silk blouse and heels creates instant glamour.</p><h3>Work Ready</h3><p>Chinos or tailored denim with a blazer strikes the perfect balance.</p>",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=500&fit=crop",
    category: "Style",
    author: "Emily Davis",
    readTime: "6 min read",
    published: true,
  },
  {
    title: "Accessorizing 101: Less is More",
    slug: "accessorizing-101",
    excerpt: "The art of accessories is knowing when to stop. Learn the golden rules.",
    content: "<p>Accessories can make or break an outfit. Follow these rules:</p><h3>The Rule of Three</h3><p>Limit yourself to three statement pieces per outfit.</p><h3>Mix Metals Wisely</h3><p>Gold and silver can coexist, but keep it intentional.</p><h3>Bag Matches Shoes</h3><p>A classic rule that still works for polished looks.</p>",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=500&fit=crop",
    category: "Tips",
    author: "Sarah Johnson",
    readTime: "3 min read",
    published: true,
  },
  {
    title: "Sustainable Fashion: A Complete Guide",
    slug: "sustainable-fashion-guide",
    excerpt: "Make better choices for your wardrobe and the planet with these sustainable tips.",
    content: "<p>Fashion doesn't have to cost the earth. Here's how to shop responsibly:</p><h3>Buy Less, Choose Well</h3><p>Invest in quality pieces that last, not fast fashion trends.</p><h3>Secondhand First</h3><p>Thrift stores and vintage shops offer unique finds at great prices.</p><h3>Know Your Fabrics</h3><p>Organic cotton, linen, and hemp are more sustainable choices.</p>",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&h=500&fit=crop",
    category: "Education",
    author: "Dr. Lisa Wang",
    readTime: "7 min read",
    published: true,
  },
  {
    title: "The Art of Layering: A Season-by-Season Guide",
    slug: "art-of-layering",
    excerpt: "Master the skill of layering to stay stylish and comfortable year-round.",
    content: "<p>Layering is the secret to versatile, dynamic outfits:</p><h3>Spring Layers</h3><p>Light cardigans over tees, with a denim jacket as your outer layer.</p><h3>Summer Layers</h3><p>Camisoles under open shirts, lightweight scarves for evening.</p><h3>Fall Layers</h3><p>Sweaters over button-downs, vests under coats.</p><h3>Winter Layers</h3><p>Thermal base layers, chunky knits, and statement coats.</p>",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=500&fit=crop",
    category: "Lifestyle",
    author: "Emily Davis",
    readTime: "5 min read",
    published: true,
  },
  {
    title: "Color Psychology in Fashion",
    slug: "color-psychology-fashion",
    excerpt: "What your outfit colors say about you and how to use them intentionally.",
    content: "<p>Colors influence how others perceive you. Use them strategically:</p><h3>Black</h3><p>Authority, sophistication, and mystery.</p><h3>White</h3><p>Clean, fresh, and minimalist.</p><h3>Red</h3><p>Confidence, passion, and energy.</p><h3>Blue</h3><p>Trust, calm, and reliability.</p>",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=500&fit=crop",
    category: "Education",
    author: "Mike Chen",
    readTime: "4 min read",
    published: false,
  },
  {
    title: "Building a Capsule Wardrobe on a Budget",
    slug: "capsule-wardrobe-budget",
    excerpt: "You don't need a huge budget to have a great wardrobe. Here's how to do it smart.",
    content: "<p>A capsule wardrobe is about smart choices, not spending:</p><h3>Start with Neutrals</h3><p>Black, white, navy, and beige mix and match effortlessly.</p><h3>Add 2-3 Statement Pieces</h3><p>A bold jacket or colorful accessory brings personality.</p><h3>Invest in Basics</h3><p>Spend more on t-shirts and jeans — you'll wear them daily.</p>",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=500&fit=crop",
    category: "Tips",
    author: "Sarah Johnson",
    readTime: "5 min read",
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
      update: { image: product.image, name: product.name, description: product.description, price: product.price, category: product.category, stock: product.stock, featured: product.featured },
      create: product,
    });
  }
  console.log(`Created ${products.length} products`);

  // Create blog posts
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: { image: post.image, title: post.title, excerpt: post.excerpt, published: post.published },
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

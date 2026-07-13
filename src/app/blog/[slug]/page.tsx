"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, User, Tag, Clock, Share2, Bookmark, ChevronRight } from "lucide-react";

const posts = [
  {
    slug: "healthy-eating-on-a-budget",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop",
    category: "Nutrition",
    title: "Healthy Eating on a Budget: Smart Tips for Fresh Grocery Shopping",
    author: "Sarah Johnson",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    excerpt: "Discover practical strategies to fill your cart with nutritious, fresh produce without breaking the bank.",
    content: `
      <p>Eating healthy doesn't have to break the bank. With the right strategies, you can fill your cart with nutritious, fresh produce while staying within your budget. Here are our top tips for smart grocery shopping.</p>

      <h2>1. Plan Your Meals Ahead</h2>
      <p>Meal planning is one of the most effective ways to save money on groceries. By knowing exactly what you need before you shop, you avoid impulse purchases and food waste. Start by mapping out your meals for the week, then create a detailed shopping list.</p>

      <h2>2. Shop Seasonal Produce</h2>
      <p>Seasonal fruits and vegetables are not only fresher and tastier — they're also more affordable. When produce is in season, it's abundant and doesn't need to be shipped from far away, which keeps prices low.</p>

      <h2>3. Buy in Bulk</h2>
      <p>Items like rice, oats, beans, and nuts are often cheaper when bought in bulk. These staples have long shelf lives and form the foundation of many healthy meals.</p>

      <h2>4. Don't Shop Hungry</h2>
      <p>It sounds simple, but shopping on an empty stomach leads to impulse buys. Eat a healthy snack before heading to the store to keep your spending in check.</p>

      <h2>5. Compare Prices</h2>
      <p>Take a moment to compare unit prices between different brands and sizes. Store brands often offer the same quality at a fraction of the cost.</p>
    `,
  },
  {
    slug: "seasonal-produce-guide",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1200&h=600&fit=crop",
    category: "Seasonal",
    title: "What's in Season: Your Guide to Fresh Produce This Month",
    author: "Mike Chen",
    date: "Jan 10, 2025",
    readTime: "4 min read",
    excerpt: "Learn which fruits and vegetables are at their peak flavor and best value right now.",
    content: `
      <p>Knowing what's in season helps you eat better, save money, and support local farmers. Each season brings a unique bounty of fresh produce at its peak flavor and nutritional value.</p>

      <h2>Winter Favorites</h2>
      <p>Winter may seem like a quiet time for produce, but there's actually plenty to enjoy. Citrus fruits like oranges, lemons, and grapefruits are at their juiciest. Root vegetables such as carrots, beets, and turnips provide hearty, nutritious options.</p>

      <h2>Spring Awakening</h2>
      <p>As the weather warms, fresh greens like asparagus, artichokes, and peas appear. Strawberries begin their season, and fresh herbs become abundant.</p>

      <h2>Summer Bounty</h2>
      <p>Summer is the peak season for tomatoes, berries, corn, peppers, and stone fruits. The variety and quality during summer months is unmatched.</p>

      <h2>Autumn Harvest</h2>
      <p>Fall brings apples, pears, pumpkins, and squash. These warming, comforting foods are perfect for hearty meals and baking.</p>
    `,
  },
  {
    slug: "farm-to-table-benefits",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=600&fit=crop",
    category: "Lifestyle",
    title: "Farm to Table: Why Local Sourcing Matters for Your Health",
    author: "Emily Davis",
    date: "Jan 5, 2025",
    readTime: "6 min read",
    excerpt: "Explore the benefits of choosing locally sourced food and how it supports your community.",
    content: `
      <p>The farm-to-table movement isn't just a trend — it's a return to how food was meant to be sourced. By choosing locally grown produce, you're not only getting fresher food but also supporting your community and the environment.</p>

      <h2>Fresher Means More Nutritious</h2>
      <p>Produce that travels shorter distances reaches your plate faster, retaining more vitamins and minerals. Food that sits in transit for days loses nutritional value with each passing hour.</p>

      <h2>Supporting Local Economies</h2>
      <p>When you buy from local farms, more of your money stays in your community. Local farmers reinvest in their neighborhoods, creating jobs and strengthening the local economy.</p>

      <h2>Environmental Impact</h2>
      <p>Less transportation means a smaller carbon footprint. Local sourcing reduces packaging, refrigeration needs, and the emissions associated with long-haul shipping.</p>
    `,
  },
  {
    slug: "meal-prep-for-beginners",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&h=600&fit=crop",
    category: "Tips",
    title: "Meal Prep for Beginners: Save Time with Fresh Ingredients",
    author: "Sarah Johnson",
    date: "Dec 28, 2024",
    readTime: "5 min read",
    excerpt: "Start your meal prep journey with simple strategies using fresh groceries.",
    content: `
      <p>Meal prepping is the secret weapon of busy people who still want to eat healthy. By dedicating a few hours each week to preparing meals ahead, you save time, reduce stress, and make better food choices.</p>

      <h2>Start Small</h2>
      <p>You don't need to prep every meal for the week. Start by preparing just lunches or breakfasts. As you get comfortable, you can expand your prep routine.</p>

      <h2>Invest in Good Containers</h2>
      <p>Quality glass containers with airtight lids keep food fresh longer and are microwave-safe. They're a worthwhile investment for any meal prepper.</p>

      <h2>Batch Cook Staples</h2>
      <p>Cook large batches of rice, quinoa, roasted vegetables, and proteins. These versatile bases can be mixed and matched throughout the week for different meals.</p>
    `,
  },
  {
    slug: "organic-vs-conventional",
    image: "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=1200&h=600&fit=crop",
    category: "Education",
    title: "Organic vs Conventional: What You Need to Know",
    author: "Mike Chen",
    date: "Dec 20, 2024",
    readTime: "7 min read",
    excerpt: "A balanced look at organic and conventional produce — the differences and benefits.",
    content: `
      <p>The organic vs conventional debate can be confusing. Both have their merits, and the best choice depends on your priorities, budget, and values. Let's break down the key differences.</p>

      <h2>What Does Organic Mean?</h2>
      <p>Organic produce is grown without synthetic pesticides, herbicides, or fertilizers. Organic farming emphasizes soil health, biodiversity, and natural pest management.</p>

      <h2>Nutritional Differences</h2>
      <p>Research shows that organic and conventional produce have similar nutritional profiles. The main difference lies in pesticide residue levels, which are significantly lower in organic produce.</p>

      <h2>Making the Right Choice</h2>
      <p>The Environmental Working Group publishes an annual "Dirty Dozen" list of produce with the highest pesticide residues. Consider buying organic for these items when possible.</p>
    `,
  },
  {
    slug: "winter-comfort-recipes",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1200&h=600&fit=crop",
    category: "Recipes",
    title: "Winter Comfort Recipes Using Fresh Groceries",
    author: "Emily Davis",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    excerpt: "Warm up with hearty soups, stews, and baked goods made from seasonal ingredients.",
    content: `
      <p>When temperatures drop, there's nothing better than a warm, comforting meal made with fresh ingredients. These recipes use seasonal produce to create dishes that nourish both body and soul.</p>

      <h2>Hearty Vegetable Soup</h2>
      <p>A classic vegetable soup loaded with carrots, celery, potatoes, and herbs. It's simple, nutritious, and perfect for batch cooking.</p>

      <h2>Roasted Root Vegetables</h2>
      <p>Roasting brings out the natural sweetness in root vegetables. Try a mix of carrots, parsnips, beets, and sweet potatoes with olive oil and rosemary.</p>

      <h2>Warm Grain Bowls</h2>
      <p>Start with a base of quinoa or farro, add roasted seasonal vegetables, top with a tahini dressing, and you have a satisfying, healthy meal.</p>
    `,
  },
  {
    slug: "smoothie-bowl-ideas",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=1200&h=600&fit=crop",
    category: "Recipes",
    title: "10 Delicious Smoothie Bowl Ideas for a Fresh Start",
    author: "Sarah Johnson",
    date: "Dec 10, 2024",
    readTime: "4 min read",
    excerpt: "Start your morning right with these vibrant, nutrient-packed smoothie bowls.",
    content: `
      <p>Smoothie bowls are a beautiful and nutritious way to start your day. Thicker than regular smoothies, they're topped with fresh fruits, granola, and seeds for a meal that's as Instagram-worthy as it is healthy.</p>

      <h2>1. Tropical Mango Bowl</h2>
      <p>Blend frozen mango, banana, and coconut milk. Top with fresh kiwi, shredded coconut, and macadamia nuts.</p>

      <h2>2. Berry Blast Bowl</h2>
      <p>Combine mixed berries with Greek yogurt and a splash of almond milk. Garnish with fresh berries, chia seeds, and granola.</p>

      <h2>3. Green Power Bowl</h2>
      <p>Blend spinach, banana, and mango for a vibrant green base. Top with sliced avocado, hemp seeds, and a drizzle of honey.</p>
    `,
  },
  {
    slug: "understanding-food-labels",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop",
    category: "Education",
    title: "Understanding Food Labels: What to Look For",
    author: "Mike Chen",
    date: "Dec 5, 2024",
    readTime: "5 min read",
    excerpt: "Decode nutrition labels and ingredient lists to make informed choices about food.",
    content: `
      <p>Food labels are your roadmap to making informed choices about what you eat. Learning to read them properly can help you avoid unhealthy ingredients and choose products that align with your dietary goals.</p>

      <h2>Check the Serving Size</h2>
      <p>Always start with the serving size. All the nutritional information on the label is based on this amount, so it's crucial to compare it with how much you actually eat.</p>

      <h2>Watch for Hidden Sugars</h2>
      <p>Sugar hides under many names: high fructose corn syrup, dextrose, maltose, and more. Check the ingredient list for added sugars, especially in products marketed as "healthy."</p>

      <h2>Understand Fat Types</h2>
      <p>Not all fats are bad. Unsaturated fats from nuts, avocados, and olive oil are healthy. Focus on limiting saturated and trans fats.</p>
    `,
  },
  {
    slug: "sustainable-grocery-shopping",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop",
    category: "Lifestyle",
    title: "Sustainable Grocery Shopping: Tips to Reduce Waste",
    author: "Emily Davis",
    date: "Nov 28, 2024",
    readTime: "5 min read",
    excerpt: "Simple changes to your shopping habits that make a big difference for the planet.",
    content: `
      <p>Sustainable grocery shopping is about making choices that benefit both your health and the planet. Small changes in your shopping habits can have a significant positive impact on the environment.</p>

      <h2>Bring Reusable Bags</h2>
      <p>Keep reusable bags in your car or by the door so you never forget them. Canvas or mesh bags are durable alternatives to single-use plastic.</p>

      <h2>Buy in Bulk</h2>
      <p>Purchasing staples in bulk reduces packaging waste. Bring your own containers to stores that offer bulk bins for grains, nuts, and spices.</p>

      <h2>Choose Local and Seasonal</h2>
      <p>Local, seasonal produce requires less transportation and packaging, reducing your carbon footprint while supporting community farmers.</p>
    `,
  },
  {
    slug: "best-superfoods-for-energy",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=600&fit=crop",
    category: "Nutrition",
    title: "10 Superfoods That Boost Your Energy Naturally",
    author: "Sarah Johnson",
    date: "Nov 20, 2024",
    readTime: "5 min read",
    excerpt: "Skip the caffeine crash and fuel your day with these natural energy-boosting foods.",
    content: `
      <p>Skip the energy drinks and caffeine crashes. These natural superfoods provide sustained energy throughout the day without the jitters or afternoon slump.</p>

      <h2>1. Bananas</h2>
      <p>Packed with natural sugars, fiber, and potassium, bananas provide quick and sustained energy. They're perfect as a pre-workout snack.</p>

      <h2>2. Oats</h2>
      <p>Oatmeal releases energy slowly, keeping you full and focused for hours. Add berries and nuts for extra nutrients and flavor.</p>

      <h2>3. Nuts and Seeds</h2>
      <p>Almonds, walnuts, and chia seeds are rich in healthy fats, protein, and fiber. They provide steady energy without blood sugar spikes.</p>

      <h2>4. Sweet Potatoes</h2>
      <p>Rich in complex carbs and fiber, sweet potatoes provide long-lasting energy. They're also loaded with vitamins and antioxidants.</p>
    `,
  },
  {
    slug: "kitchen-organization-tips",
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&h=600&fit=crop",
    category: "Tips",
    title: "Kitchen Organization Tips for Meal Prep Success",
    author: "Emily Davis",
    date: "Nov 15, 2024",
    readTime: "4 min read",
    excerpt: "An organized kitchen makes cooking easier and more enjoyable.",
    content: `
      <p>An organized kitchen makes cooking easier and more enjoyable. With the right setup, you can streamline your meal prep routine and spend less time searching for ingredients and tools.</p>

      <h2>Declutter First</h2>
      <p>Remove items you don't use regularly. Keep only essential tools and ingredients within easy reach. A decluttered space reduces stress and increases efficiency.</p>

      <h2>Zone Your Kitchen</h2>
      <p>Organize your kitchen into zones: prep zone, cooking zone, storage zone. Keep related items together so you can work efficiently.</p>

      <h2>Use Clear Containers</h2>
      <p>Clear containers let you see contents at a glance, reducing time spent searching. Label everything for quick identification.</p>
    `,
  },
  {
    slug: "holiday-entertaining-ideas",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=600&fit=crop",
    category: "Recipes",
    title: "Holiday Entertaining: Impressive Dishes Made Simple",
    author: "Sarah Johnson",
    date: "Nov 10, 2024",
    readTime: "6 min read",
    excerpt: "Wow your guests with these impressive yet easy-to-make dishes.",
    content: `
      <p>Hosting a holiday gathering doesn't have to be stressful. With these simple yet impressive recipes, you can wow your guests while enjoying the celebration yourself.</p>

      <h2>Charcuterie Board</h2>
      <p>A well-arranged charcuterie board is both beautiful and effortless. Combine cured meats, artisan cheeses, fresh fruits, nuts, and honey for an impressive spread.</p>

      <h2>One-Pan Roasted Dinner</h2>
      <p>Roast a whole chicken with seasonal vegetables on a single pan. The presentation is stunning, and cleanup is minimal.</p>

      <h2>No-Bake Desserts</h2>
      <p>Chocolate mousse, fruit tarts, or a cheese plate with honey and figs — elegant desserts that require zero oven time.</p>
    `,
  },
  {
    slug: "morning-routine-healthy-breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&h=600&fit=crop",
    category: "Tips",
    title: "Building a Morning Routine with Healthy Breakfasts",
    author: "Mike Chen",
    date: "Nov 5, 2024",
    readTime: "4 min read",
    excerpt: "Transform your mornings with quick, nutritious breakfast ideas.",
    content: `
      <p>A healthy morning routine starts with a nutritious breakfast. These quick and easy breakfast ideas will fuel your day without taking up too much of your morning.</p>

      <h2>Overnight Oats</h2>
      <p>Prep overnight oats the night before for a grab-and-go breakfast. Mix oats with milk, yogurt, and your favorite toppings.</p>

      <h2>Smoothie Packs</h2>
      <p>Pre-portion smoothie ingredients into freezer bags. In the morning, just add liquid and blend for a nutritious drink.</p>

      <h2>Avocado Toast</h2>
      <p>Whole grain toast topped with mashed avocado, a sprinkle of salt, and red pepper flakes is ready in minutes and packed with healthy fats.</p>
    `,
  },
  {
    slug: "food-storage-guide",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1200&h=600&fit=crop",
    category: "Education",
    title: "The Ultimate Guide to Food Storage and Freshness",
    author: "Emily Davis",
    date: "Oct 28, 2024",
    readTime: "5 min read",
    excerpt: "Learn the best ways to store fruits, vegetables, and other groceries.",
    content: `
      <p>Proper food storage is key to maintaining freshness, reducing waste, and getting the most out of your groceries. Learn the best practices for storing different types of food.</p>

      <h2>Refrigerator Organization</h2>
      <p>Store produce in the crisper drawers, keep raw meats on the bottom shelf to prevent drips, and use clear containers for leftovers.</p>

      <h2>Freezer Tips</h2>
      <p>Freeze fruits and vegetables at their peak freshness. Use airtight containers or vacuum-sealed bags to prevent freezer burn.</p>

      <h2>Pantry Staples</h2>
      <p>Keep dry goods in airtight containers in a cool, dark place. Use the first-in, first-out method to ensure older items are used first.</p>
    `,
  },
  {
    slug: "plant-based-diet-benefits",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=600&fit=crop",
    category: "Nutrition",
    title: "The Benefits of a Plant-Based Diet for Your Health",
    author: "Sarah Johnson",
    date: "Oct 20, 2024",
    readTime: "6 min read",
    excerpt: "Explore the science behind plant-based eating and how it can improve your health.",
    content: `
      <p>Plant-based eating has gained popularity for good reason. Research shows that a diet rich in fruits, vegetables, whole grains, and legumes can improve health outcomes and reduce the risk of chronic diseases.</p>

      <h2>Heart Health</h2>
      <p>Studies link plant-based diets to lower cholesterol, blood pressure, and reduced risk of heart disease. The fiber and antioxidants in plant foods support cardiovascular health.</p>

      <h2>Weight Management</h2>
      <p>Plant-based diets tend to be lower in calories and higher in fiber, helping you feel full while consuming fewer calories. This naturally supports healthy weight management.</p>

      <h2>Getting Started</h2>
      <p>You don't have to go fully plant-based overnight. Start with Meatless Mondays or swap one meal a day for a plant-based option. Small changes add up over time.</p>
    `,
  },
  {
    slug: "cooking-with-seasonal-herbs",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&h=600&fit=crop",
    category: "Recipes",
    title: "Cooking with Seasonal Herbs: A Flavor Guide",
    author: "Mike Chen",
    date: "Oct 15, 2024",
    readTime: "5 min read",
    excerpt: "Fresh herbs can transform any dish. Learn which herbs are in season.",
    content: `
      <p>Fresh herbs can transform any dish from ordinary to extraordinary. Knowing which herbs are in season and how to use them will elevate your cooking to new heights.</p>

      <h2>Spring Herbs</h2>
      <p>Chives, parsley, and mint thrive in spring. Use them in salads, with fresh fish, or as a bright finish to spring dishes.</p>

      <h2>Summer Herbs</h2>
      <p>Basil, cilantro, and dill are summer stars. They pair perfectly with tomatoes, grilled meats, and light summer fare.</p>

      <h2>Fall and Winter Herbs</h2>
      <p>Rosemary, thyme, and sage are robust herbs that stand up to hearty winter cooking. They're perfect for roasts, soups, and stews.</p>
    `,
  },
  {
    slug: "budget-friendly-meal-planning",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=600&fit=crop",
    category: "Tips",
    title: "Budget-Friendly Meal Planning for Families",
    author: "Emily Davis",
    date: "Oct 10, 2024",
    readTime: "5 min read",
    excerpt: "Feed your family nutritious meals without breaking the bank.",
    content: `
      <p>Feeding a family nutritious meals on a budget is possible with smart planning. These strategies help you save money while ensuring everyone eats well.</p>

      <h2>Plan Around Sales</h2>
      <p>Check weekly grocery flyers and plan meals around what's on sale. This simple habit can save you hundreds of dollars per year.</p>

      <h2>Cook Once, Eat Twice</h2>
      <p>Double recipes and use leftovers creatively. Roast chicken one night becomes chicken salad sandwiches the next day.</p>

      <h2>Grow Your Own</h2>
      <p>Even a small herb garden on your windowsill saves money and adds freshness to your meals. Start with easy-to-grow herbs like basil and mint.</p>
    `,
  },
  {
    slug: "benefits-of-local-farmers-market",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1200&h=600&fit=crop",
    category: "Lifestyle",
    title: "Why Shopping at Local Farmers Markets Matters",
    author: "Sarah Johnson",
    date: "Oct 5, 2024",
    readTime: "4 min read",
    excerpt: "Fresh produce, supporting local farmers, and building community.",
    content: `
      <p>Local farmers markets offer more than just fresh produce — they provide a connection to your food, your community, and the people who grow it.</p>

      <h2>Peak Freshness</h2>
      <p>Produce at farmers markets is typically harvested within 24 hours of sale, ensuring maximum freshness and nutritional value.</p>

      <h2>Know Your Farmer</h2>
      <p>Meeting the people who grow your food builds trust and understanding. You can ask about farming practices, seasonality, and preparation tips.</p>

      <h2>Support Local Economy</h2>
      <p>Money spent at farmers markets stays in your community, supporting local families and businesses rather than large corporations.</p>
    `,
  },
  {
    slug: "immune-boosting-foods",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1200&h=600&fit=crop",
    category: "Nutrition",
    title: "Immune-Boosting Foods to Keep You Healthy This Season",
    author: "Mike Chen",
    date: "Sep 28, 2024",
    readTime: "5 min read",
    excerpt: "Strengthen your immune system with these powerful foods.",
    content: `
      <p>Strengthen your immune system naturally with these powerful foods. Packed with vitamins, minerals, and antioxidants, they help your body fight off illness.</p>

      <h2>Citrus Fruits</h2>
      <p>Oranges, lemons, and grapefruits are loaded with vitamin C, which supports immune cell function and helps fight infections.</p>

      <h2>Garlic and Ginger</h2>
      <p>Both have powerful antimicrobial and anti-inflammatory properties. Add them to soups, stir-fries, and teas for an immune boost.</p>

      <h2>Leafy Greens</h2>
      <p>Spinach, kale, and Swiss chard are rich in vitamins A, C, and K, as well as antioxidants that support immune health.</p>
    `,
  },
  {
    slug: "quick-weeknight-dinners",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop",
    category: "Recipes",
    title: "Quick Weeknight Dinners Ready in 30 Minutes",
    author: "Emily Davis",
    date: "Sep 20, 2024",
    readTime: "4 min read",
    excerpt: "Busy evenings call for fast, delicious meals. Ready in 30 minutes.",
    content: `
      <p>Busy weeknights call for fast, delicious meals. These recipes are designed to get a healthy dinner on the table in 30 minutes or less.</p>

      <h2>One-Pan Lemon Herb Chicken</h2>
      <p>Season chicken breasts with lemon, garlic, and herbs. Roast with broccoli and cherry tomatoes for a complete meal on one pan.</p>

      <h2>Quick Stir-Fry</h2>
      <p>Toss your favorite vegetables and protein in a hot wok with soy sauce and ginger. Serve over rice for a satisfying meal in minutes.</p>

      <h2>Pasta Primavera</h2>
      <p>Cook pasta while sautéing seasonal vegetables. Toss together with olive oil, garlic, and parmesan for a light yet filling dinner.</p>
    `,
  },
];

const categories = ["All", "Nutrition", "Seasonal", "Lifestyle", "Tips", "Education", "Recipes"];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-brand hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const categoryPosts = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 5);

  return (
    <div className="min-h-screen bg-dark pt-[120px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-400">{post.title}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Main Content */}
          <article>
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 aspect-[2/1]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 bg-brand/10 text-brand rounded-lg text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button className="p-2 rounded-lg bg-surface border border-white/10 text-gray-400 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-surface border border-white/10 text-gray-400 hover:text-white transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8 pb-8 border-b border-white/10">
              {post.title}
            </h1>

            {/* Content */}
            <div
              className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-400 prose-p:leading-relaxed prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-li:text-gray-400"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex items-center gap-2 mt-10 pt-8 border-t border-white/10">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Tags:</span>
              <span className="px-3 py-1 bg-surface border border-white/10 rounded-lg text-xs text-gray-400">{post.category}</span>
              <span className="px-3 py-1 bg-surface border border-white/10 rounded-lg text-xs text-gray-400">Fresh Grocery</span>
              <span className="px-3 py-1 bg-surface border border-white/10 rounded-lg text-xs text-gray-400">Healthy Living</span>
            </div>

            {/* Back to Blog */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Search */}
            <div className="bg-surface border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-4 pr-4 py-2.5 bg-dark border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-surface border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={cat === "All" ? "/blog" : `/blog?category=${cat.toLowerCase()}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {cat}
                    <span className="text-xs text-gray-600">
                      {cat === "All" ? posts.length : posts.filter((p) => p.category === cat).length}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            {categoryPosts.length > 0 && (
              <div className="bg-surface border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {categoryPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-brand transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{p.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Tags */}
            <div className="bg-surface border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Nutrition", "Recipes", "Tips", "Organic", "Fresh", "Seasonal", "Healthy"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-dark border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white hover:border-white/20 cursor-pointer transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Blog Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-[120px] pb-[60px]">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="inline-block px-3 py-1 bg-brand/10 text-brand rounded-lg text-xs font-bold uppercase tracking-wider mb-3">
                  Related Posts
                </span>
                <h2 className="text-3xl font-bold text-white">
                  More <span className="text-brand">Stories</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2.5 py-0.5 bg-brand/10 text-brand rounded text-[11px] font-bold uppercase tracking-wider">
                        {p.category}
                      </span>
                      <span className="text-xs text-gray-500">{p.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-brand transition-colors duration-200">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                      {p.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand group-hover:gap-3 transition-all duration-200">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

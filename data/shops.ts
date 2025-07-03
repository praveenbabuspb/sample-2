
export interface Shop {
  id: number;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  image: string;
  category: string;
}

export const shops: Record<string, Shop[]> = {
  "Supermarket": [
    {
      id: 1,
      name: "FreshMart Supermarket",
      description: "Your one-stop destination for all grocery needs",
      rating: 4.8,
      deliveryTime: "20-30 min",
      image: "🏪",
      category: "Supermarket"
    },
    {
      id: 2,
      name: "MegaStore Plus",
      description: "Premium quality products at affordable prices",
      rating: 4.6,
      deliveryTime: "25-35 min",
      image: "🏬",
      category: "Supermarket"
    },
    {
      id: 3,
      name: "QuickMart Express",
      description: "Fast delivery and fresh products daily",
      rating: 4.7,
      deliveryTime: "15-25 min",
      image: "🛒",
      category: "Supermarket"
    },
    {
      id: 4,
      name: "GreenGrocer Market",
      description: "Organic and eco-friendly grocery store",
      rating: 4.9,
      deliveryTime: "30-40 min",
      image: "🌱",
      category: "Supermarket"
    },
    {
      id: 23,
      name: "Value Grocers",
      description: "All your daily needs at great value",
      rating: 4.5,
      deliveryTime: "25-30 min",
      image: "💰",
      category: "Supermarket"
    },
    {
      id: 24,
      name: "Corner Mart",
      description: "Your friendly neighborhood convenience store",
      rating: 4.6,
      deliveryTime: "10-20 min",
      image: "🏘️",
      category: "Supermarket"
    }
  ],
  "Pharmacy": [
    {
      id: 5,
      name: "HealthCare Plus Pharmacy",
      description: "Trusted healthcare solutions and wellness products",
      rating: 4.9,
      deliveryTime: "10-20 min",
      image: "💊",
      category: "Pharmacy"
    },
    {
      id: 6,
      name: "MediQuick Pharmacy",
      description: "24/7 medical supplies and prescription services",
      rating: 4.7,
      deliveryTime: "15-25 min",
      image: "🏥",
      category: "Pharmacy"
    },
    {
      id: 7,
      name: "WellCare Drugstore",
      description: "Complete health and beauty care solutions",
      rating: 4.8,
      deliveryTime: "20-30 min",
      image: "⚕️",
      category: "Pharmacy"
    },
    {
      id: 25,
      name: "Community Pharmacy",
      description: "Caring for your family's health",
      rating: 4.8,
      deliveryTime: "15-25 min",
      image: "🧑‍⚕️",
      category: "Pharmacy"
    }
  ],
  "Meat": [
    {
      id: 8,
      name: "Prime Cuts Butchery",
      description: "Fresh, premium quality meats from local farms",
      rating: 4.8,
      deliveryTime: "25-35 min",
      image: "🥩",
      category: "Meat"
    },
    {
      id: 9,
      name: "Fresh Meat Market",
      description: "Halal certified fresh meat and poultry",
      rating: 4.6,
      deliveryTime: "30-40 min",
      image: "🍖",
      category: "Meat"
    },
    {
      id: 10,
      name: "Butcher's Choice",
      description: "Artisan cuts and specialty meat products",
      rating: 4.9,
      deliveryTime: "35-45 min",
      image: "🔪",
      category: "Meat"
    },
    {
      id: 26,
      name: "The Meat Co.",
      description: "Finest selection of meats and poultry",
      rating: 4.7,
      deliveryTime: "30-40 min",
      image: "🐔",
      category: "Meat"
    }
  ],
  "Electronics": [
    {
      id: 11,
      name: "TechWorld Electronics",
      description: "Latest gadgets and electronic devices",
      rating: 4.7,
      deliveryTime: "45-60 min",
      image: "📱",
      category: "Electronics"
    },
    {
      id: 12,
      name: "Digital Hub Store",
      description: "Computers, smartphones and accessories",
      rating: 4.8,
      deliveryTime: "40-50 min",
      image: "💻",
      category: "Electronics"
    },
    {
      id: 13,
      name: "Gadget Galaxy",
      description: "Smart home devices and gaming equipment",
      rating: 4.6,
      deliveryTime: "50-70 min",
      image: "🎮",
      category: "Electronics"
    },
    {
      id: 27,
      name: "Electro Zone",
      description: "Your zone for all things electronic",
      rating: 4.6,
      deliveryTime: "60-90 min",
      image: "💡",
      category: "Electronics"
    }
  ],
  "Stationary": [
    {
      id: 14,
      name: "Office Essentials Store",
      description: "Complete range of office and school supplies",
      rating: 4.5,
      deliveryTime: "30-40 min",
      image: "📝",
      category: "Stationary"
    },
    {
      id: 15,
      name: "Study Corner",
      description: "Student supplies and educational materials",
      rating: 4.7,
      deliveryTime: "25-35 min",
      image: "📚",
      category: "Stationary"
    },
    {
      id: 16,
      name: "Paper & Pen Shop",
      description: "Premium writing instruments and paper products",
      rating: 4.8,
      deliveryTime: "35-45 min",
      image: "✏️",
      category: "Stationary"
    },
    {
      id: 28,
      name: "The Paper Mill",
      description: "Fine papers, notebooks, and writing tools",
      rating: 4.7,
      deliveryTime: "20-30 min",
      image: "📄",
      category: "Stationary"
    }
  ],
  "Fruits & Vegetables": [
    {
      id: 17,
      name: "Garden Fresh Produce",
      description: "Farm-fresh fruits and vegetables delivered daily",
      rating: 4.9,
      deliveryTime: "20-30 min",
      image: "🥕",
      category: "Fruits & Vegetables"
    },
    {
      id: 18,
      name: "Organic Harvest",
      description: "100% organic fruits and vegetables",
      rating: 4.8,
      deliveryTime: "25-35 min",
      image: "🥬",
      category: "Fruits & Vegetables"
    },
    {
      id: 19,
      name: "Fresh Farm Market",
      description: "Locally sourced seasonal produce",
      rating: 4.7,
      deliveryTime: "30-40 min",
      image: "🍅",
      category: "Fruits & Vegetables"
    },
    {
      id: 29,
      name: "The Veggie Patch",
      description: "The best local and exotic vegetables",
      rating: 4.9,
      deliveryTime: "20-25 min",
      image: "🥦",
      category: "Fruits & Vegetables"
    }
  ],
  "Gifts": [
    {
      id: 20,
      name: "Wonderful Gifts Boutique",
      description: "Perfect gifts for every occasion and celebration",
      rating: 4.8,
      deliveryTime: "40-60 min",
      image: "🎁",
      category: "Gifts"
    },
    {
      id: 21,
      name: "Special Moments Store",
      description: "Personalized gifts and custom arrangements",
      rating: 4.9,
      deliveryTime: "60-90 min",
      image: "💝",
      category: "Gifts"
    },
    {
      id: 22,
      name: "Gift Gallery",
      description: "Unique gifts and decorative items",
      rating: 4.6,
      deliveryTime: "45-75 min",
      image: "🛍️",
      category: "Gifts"
    },
    {
      id: 30,
      name: "The Gift Box",
      description: "Curated boxes for every special person",
      rating: 4.8,
      deliveryTime: "30-50 min",
      image: "📦",
      category: "Gifts"
    }
  ]
};

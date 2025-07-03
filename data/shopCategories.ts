
export interface ShopCategory {
  name: string;
  url: string;
  icon: string;
  image: string;
}

export const shopCategories: Record<string, ShopCategory[]> = {
  "FreshMart Supermarket": [
    { name: "Grocery", url: "/grocery", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Snacks", url: "/snacks", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Cool Drinks", url: "/cooldrinks", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Dairy", url: "/dairy", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Bakery", url: "/bakery", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Frozen", url: "/frozen", icon: "Zap", image: "https://placehold.co/150x150.png" },
  ],
  "MegaStore Plus": [
    { name: "Grocery", url: "/grocery", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Snacks", url: "/snacks", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Cool Drinks", url: "/cooldrinks", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Household", url: "/household", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Personal Care", url: "/personalcare", icon: "Coffee", image: "https://placehold.co/150x150.png" },
  ],
  "QuickMart Express": [
    { name: "Grocery", url: "/grocery", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Snacks", url: "/snacks", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Cool Drinks", url: "/cooldrinks", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Ready Meals", url: "/readymeals", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "GreenGrocer Market": [
    { name: "Organic Grocery", url: "/organic", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Health Snacks", url: "/healthsnacks", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Natural Drinks", url: "/naturaldrinks", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Supplements", url: "/supplements", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Value Grocers": [
    { name: "Staples", url: "/staples", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Beverages", url: "/beverages", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Cleaning Supplies", url: "/cleaning", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Corner Mart": [
    { name: "Essentials", url: "/essentials", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Dairy & Bread", url: "/dairy-bread", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Munchies", url: "/munchies", icon: "Zap", image: "https://placehold.co/150x150.png" },
  ],
  "HealthCare Plus Pharmacy": [
    { name: "Medicines", url: "/medicines", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Vitamins", url: "/vitamins", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Personal Care", url: "/personalcare", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Baby Care", url: "/babycare", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "First Aid", url: "/firstaid", icon: "Coffee", image: "https://placehold.co/150x150.png" },
  ],
  "MediQuick Pharmacy": [
    { name: "Prescription", url: "/prescription", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "OTC Medicines", url: "/otc", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Health Devices", url: "/devices", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Beauty", url: "/beauty", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "WellCare Drugstore": [
    { name: "Medicines", url: "/medicines", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Wellness", url: "/wellness", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Skincare", url: "/skincare", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Nutrition", url: "/nutrition", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Community Pharmacy": [
    { name: "Pain Relief", url: "/pain-relief", icon: "Pill", image: "https://placehold.co/150x150.png" },
    { name: "Cold & Flu", url: "/cold-flu", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Vitamins & Supplements", url: "/vitamins", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Prime Cuts Butchery": [
    { name: "Chicken", url: "/chicken", icon: "Beef", image: "https://placehold.co/150x150.png" },
    { name: "Mutton", url: "/mutton", icon: "Beef", image: "https://placehold.co/150x150.png" },
    { name: "Fish", url: "/fish", icon: "Fish", image: "https://placehold.co/150x150.png" },
    { name: "Beef", url: "/beef", icon: "Beef", image: "https://placehold.co/150x150.png" },
    { name: "Pork", url: "/pork", icon: "PiggyBank", image: "https://placehold.co/150x150.png" },
    { name: "Prawn", url: "/prawn", icon: "Shell", image: "https://placehold.co/150x150.png" },
  ],
  "Fresh Meat Market": [
    { name: "Halal Chicken", url: "/halalchicken", icon: "Beef", image: "https://placehold.co/150x150.png" },
    { name: "Halal Mutton", url: "/halalmutton", icon: "Beef", image: "https://placehold.co/150x150.png" },
    { name: "Fresh Fish", url: "/freshfish", icon: "Fish", image: "https://placehold.co/150x150.png" },
    { name: "Seafood", url: "/seafood", icon: "Shell", image: "https://placehold.co/150x150.png" },
  ],
  "Butcher's Choice": [
    { name: "Premium Cuts", url: "/premium", icon: "Beef", image: "https://placehold.co/150x150.png" },
    { name: "Specialty Meats", url: "/specialty", icon: "Beef", image: "https://placehold.co/150x150.png" },
    { name: "Marinated", url: "/marinated", icon: "Beef", image: "https://placehold.co/150x150.png" },
    { name: "Sausages", url: "/sausages", icon: "Beef", image: "https://placehold.co/150x150.png" },
  ],
  "The Meat Co.": [
    { name: "Sausages", url: "/sausages", icon: "Beef", image: "https://placehold.co/150x150.png" },
    { name: "Steaks", url: "/steaks", icon: "Beef", image: "https://placehold.co/150x150.png" },
    { name: "Ground Meats", url: "/ground-meats", icon: "Beef", image: "https://placehold.co/150x150.png" },
  ],
  "TechWorld Electronics": [
    { name: "Smartphones", url: "/smartphones", icon: "Smartphone", image: "https://placehold.co/150x150.png" },
    { name: "Laptops", url: "/laptops", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Accessories", url: "/accessories", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Audio", url: "/audio", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Gaming", url: "/gaming", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Digital Hub Store": [
    { name: "Computers", url: "/computers", icon: "Smartphone", image: "https://placehold.co/150x150.png" },
    { name: "Mobile Devices", url: "/mobile", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Cables & Adapters", url: "/cables", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Storage", url: "/storage", icon: "Zap", image: "https://placehold.co/150x150.png" },
  ],
  "Gadget Galaxy": [
    { name: "Smart Home", url: "/smarthome", icon: "Smartphone", image: "https://placehold.co/150x150.png" },
    { name: "Wearables", url: "/wearables", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Gaming Gear", url: "/gaminggear", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Tech Gadgets", url: "/gadgets", icon: "Zap", image: "https://placehold.co/150x150.png" },
  ],
  "Electro Zone": [
    { name: "Televisions", url: "/tvs", icon: "Smartphone", image: "https://placehold.co/150x150.png" },
    { name: "Cameras", url: "/cameras", icon: "Camera", image: "https://placehold.co/150x150.png" },
    { name: "Home Audio", url: "/home-audio", icon: "Zap", image: "https://placehold.co/150x150.png" },
  ],
  "Office Essentials Store": [
    { name: "Writing", url: "/writing", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Paper", url: "/paper", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Office Supplies", url: "/office", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Storage", url: "/storage", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Study Corner": [
    { name: "Student Supplies", url: "/student", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Art Supplies", url: "/art", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Books", url: "/books", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Educational", url: "/educational", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Paper & Pen Shop": [
    { name: "Premium Pens", url: "/pens", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Notebooks", url: "/notebooks", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Art Materials", url: "/art", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Planners", url: "/planners", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "The Paper Mill": [
    { name: "Notebooks", url: "/notebooks", icon: "Book", image: "https://placehold.co/150x150.png" },
    { name: "Writing Tools", url: "/writing-tools", icon: "PenTool", image: "https://placehold.co/150x150.png" },
    { name: "Art Supplies", url: "/art-supplies", icon: "Paintbrush", image: "https://placehold.co/150x150.png" },
  ],
  "Garden Fresh Produce": [
    { name: "Fresh Fruits", url: "/fruits", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Vegetables", url: "/vegetables", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Leafy Greens", url: "/greens", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Herbs", url: "/herbs", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Organic Harvest": [
    { name: "Organic Fruits", url: "/organicfruits", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Organic Vegetables", url: "/organicvegetables", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Organic Herbs", url: "/organicherbs", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Superfoods", url: "/superfoods", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Fresh Farm Market": [
    { name: "Seasonal Fruits", url: "/seasonal", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Root Vegetables", url: "/roots", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Farm Fresh", url: "/farmfresh", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Local Produce", url: "/local", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "The Veggie Patch": [
    { name: "Leafy Greens", url: "/leafy-greens", icon: "Leaf", image: "https://placehold.co/150x150.png" },
    { name: "Root Vegetables", url: "/root-vegetables", icon: "Carrot", image: "https://placehold.co/150x150.png" },
    { name: "Organic Selection", url: "/organic-selection", icon: "Sprout", image: "https://placehold.co/150x150.png" },
  ],
  "Wonderful Gifts Boutique": [
    { name: "Birthday", url: "/birthday", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Anniversary", url: "/anniversary", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Wedding", url: "/wedding", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Holiday", url: "/holiday", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Special Moments Store": [
    { name: "Personalized", url: "/personalized", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Custom Gifts", url: "/custom", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Luxury Items", url: "/luxury", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Gift Sets", url: "/sets", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "Gift Gallery": [
    { name: "Decorative", url: "/decorative", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
    { name: "Collectibles", url: "/collectibles", icon: "Coffee", image: "https://placehold.co/150x150.png" },
    { name: "Handmade", url: "/handmade", icon: "Zap", image: "https://placehold.co/150x150.png" },
    { name: "Unique Finds", url: "/unique", icon: "ShoppingBag", image: "https://placehold.co/150x150.png" },
  ],
  "The Gift Box": [
    { name: "For Him", url: "/for-him", icon: "User", image: "https://placehold.co/150x150.png" },
    { name: "For Her", url: "/for-her", icon: "User", image: "https://placehold.co/150x150.png" },
    { name: "Occasions", url: "/occasions", icon: "Calendar", image: "https://placehold.co/150x150.png" },
  ]
};

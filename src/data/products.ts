import productMenSuit1 from '@/assets/suities/Men/19.jpg';
import productMenSuit2 from '@/assets/suities/Men/1225.jpg';
import productMenSuit3 from '@/assets/suities/Men/1581.jpg';
import productMenSuit4 from '@/assets/suities/Men/5672.jpg';
// import productMenSuit5 from '@/assets/suities/Men/5673.jpg';
import productMenSuit6 from '@/assets/suities/Men/5851.jpg';
import productMenSuit7 from '@/assets/suities/Men/9695.jpg';
import productMenSuit8 from '@/assets/suities/Men/21981.jpg';
import productMenSuit9 from '@/assets/suities/Men/63367.jpg'
import productMenSuit10 from '@/assets/suities/Men/311562.jpg'

import productShirt1 from '@/assets/product-shirt-1.jpg';
import productShirt2 from '@/assets/product-shirt-2.jpg';
import productWedding1 from '@/assets/product-wedding-1.jpg';
import productWedding2 from '@/assets/product-wedding-2.jpg';

import productWomenSuit1 from '@/assets/suities/women/2010.jpg';
import productWomenSuit2 from '@/assets/suities/women/2016.jpg';
import productWomenSuit3 from '@/assets/suities/women/2038.jpg';
import productWomenSuit4 from '@/assets/suities/women/2121.jpg';
import productWomenSuit5 from '@/assets/suities/women/2132.jpg';
import productWomenSuit6 from '@/assets/suities/women/5183.jpg';
import productWomenSuit7 from '@/assets/suities/women/90195.jpg';
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string[];
  isNew?: boolean;
  description: string;
  longDescription?: string;
  fabric: string;
  colors: string[];
  tags?: string[];
  style?: string; // e.g., '2-piece', '3-piece'
  gender: 'men' | 'women';
}

export const products: Product[] = [
  // Suiting
  {
    id: 'suit-01',
    gender: 'men',
    name: 'Premium Italian Charcoal',
    category: 'suiting',
    price: 8500,
    image: [productMenSuit1, productMenSuit4, productMenSuit9, productMenSuit6],
    isNew: true,
    description: 'Luxurious 100% Super 120s wool from Biella, Italy.',
    longDescription: 'Crafted from the finest Super 120s wool sourced from the historic mills of Biella, Italy. This fabric offers an unparalleled drape and a soft, silk-like hand feel. Perfect for high-stakes business meetings and evening galas.',
    fabric: '100% Super 120s Wool',
    colors: ['Charcoal', 'Midnight Black', 'Navy'],
    tags: ['Trending', 'Formal', 'Premium'],
    style: '3-piece'
  },
  {
    id: 'suit-02',
    gender: 'men',
    name: 'Royal Wedding Navy',
    category: 'suiting',
    price: 9200,
    image: [productMenSuit2, productMenSuit7, productMenSuit6, productMenSuit10],
    isNew: true,
    description: 'A deep, rich navy wool blend with a subtle natural sheen.',
    longDescription: 'Designed specifically for the modern groom. This fabric combines the breathability of merino wool with a touch of silk for a luminous finish that catches the light beautifully on your special day.',
    fabric: '85% Merino Wool 15% Silk',
    colors: ['Royal Navy', 'Deep Blue'],
    tags: ['Wedding', 'Trending', 'Premium'],
    style: '3-piece'
  },
  {
    id: 'suit-03',
    gender: 'men',
    name: 'Classic Black Tuxedo',
    category: 'suiting',
    price: 7800,
    image: [productMenSuit3, productMenSuit2, productMenSuit6, productMenSuit7],
    description: 'The quintessential black tie fabric. Deepest black wool.',
    longDescription: 'Our deepest black wool fabric, engineered for the perfect tuxedo. Minimalist yet powerful, this fabric holds its shape flawlessly through long nights of celebration.',
    fabric: '100% Wool',
    colors: ['Soul Black'],
    tags: ['Formal', 'Party Wear'],
    style: '2-piece'
  },
  {
    id: 'suit-04',
    gender: 'men',
    name: 'Festival Ivory Damask',
    category: 'suiting',
    price: 11500,
    image: [productMenSuit4, productMenSuit7, productMenSuit3, productMenSuit1],
    description: 'Intricate ivory patterns for festive celebrations.',
    longDescription: 'A masterpiece of textile art. This ivory damask features subtle tone-on-tone patterns that represent elegance and tradition, making it the premier choice for major festivals.',
    fabric: 'Silk-Wool Jaquard',
    colors: ['Ivory', 'Gold Dust'],
    tags: ['Festival', 'Wedding'],
    style: '2-piece'
  },
  {
    id: 'suit-05',
    gender: 'men',
    name: 'Sage Green Summer Tweed',
    category: 'suiting',
    price: 6500,
    image: [productMenSuit9, productMenSuit7, productMenSuit4, productMenSuit1],
    description: 'Lightweight tweed in a contemporary sage green hue.',
    longDescription: 'A modern take on a classic. This lightweight summer tweed is perfect for outdoor weddings or garden parties, offering a unique texture and a sophisticated color palette.',
    fabric: 'Wool-Linen Blend',
    colors: ['Sage Green', 'Olive'],
    tags: ['Trending', 'Party Wear'],
    style: '2-piece'
  },
  {
    id: 'suit-06',
    gender: 'men',
    name: 'Midnight Velvet Peak',
    category: 'suiting',
    price: 13000,
    image: [productMenSuit6, productMenSuit1, productMenSuit3, productMenSuit10],
    description: 'Sumptuous midnight blue velvet for ultimate luxury.',
    longDescription: 'For those who want to make a statement. Our premium velvet is incredibly soft to the touch and offers a depth of color that is simply unmatched.',
    fabric: 'Premium Cotton Velvet',
    colors: ['Midnight Blue', 'Deep Maroon'],
    tags: ['Party Wear', 'Premium'],
    style: '2-piece'
  },
  {
    id: 'suit-07',
    gender: 'men',
    name: 'Checkered Executive Grey',
    category: 'suiting',
    price: 7200,
    image: [productMenSuit7, productMenSuit2, productMenSuit4, productMenSuit1],
    description: 'Subtle Glen check pattern for a powerful office look.',
    longDescription: 'Command the boardroom with this classic Glen check pattern. Professional, sharp, and timelessly elegant.',
    fabric: 'Super 100s Wool',
    colors: ['Grey Check', 'Blue Check'],
    tags: ['Formal'],
    style: '3-piece'
  },
  {
    id: 'suit-08',
    gender: 'men',
    name: 'Burgundy Celebration',
    category: 'suiting',
    price: 8900,
    image: [productMenSuit8, productMenSuit1, productMenSuit9, productMenSuit2],
    description: 'Rich burgundy wool designed for celebrations.',
    longDescription: 'Stand out from the crowd with this rich, warm burgundy. A favorite for wedding guests and celebration hosts alike.',
    fabric: 'Wool-Silk Blend',
    colors: ['Burgundy', 'Wine'],
    tags: ['Wedding', 'Party Wear'],
    style: '2-piece'
  },
  // Women's Suiting Collection
  {
    id: 'suit-w-01',
    gender: 'women',
    name: 'Silk Blend Power Blazer',
    category: 'suiting',
    price: 9500,
    image: [productWomenSuit1, productWomenSuit3, productWomenSuit6, productWomenSuit7],
    isNew: true,
    description: 'A sharp, tailored blazer in premium silk blend for the modern woman.',
    longDescription: 'Command attention with this meticulously tailored power blazer. Featuring a slim fit, peak lapels, and a luxurious silk-blend fabric that offers both comfort and structure. Perfect for high-profile business meetings or elegant evening events.',
    fabric: 'Silk-Wool Blend',
    colors: ['Champagne', 'Ivory', 'Midnight Black'],
    tags: ['Trending', 'Formal', 'Premium'],
    style: 'Blazer'
  },
  {
    id: 'suit-w-02',
    gender: 'women',
    name: 'Emerald Velvet Pantsuit',
    category: 'suiting',
    price: 12000,
    image: [productWomenSuit2, productWomenSuit1, productWomenSuit3, productWomenSuit6],
    isNew: true,
    description: 'Stunning emerald green velvet pantsuit for gala evennings.',
    longDescription: 'This emerald green velvet pantsuit is the epitome of luxury. The rich color and plush texture make it a standout choice for winter weddings or red-carpet events. Includes a tailored blazer and wide-leg trousers.',
    fabric: 'Italian Velvet',
    colors: ['Emerald Green', 'Deep Wine'],
    tags: ['Party Wear', 'Wedding', 'Premium'],
    style: '2-piece'
  },
  {
    id: 'suit-w-03',
    gender: 'women',
    name: 'Classic White Tuxedo Suit',
    category: 'suiting',
    price: 10500,
    image: [productWomenSuit3, productWomenSuit3, productWomenSuit5, productWomenSuit6],
    description: 'Crisp white tuxedo suit with satin lapels.',
    longDescription: 'A feminine take on the classic tuxedo. This crisp white suit features elegant satin lapels and a tailored fit that celebrates the silhouette. An iconic choice for rehearsal dinners or modern brides.',
    fabric: 'Premium Crepe',
    colors: ['Bridal White', 'Off-White'],
    tags: ['Wedding', 'Formal', 'Trending'],
    style: '2-piece'
  },
  {
    id: 'suit-w-04',
    gender: 'women',
    name: 'Midnight Sequin Blazer',
    category: 'suiting',
    price: 8800,
    image: [productWomenSuit6, productWomenSuit1, productWomenSuit5, productWomenSuit7],
    description: 'Shimmering sequin-detailed blazer for party nights.',
    longDescription: 'Add a touch of sparkle to your wardrobe with this midnight blue sequin blazer. Subtly shimmering under the lights, it adds instant glam to any evening look.',
    fabric: 'Sequin Wool Blend',
    colors: ['Midnight Blue', 'Black'],
    tags: ['Party Wear', 'Trending'],
    style: 'Blazer'
  },
  // Shirting
  {
    id: 'shirt-01',
    gender: 'men',
    name: 'Egyptian Cotton White',
    category: 'shirting',
    price: 2200,
    image: [productWomenSuit2, productWomenSuit4, productWomenSuit5, productWomenSuit7],
    isNew: true,
    description: 'Pure Egyptian cotton for crisp formal shirts',
    fabric: '100% Egyptian Cotton',
    colors: ['White', 'Ivory'],
    tags: ['Formal', 'Premium']
  },
  {
    id: 'shirt-02',
    gender: 'men',
    name: 'Oxford Blue',
    category: 'shirting',
    price: 1800,
    image: [productShirt2, productShirt1],
    isNew: true,
    description: 'Classic oxford weave in sky blue',
    fabric: '100% Cotton Oxford',
    colors: ['Sky Blue', 'White'],
    tags: ['Trending', 'Formal']
  },
  {
    id: 'shirt-03',
    gender: 'men',
    name: 'Pinpoint Dress Shirt',
    category: 'shirting',
    price: 2500,
    image: ['/placeholder.svg'],
    description: 'Fine pinpoint cotton for formal occasions',
    fabric: '100% Cotton',
    colors: ['White', 'Light Blue', 'Pink'],
    tags: ['Formal']
  },
  {
    id: 'shirt-04',
    gender: 'men',
    name: 'Linen Summer Blend',
    category: 'shirting',
    price: 1900,
    image: ['/placeholder.svg'],
    description: 'Cool linen-cotton for casual elegance',
    fabric: '60% Linen 40% Cotton',
    colors: ['White', 'Beige'],
    tags: ['Trending', 'Party Wear']
  },

  // Wedding & Sherwani
  {
    id: 'wedding-01',
    gender: 'men',
    name: 'Golden Brocade',
    category: 'wedding-sherwani',
    price: 15000,
    image: [productWedding1, productWedding2],
    isNew: true,
    description: 'Luxurious gold brocade for wedding sherwani',
    fabric: 'Silk Brocade',
    colors: ['Gold', 'Cream'],
    tags: ['Wedding', 'Festival', 'Premium']
  },
  {
    id: 'wedding-02',
    gender: 'men',
    name: 'Ivory Silk Sherwani',
    category: 'wedding-sherwani',
    price: 12500,
    image: [productWedding1, productMenSuit1],
    isNew: true,
    description: 'Pure silk fabric with subtle embroidery',
    fabric: '100% Silk',
    colors: ['Ivory', 'Off-White'],
    tags: ['Wedding', 'Formal']
  },
  {
    id: 'wedding-03',
    gender: 'men',
    name: 'Maroon Velvet Groomwear',
    category: 'wedding-sherwani',
    price: 18000,
    image: [productWedding2, productWedding1],
    description: 'Rich velvet fabric for royal look',
    fabric: 'Silk Velvet',
    colors: ['Maroon', 'Wine'],
    tags: ['Wedding', 'Party Wear', 'Premium']
  },
  {
    id: 'wedding-04',
    gender: 'men',
    name: 'Champagne Embroidered',
    category: 'wedding-sherwani',
    price: 16500,
    image: [productWedding1, productMenSuit3],
    description: 'Elegant champagne with gold thread work',
    fabric: 'Silk Blend',
    colors: ['Champagne', 'Gold'],
    tags: ['Wedding', 'Festival']
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category === category);
};

export const getNewArrivals = () => {
  return products.filter(p => p.isNew);
};

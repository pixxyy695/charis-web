import { Product } from "@/types";

export const PRODUCT_IMAGE_FALLBACK = "/products/gift-placeholder.svg";

const PRODUCT_IMAGE_BY_NAME: Record<string, string> = {
  "Meridian Rose Gold Wristwatch": "/products/meridian-rose-gold-wristwatch.jpg",
  "Atelier Cashmere Wrap": "/products/atelier-cashmere-wrap.jpg",
  "Lumen Hand-Blown Decanter": "/products/lumen-hand-blown-decanter.jpg",
  "Encre Fountain Pen, Burgundy Resin": "/products/encre-fountain-pen.jpg",
  "Nocturne Silk Eye Mask & Robe Set": "/products/nocturne-silk-eye-mask-robe-set.jpg",
  "Ember Leather Travel Journal": "/products/ember-leather-travel-journal.jpg",
  "Solstice Diamond Pendant": "/products/solstice-diamond-pendant.jpg",
  "Terroir Reserve Wine Trio": "/products/terroir-reserve-wine-trio.jpg",
  "Argent Cufflinks, Hand-Engraved": "/products/argent-cufflinks.jpg",
  "Velours Weekender Bag": "/products/velours-weekender-bag.jpg",
  "Ambre Nuit Fragrance": "/products/ambre-nuit-fragrance.jpg",
  "Heirloom Backgammon Set": "/products/heirloom-backgammon-set.jpg",
  "Porcelaine Tea Ceremony Set": "/products/porcelaine-tea-ceremony-set.jpg",
  "Obsidian Chess Set": "/products/obsidian-chess-set.jpg",
  "Cachemire Baby Blanket": "/products/cachemire-baby-blanket.jpg",
  "Atlas Star Map, Custom Coordinates": "/products/atlas-star-map.jpg",
  "Noir Leather Desk Set": "/products/noir-leather-desk-set.jpg",
  "Golden Hour Photography Print Series": "/products/golden-hour-photography-prints.jpg",
  "Reverie Music Box, Hand-Wound": "/products/reverie-music-box.jpg",
  "Sable Hair Art Brush Set": "/products/sable-hair-art-brush-set.jpg",
  "Champagne Sabre, Engraved": "/products/champagne-sabre.jpg",
  "Terra Ceramic Vase Trio": "/products/terra-ceramic-vase-trio.jpg",
  "Aurora Pearl Drop Earrings": "/products/aurora-pearl-drop-earrings.jpg",
  "Cartographer's Globe, Antique Brass": "/products/cartographers-globe.jpg",
  "Cocoon Cashmere Throw": "/products/cocoon-cashmere-throw.jpg",
  "Meridian Whiskey Decanter Set": "/products/meridian-whiskey-decanter-set.jpg",
  "Signet Ring, Hand-Engraved": "/products/signet-ring.jpg",
  "Botanical Candle Trio": "/products/botanical-candle-trio.jpg",
  "Grand Tour Leather Passport Set": "/products/grand-tour-leather-passport-set.jpg",
  "Heritage Wool Throw Pillow Pair": "/products/heritage-wool-throw-pillows.jpg",
  "Atelier Sketchbook & Graphite Set": "/products/atelier-sketchbook-graphite-set.jpg",
  "Vintage-Inspired Compass, Brass": "/products/vintage-brass-compass.jpg",
  "Silk Bow Tie & Pocket Square Set": "/products/silk-bow-tie-pocket-square-set.jpg",
  "Midnight Library Book Set": "/products/midnight-library-book-set.jpg",
  "Hand-Forged Garden Tool Set": "/products/hand-forged-garden-tool-set.jpg",
};

export function getProductImage(product: Pick<Product, "name" | "images">): string {
  const curatedImage = PRODUCT_IMAGE_BY_NAME[product.name];
  if (curatedImage) return curatedImage;

  const suppliedImage = product.images?.find(
    (image) => image.trim().length > 0 && !image.includes("picsum.photos"),
  );

  return suppliedImage || PRODUCT_IMAGE_FALLBACK;
}

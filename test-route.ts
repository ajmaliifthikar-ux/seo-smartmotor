import { adminGetAllBrands } from './src/lib/firebase-admin';

async function main() {
  const brands = await adminGetAllBrands();
  const slug = 'bmw';
  const brand = brands.find(b => (b.slug || b.id) === slug);
  console.log("Brand found for bmw:", brand ? 'yes' : 'no');
  
  const notFoundBrand = brands.find(b => (b.slug || b.id) === 'does-not-exist');
  console.log("Brand found for fake:", notFoundBrand ? 'yes' : 'no');
  process.exit(0);
}

main().catch(console.error);

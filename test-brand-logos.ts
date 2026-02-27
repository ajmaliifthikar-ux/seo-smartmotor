import { adminGetAllBrands } from './src/lib/firebase-admin';

async function main() {
  const brands = await adminGetAllBrands();
  console.log(brands.map(b => `${b.name} (${b.slug || b.id}) -> ${b.logoUrl}`));
  process.exit(0);
}

main().catch(console.error);

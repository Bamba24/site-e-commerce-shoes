

import ProductPage from '../components/productPage';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  return <ProductPage params={{ slug }} />;
}

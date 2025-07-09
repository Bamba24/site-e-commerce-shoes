import ProductPage from '../components/productPage';

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return <ProductPage params={{ slug }} />;
}

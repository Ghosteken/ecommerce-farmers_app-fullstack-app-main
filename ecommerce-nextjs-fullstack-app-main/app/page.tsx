import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 6,
  });

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Hero Section */}
      <section className="rounded-lg bg-gray-100 py-12 px-8 md:flex md:items-center md:justify-between">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to Farmers' Market
          </h1>
          <p className="mt-4 text-gray-700">
            Discover the latest products at unbeatable prices.
          </p>
          <Button asChild variant="default" className="mt-6 bg-black text-white">
            <Link href="/products">Browse All Products</Link>
          </Button>
        </div>
        <div className="mt-6 md:mt-0">
          <Image
            alt="Featured Product"
            src={products.data[0]?.images[0] || "/placeholder.jpg"}
            className="rounded-lg shadow-lg"
            width={450}
            height={450}
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.data.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
              <Image
                src={product.images[0] || "/placeholder.jpg"}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-md"
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <Button asChild variant="outline" className="mt-2 w-full">
                <Link href="/products">View Details</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Product Carousel */}
      <section className="py-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Trending Now
        </h2>
        <Carousel products={products.data} />
      </section>
    </div>
  );
}

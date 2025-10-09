import EcommerceInfo from "@/components/EcommerceInfo";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroBanner from "@/components/HeroBanner";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <HeroBanner />
        </div>
        <div className="flex flex-col">
          <FeaturedProducts />
        </div>
        <div className="flex flex-col">
          <EcommerceInfo />
        </div>
      </div>
    </>
  );
}

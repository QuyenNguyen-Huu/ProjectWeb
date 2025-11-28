import Collections from "@/features/home/Collections/Collections";
import BrandBanner from "@/features/home/HomeBanner/BrandBanner";
import MainBanner from "@/features/home/HomeBanner/MainBanner";
import FeaturedProducts from "@/features/home/Products/FeatureProducts/FeaturedProducts";
import SaleProducts from "@/features/home/Products/SaleProducts/SaleProducts";
import RecommendedProducts from "@/features/home/Products/RecommendedProducts/RecommendedProducts";
import PolicySection from "@/features/home/PolicySection";
import useIsDesktop from "@/hooks/useIsDesktop";

export default function HomePage() {
  const isDesktop = useIsDesktop();
  return (
    <div className={`${isDesktop ? 'mt-[80px]' : 'mt-[54px]'}`}>
      <MainBanner />
      <BrandBanner />
      <FeaturedProducts />
      <RecommendedProducts />
      <SaleProducts />
      <Collections />
      <PolicySection />
    </div>
  );
}

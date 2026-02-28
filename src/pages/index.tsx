import Categories from "../components/Categories";
import HeroSlider from "../components/HeroSlider";
import NewsletterSection from "../components/NewsletterSection";
import Services from "../components/ServicesSection";
import TopDealsToday from "../components/TopDealsToday";

const HomePage = () => {
  return (
    <div>
      <Categories />
      <HeroSlider />
      <Services />
      <TopDealsToday />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;

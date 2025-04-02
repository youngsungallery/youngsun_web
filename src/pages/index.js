import Exhibitions_Artwork from "@/components/Exhibitions_Artwork";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Home from "@/components/Home";

const IndexPage = () => {
    return (
      <div>
        <Header />
        <Home />
        <Exhibitions_Artwork/>
        <Footer />
      </div>
    );
  }
  
  export default IndexPage;
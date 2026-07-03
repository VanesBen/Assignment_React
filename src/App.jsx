
import heroImg from '../src/assets/images/hero-img.png'
import Navbar from './components/general/Navbar'
import Footer from './components/general/Footer'

import categoryImg1 from './assets/images/carousel-1-img.png'
import categoryImg2 from './assets/images/carousel-2-img.png'
import categoryImg3 from './assets/images/carousel-3-img.png'
import categoryImg4 from './assets/images/carousel-4-img.png'
import categoryImg5 from './assets/images/carousel-5-img.png'
import Card from './components/landing_page/Card'

import featuredImg from './assets/images/featured-img.png'
import Button from './components/general/Button'

import trendingImg1 from './assets/images/trending-1-img.png'
import trendingImg2 from './assets/images/trending-2-img.png'
import trendingImg3 from './assets/images/trending-3-img.png'
import trendingImg4 from './assets/images/trending-4-img.png'


function App() {

  const categoryList = [
    {
      imgUrl: categoryImg1,
      title: 'Productivity',
      description: 'Boost your efficiency with AI-powered productivity tools.',
      alt: 'productivity'
    },
    {
      imgUrl: categoryImg2,
      title: 'Marketing',
      description: 'Enhance your marketing strategies with AI-driven insights.',
      alt: 'marketing'
    },
    {
      imgUrl: categoryImg3,
      title: 'Code',
      description: 'Accelerate your coding with intelligent AI assistants.',
      alt: 'code'
    },
    {
      imgUrl: categoryImg4,
      title: 'Design',
      description: 'Unleash your creativity with AI-enhanced design tools.',
      alt: 'design'
    },
    {
      imgUrl: categoryImg5,
      title: 'AI Tools',
      description: 'Explore a wide range of innovative AI tools for various applications.',
      alt: 'ai tools'
    }
  ]

  const trendingList = [
    {
      imgUrl: trendingImg1,
      title: 'AI Writing Assistant',
      description: 'Generate high-quality content effortlessly with this AI writing assistant.',
      alt: 'ai writng book'
    },
    {
      imgUrl: trendingImg2,
      title: 'AI Image Generator',
      description: 'Create stunning visuals with the power of AI image generation.',
      alt: 'ai image generator'
    },
    {
      imgUrl: trendingImg3,
      title: 'AI Data Analysis Tool',
      description: 'Analyze complex data sets and gain valuable insights with this AI tool.</',
      alt: 'ai data analysis'
    },
    {
      imgUrl: trendingImg4,
      title: 'AI Customer Support',
      description: 'Enhance your customer service with AI-powered support solutions.',
      alt: 'ai customer support'
    },
  ]

  return (
    <>
    <Navbar/>

    <section
      style={{ backgroundImage: `url(${heroImg})` }}
      className="mb-10 bg-cover bg-no-repeat auto-layout h-150 md:bg-center relative mt-5 mx-6 lg:mx-50" id="hero"
    >
        <div className="absolute top-[50%] translate-y-[-50%] text-center flex flex-col justify-center items-center gap-4 text-white md:w-full  md:left-[50%] md:translate-x-[-50%]">
            <h1 className="font-bold text-4xl lg:text-6xl">Discover the Future of Work with AI</h1>
            <p className="text-s lg:text-2xl">Explore a curated marketplace of AI-powered tools designed to transform your workflow and unlock new possibilities.</p>
        </div>
    </section>

    <section className="mb-10 md:bg-center mt-5 mx-6 lg:mx-50" id="category">
        <h1 className="font-black text-2xl">Categories</h1>
        <div className='flex gap-5 overflow-x-auto overflow-y-hidden w-full pb-5 scrollbar-thumb-smoke'>
            {
              categoryList.map((category) => {
                return (
                  <Card type="category" title={category.title} imgUrl={category.imgUrl} description={category.description} alt={category.alt}/>
                )
              })
            }
        </div>
    </section>

    <section className="mb-10 md:bg-center mt-5 mx-6 lg:mx-50" id="featured">
        <h1 className="font-black text-2xl">Featured Product</h1>
        <div className="flex items-center gap-5 w-full mt-5">
            <img className="w-60 h-76 md:h-100 md:w-auto" src={featuredImg} alt="featured"/>
            <div className="self-start mt-8">
                <h3 className="text-xl font-bold mb-5">Top Rated AI Tool</h3>
                <p className="text-[1rem] w-40 lg:w-95 text-wrap mb-5 text-smoke ">Revolutionize your workflow with this highly-rated AI tool. Experience unparalleled efficiency and innovation.</p>
                <Button title="Learn More" />
            </div>
        </div>
    </section>

    <section className="mb-10 h-150 md:bg-center mx-6 lg:mx-50" id="trending">
        <h1 className="font-black text-2xl">Trending</h1>
        <div className='flex gap-5 overflow-x-auto overflow-y-hidden w-full pb-5 scrollbar-thumb-smoke'>
           {
            trendingList.map((trending)=> {
              return (
                <Card type="trending" title={trending.title} imgUrl={trending.imgUrl} description={trending.description} alt={trending.alt} />
              )
            })
           }
        </div>
    </section>

    
    <Footer />
    </>
  )
}

export default App

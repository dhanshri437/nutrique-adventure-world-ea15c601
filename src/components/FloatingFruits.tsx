import appleImg from "@/assets/fruit-apple.png";
import bananaImg from "@/assets/fruit-banana.png";
import orangeImg from "@/assets/fruit-orange.png";
import strawberryImg from "@/assets/fruit-strawberry.png";
import watermelonImg from "@/assets/fruit-watermelon.png";

const fruits = [
  { src: appleImg, alt: "Apple", style: "top-[10%] left-[5%] w-16 md:w-20 animate-float" },
  { src: bananaImg, alt: "Banana", style: "top-[20%] right-[8%] w-14 md:w-18 animate-float-delayed" },
  { src: orangeImg, alt: "Orange", style: "bottom-[15%] left-[10%] w-12 md:w-16 animate-float-slow" },
  { src: strawberryImg, alt: "Strawberry", style: "top-[60%] right-[5%] w-14 md:w-16 animate-float" },
  { src: watermelonImg, alt: "Watermelon", style: "bottom-[30%] right-[15%] w-16 md:w-20 animate-float-delayed" },
  { src: appleImg, alt: "Apple", style: "top-[5%] left-[45%] w-10 md:w-14 animate-float-slow opacity-60" },
  { src: bananaImg, alt: "Banana", style: "bottom-[10%] left-[35%] w-12 md:w-14 animate-float opacity-50" },
];

const FloatingFruits = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {fruits.map((fruit, i) => (
        <img
          key={i}
          src={fruit.src}
          alt={fruit.alt}
          className={`absolute ${fruit.style} select-none`}
        />
      ))}
    </div>
  );
};

export default FloatingFruits;

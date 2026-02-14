// 'use client';

// import Link from 'next/link';
// import Navigation from '@/components/layout/Navigation';
// import Vertical3DCarousel from '@/components/ui/Vertical3DCarousel';
// import InteractiveMap from '@/components/ui/InteractiveMap';
// import SplashScreen from '@/components/ui/SplashScreen';

// export default function Home() {
//     const sections = [
//         {
//             id: 'hero',
//             label: 'Royal Arrival',
//             children: <InteractiveMap sceneId="baraat" />
//         },
//         {
//             id: 'haldi',
//             label: 'Garden Ceremony',
//             children: <InteractiveMap sceneId="haldi" />
//         },
//         {
//             id: 'cocktail',
//             label: 'Reception Party',
//             children: <InteractiveMap sceneId="cocktail" />
//         },
//         {
//             id: 'beach',
//             label: 'Beach Wedding',
//             children: <InteractiveMap sceneId="beach" />
//         }
//     ];

//     return (
//         <SplashScreen>
//             <Navigation />
//             <Vertical3DCarousel
//                 sections={sections}
//                 showNav={true}
//                 showIndicator={true}
//             />
//         </SplashScreen>
//     );
// }
'use client';
import { useState, useCallback, useEffect } from "react";
import RajasthanScene from "@/components/scenes/RajasthanScene";
import BeachScene from "@/components/scenes/BeachScene";
import CocktailScene from "@/components/scenes/CocktailScene";

import Navbar from "@/components/ui/Navbar";
import ComingSoon from "@/components/ui/ComingSoon";
import Footer from "@/components/layout/Footer";

const destinations = [
    {
        title: "Rajasthan Heritage Wedding",
        subtitle: "Royal Destination",
        description:
            "A grand celebration amidst heritage palaces — with a baraat procession, vintage cars, DJ on wheels, and guests dancing under the stars.",
        bgClass: "bg-cream",
    },
    {
        title: "Beach Wedding",
        subtitle: "Tropical Paradise",
        description:
            "Exchange vows on sun-kissed sands with ocean waves as your backdrop, a flower-adorned mandap, and a breathtaking sunset ceremony.",
        bgClass: "bg-background",
    },
    {
        title: "Cocktail Party",
        subtitle: "Glamorous Evening",
        description:
            "A stylish evening of clinking glasses, a curated cocktail bar, live music, and a dance floor that never stops.",
        bgClass: "bg-cream",
    },
];

const scenes = [RajasthanScene, BeachScene, CocktailScene];

const Index = () => {
    const [curtainDone, setCurtainDone] = useState(false);
    const handleCurtainComplete = useCallback(() => setCurtainDone(true), []);

    return (
        <div className="relative">
            {/* <CurtainAnimation onComplete={handleCurtainComplete} /> */}

            {/* {curtainDone && <Navbar />} */}

            <main>
                <ComingSoon />
                {/* <HeroSection />

        {destinations.map((dest, i) => {
          const Scene = scenes[i];
          return (
            <DestinationSection key={i} index={i} {...dest}>
              <Scene />
            </DestinationSection>
          );
        })} */}
            </main>

            {/* <Footer /> */}
        </div>
    );
};

export default Index;

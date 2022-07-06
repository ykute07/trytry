import { useRouter } from "next/router";
import Image from "next/image";
import Particles from "react-tsparticles";
import Head from "next/head";
import NearLogo from "../components/NearLogo";
import UAuth from "@uauth/js";
import '../pages/home.module.css'
import { useNear } from "../context/NearProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {

  const { setRedirect } = useNear();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState()
    
    const uauth = new UAuth(
      {
        clientID: "fc8af0b9-3722-4c5c-9621-27db0e4d0bc1",
        redirectUri:   "http://localhost:3000/",
        scope: "openid wallet email:optional humanity_check:optional"
      })
      

  
    useEffect(() => {
      setLoading(true)
      uauth
        .user()
        .then(setUser)
        .catch(() => {})
        .finally(() => setLoading(false))
    }, [])
  
    /*///////////////////////
    *   Login/out Functions
    *///////////////////////
    const handleLogin = async() => {
      setLoading(true)
      await uauth
        .loginWithPopup()
        .then(() => uauth.user().then(setUser))
        .catch((e)=>{console.log(e)})
        .finally(() => {setRedirect(false)})
        if(user){
          setRedirect(false);
          router.push("/")
        }
    }
  
  const particlesInit = (main) => {
    console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    console.log(container);
    setLoaded(true);
  };

  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center gap-2 w-screen h-screen max-w-screen max-h-screen text-white bg-dark"
    >
      <div className="absolute w-full h-full top-0 left-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#121212",
              },
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: "#ffffff",
              },
              move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: true,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 50,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                random: true,
                value: 5,
              },
            },
            detectRetina: false,
          }}
        />
      </div>
      <Head>
        <title>Dmusic3 | Listen Now</title>
        <meta
          name="description"
          content="A platform for listening and distributing music."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute flex flex-col items-center justify-center gap-2 w-screen h-screen max-w-screen max-h-screen top-0 left-0 z-10">
        <img
          className="w-64 h-64"
          src="/landing.gif"
          alt="Spinning White Fire GIF"
        />
        <h1 className="font-black text-5xl sm:text-6xl lg:text-8xl">
          Dmusic3
        </h1>
        <h3 className="font-extralight text-lg sm:text-xl lg:text-2xl">
          Decentralized High Definition Music
        </h3>
        <button className="login-btn positioned"
          onClick={         handleLogin
              
          }
        ><a>  
        <img
        src="/default-button.png"
        />
        </a>
          {/* <NearLogo /> <code>/explore</code> */}
        </button>
      </div>
    </motion.main>
  );
}

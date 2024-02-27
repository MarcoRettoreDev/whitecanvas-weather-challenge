import { useEffect, useState } from "react";
import { useAppStore } from "../context/appStore";
import { AnimatePresence, Variants, motion } from "framer-motion";
import errorIcon from "../assets/svg/error.svg";

const animationVariants: Variants = {
  initial: {
    y: -250,
  },
  animate: {
    y: 10,
  },
  exit: {
    y: -250,
  },
};

export const DisplayFetchError = () => {
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const isLocationError = useAppStore((state) => state.isLocationError);
  const isWeatherError = useAppStore((state) => state.isWeatherError);

  useEffect(() => {
    if (isLocationError || isWeatherError) {
      setShowComponent(!showComponent);
      setTimeout(() => {
        setShowComponent(false);
      }, 5000);
    }
  }, [isLocationError, isWeatherError]);

  return (
    <AnimatePresence>
      {showComponent && (
        <motion.div
          onClick={() => setShowComponent(false)}
          className="displayfetcherror"
          variants={animationVariants}
          initial="initial"
          animate="animate"
          exit="exit">
          <img src={errorIcon} alt="" className="displayfetcherror_icon" />
          <div className="displayfetcherror__text">
            <h3 className="displayfetcherror__text_title">
              Opps, there was an error
            </h3>
            <h4 className="displayfetcherror__text_description">
              please check your internet connection and try again
            </h4>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

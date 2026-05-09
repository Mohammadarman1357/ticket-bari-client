import React from 'react';
import loadingAnimation from '../../assets/json/loading.json';
import LottieComponent from "react-lottie";

// If LottieComponent is an object, use .default, otherwise use it directly
const Lottie = LottieComponent.default || LottieComponent;
// problem solve here

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-5">
            <div className="max-w-sm relative">
                <Lottie
                    options={{
                        animationData: loadingAnimation,
                        autoplay: true,
                        loop: true,
                    }}
                ></Lottie>
            </div>
        </div>
    );
};

export default Loading;
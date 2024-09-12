import React from "react";

export default function Sun() {
    return(
        <div id="sunOuter" className="absolute w-full h-full z-10 flex justify-center
        overflow-hidden">
            
            <div id="sunRay1" className="rounded-full w-64 h-64 inline-flex justify-center items-center
            bg-gradient-radial from-yellow-400 to-orange-600">
                <div id="sunRay2" className="rounded-full w-44 h-44 flex justify-center items-center
                bg-gradient-radial from-orange-600 to-yellow-400 shadow-inner shadow-yellow-400">
                    <div id="sunRay3" className="rounded-full w-32 h-32 flex justify-center items-center
                    bg-gradient-radial from-yellow-400 to-orange-600 shadow-inner shadow-orange-600">
                        <div id="sunCore" className="rounded-full w-14 h-14
                        bg-gradient-radial from-orange-600 to-yellow-400 "></div>
                    </div>
                </div>
            </div>

        </div>
    )
}
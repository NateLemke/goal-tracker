import React from "react";

export default function Sun() {
    return( 
            <div id="sunshine1" className="sm:w-96 sm:h-96 w-72 h-72 border border-yellow-400 absolute sm:-top-48 -top-36
            flex justify-center items-center rounded-full">
                <div id="sunRay1" className="rounded-full sm:w-60 sm:h-60 w-44 h-44 flex justify-center items-center
                bg-gradient-radial from-yellow-400 to-orange-600">
                    <div id="sunRay2" className="rounded-full sm:w-44 sm:h-44 w-32 h-32 flex justify-center items-center
                    bg-gradient-radial from-orange-600 to-yellow-400 shadow-inner shadow-yellow-400">
                        <div id="sunRay3" className="rounded-full sm:w-32 sm:h-32 w-14 h-14 flex justify-center items-center
                        bg-gradient-radial from-yellow-400 to-orange-600 shadow-inner shadow-orange-600">
                            <div id="sunCore" className="rounded-full sm:w-14 sm:h-14 w-10 h-10
                            bg-gradient-radial from-orange-600 to-yellow-400 "></div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
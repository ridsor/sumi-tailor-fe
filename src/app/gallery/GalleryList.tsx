"use client";

import { useEffect, useState } from "react";
import GalleryItem from "./GalleryItem";

const GalleryList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [firstImages, setFirstImages] = useState<number[]>([]);
  const [secondImages, setSecondImages] = useState<number[]>([]);
  const [thirdImages, setThirdImages] = useState<number[]>([]);
  const [fourthImages, setFourthImages] = useState<number[]>([]);
  const [fifthImages, setFifthImages] = useState<number[]>([]);
  const [screenSize, setScreenSize] = useState<
    null | "sm" | "md" | "lg" | "xl" | "2xl"
  >("sm");

  useEffect(() => {
    if (!loading && typeof window != "undefined") {
      const amount = 14;

      if (window.innerWidth >= 1280) {
        setScreenSize("xl");

        let tempArr = [];
        for (var k = 1; k <= amount; k++) {
          tempArr.push(k);
        }

        let result: number[][] = [];

        for (var j = 0; j < tempArr.length; j += 5) {
          var subarray = tempArr.slice(j, j + 5);
          result.push(subarray);
        }

        for (var i = 0; i < result.length; i++) {
          for (var j = 0; j < result[i].length; j++) {
            const value: number = result[i][j];
            if (j == 4) {
              setFifthImages((prev) => [...prev, value]);
            } else if (j == 3) {
              setFourthImages((prev) => [...prev, value]);
            } else if (j == 2) {
              setThirdImages((prev) => [...prev, value]);
            } else if (j == 1) {
              setSecondImages((prev) => [...prev, value]);
            } else {
              setFirstImages((prev) => [...prev, value]);
            }
          }
        }
      } else if (window.innerWidth >= 1024) {
        setScreenSize("lg");

        let tempArr = [];
        for (var k = 1; k <= amount; k++) {
          tempArr.push(k);
        }

        let result: number[][] = [];

        for (var j = 0; j < tempArr.length; j += 4) {
          var subarray = tempArr.slice(j, j + 4);
          result.push(subarray);
        }

        for (var i = 0; i < result.length; i++) {
          for (var j = 0; j < result[i].length; j++) {
            const value: number = result[i][j];
            if (j == 3) {
              setFourthImages((prev) => [...prev, value]);
            } else if (j == 2) {
              setThirdImages((prev) => [...prev, value]);
            } else if (j == 1) {
              setSecondImages((prev) => [...prev, value]);
            } else {
              setFirstImages((prev) => [...prev, value]);
            }
          }
        }
      } else if (window.innerWidth >= 768) {
        setScreenSize("md");

        let tempArr = [];
        for (var k = 1; k <= amount; k++) {
          tempArr.push(k);
        }

        let result: number[][] = [];

        for (var j = 0; j < tempArr.length; j += 3) {
          var subarray = tempArr.slice(j, j + 3);
          result.push(subarray);
        }

        for (var i = 0; i < result.length; i++) {
          for (var j = 0; j < result[i].length; j++) {
            const value: number = result[i][j];
            if (j == 2) {
              setThirdImages((prev) => [...prev, value]);
            } else if (j == 1) {
              setSecondImages((prev) => [...prev, value]);
            } else {
              setFirstImages((prev) => [...prev, value]);
            }
          }
        }
      } else {
        setScreenSize("sm");

        for (let i = 1; i <= amount; i++) {
          if (i % 2 === 0) {
            setSecondImages((prev) => [...prev, i]);
          } else {
            setFirstImages((prev) => [...prev, i]);
          }
        }
      }
    }

    setLoading(false);
  }, [loading]);

  return (
    <article className="flex gap-4 p-4 bg-three shadow-md rounded-xl">
      <div className="col flex flex-col gap-4 flex-1">
        {firstImages.map((n) => (
          <GalleryItem image={n} key={n} />
        ))}
      </div>
      <div className="col flex flex-col gap-4 flex-1">
        {secondImages.map((n) => (
          <GalleryItem image={n} key={n} />
        ))}
      </div>
      {(screenSize == "md" ||
        screenSize == "lg" ||
        screenSize == "xl" ||
        screenSize == "2xl") && (
        <>
          <div className="col flex flex-col gap-4 flex-1">
            {thirdImages.map((n) => (
              <GalleryItem image={n} key={n} />
            ))}
          </div>
          {(screenSize == "lg" ||
            screenSize == "xl" ||
            screenSize == "2xl") && (
            <>
              <div className="col flex flex-col gap-4 flex-1">
                {fourthImages.map((n) => (
                  <GalleryItem image={n} key={n} />
                ))}
              </div>
              {(screenSize == "xl" || screenSize == "2xl") && (
                <div className="col flex flex-col gap-4 flex-1">
                  {fifthImages.map((n) => (
                    <GalleryItem image={n} key={n} />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </article>
  );
};

export default GalleryList;

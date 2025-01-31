import React, { useEffect, useState } from "react";

type ImageWithFrameProps = {
  src: string;
};

const ImageWithFrame: React.FC<ImageWithFrameProps> = ({ src }) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    setBlink(true);
    const timer = setTimeout(() => setBlink(false), 200);
    return () => clearTimeout(timer);
  }, [src]);

  return (
    <div
      className={`inline-block transition-all ${blink ? "border-4 border-blue-500" : ""} max-w-md`}
      style={{ maxHeight: "400px", overflow: "hidden" }}
    >
      <img src={src} alt="Dog" className="h-auto max-w-full rounded shadow" />
    </div>
  );
};

export default ImageWithFrame;

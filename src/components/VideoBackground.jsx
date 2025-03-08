import React from 'react';
import { motion } from 'framer-motion';

const VideoBackground = ({ videoUrl, fallbackImage }) => {
  return (
    <div className="video-background">
      <motion.video
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10 }}
        autoPlay
        muted
        loop
        playsInline
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        <img src={fallbackImage} alt="Background" />
      </motion.video>
    </div>
  );
};

export default VideoBackground;

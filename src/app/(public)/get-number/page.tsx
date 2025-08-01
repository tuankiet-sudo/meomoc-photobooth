'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const LOGO_SRC = '/Logo.png'; // Your logo file
const NAME_SRC = '/Name.png'; // Your name image file

export default function GetNumberPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/get-number/step-1');
  };

  // Animation keyframes and transition config (re-use for all blocks)
  const animation = {
    scale: [0, 1.1, 1.0, 1.0, 1.1, 0, 0],
    opacity: [0.5, 1, 1, 1, 1, 0.5, 0.5],
  };
  const transition = (delay: number) => ({
    duration: 4.0,
    times: [0, 0.07, 0.18, 0.82, 0.93, 0.97, 1],
    repeat: Infinity,
    repeatType: 'loop',
    ease: 'easeInOut',
    delay,
  });

  return (
    <Box
      onClick={handleClick}
      sx={{
        height: '100dvh',
        width: '100vw',
        overflow: 'hidden',
        bgcolor: '#eaddc1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {/* Main content with vertical spacing */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 2, sm: 4, md: 6 },
          mt: { xs: 2, md: 6 },
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={animation}
          transition={{
            duration: 4.0,
            times: [0, 0.07, 0.18, 0.82, 0.93, 0.97, 1],
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 0.33,
          }}
        >
          <Box
            sx={{
              width: { xs: 110, sm: 150, md: 210 },
              height: { xs: 110, sm: 150, md: 210 },
              position: 'relative',
            }}
          >
            <Image
              src={LOGO_SRC}
              alt="MeoMoc Logo"
              fill
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0px 2px 0px #a07452a8)',
                background: 'none',
              }}
              priority
              sizes="(max-width: 600px) 110px, (max-width: 900px) 150px, 210px"
            />
          </Box>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={animation}
          transition={{
            duration: 4.0,
            times: [0, 0.07, 0.18, 0.82, 0.93, 0.97, 1],
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 0.17,
          }}        >
          <Box
            sx={{
              width: { xs: 200, sm: 260, md: 320 },
              height: { xs: 40, sm: 52, md: 62 },
              position: 'relative',
            }}
          >
            <Image
              src={NAME_SRC}
              alt="MeoMoc Name"
              fill
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0px 2px 0px #a07452a8)',
                background: 'none',
              }}
              priority
              sizes="(max-width: 600px) 200px, (max-width: 900px) 260px, 320px"
            />
          </Box>
        </motion.div>

        {/* Main English text */}
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={animation}
          transition={{
            duration: 4.0,
            times: [0, 0.07, 0.18, 0.82, 0.93, 0.97, 1],
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 0,
          }}
          style={{ textAlign: 'center', marginBottom: 0, marginTop: 0 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Paytone One", Arial, sans-serif',
              color: '#9e1715',
              fontWeight: 900,
              fontSize: { xs: 40, sm: 56, md: 70 },
              letterSpacing: 1.5,
              lineHeight: 1.1,
              textShadow:
                '3px 5px 0 #fff4, 4px 7px 0 #a8746a, 0px 2px 1px #6c2012, 1px 1px 0 #d7bbb3',
              mb: 0,
              px: 2,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            TOUCH TO START
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Paytone One", Arial, sans-serif',
              color: '#9e1715',
              fontWeight: 900,
              fontSize: { xs: 34, sm: 48 },
              letterSpacing: 1.3,
              lineHeight: 1.08,
              textShadow:
                '2px 4px 0 #fff4, 2px 5px 0 #a8746a, 0px 2px 1px #6c2012, 1px 1px 0 #d7bbb3',
              mb: 0,
              px: 2,
              display: { xs: 'block', sm: 'none' },
            }}
          >
            TOUCH<br />TO START
          </Typography>
        </motion.div>

        {/* Vietnamese subtitle */}
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={animation}
          transition={{
            duration: 4.0,
            times: [0, 0.07, 0.18, 0.82, 0.93, 0.97, 1],
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 0.49,
          }}
          style={{ textAlign: 'center', marginBottom: 0, marginTop: 0 }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Lora", Arial, sans-serif',
              fontWeight: 900,
              color: '#451914',
              fontSize: { xs: 22, md: 36 },
              letterSpacing: 0.5,
              textShadow: '0px 2px 0 #f6ebd3',
              mb: 0,
            }}
          >
            Chạm để bắt đầu chụp
          </Typography>
        </motion.div>
      </Box>

      {/* Footer at the end */}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: { xs: 2, md: 5 },
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={animation}
          transition={{
            duration: 4.0,
            times: [0, 0.07, 0.18, 0.82, 0.93, 0.97, 1],
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: 0.65,
          }}
          style={{ width: '100%', textAlign: 'center' }}
        >
          <Typography
            sx={{
              color: '#70432d',
              fontWeight: 700,
              fontSize: { xs: 16, md: 21 },
              fontFamily: 'Lora, serif',
              letterSpacing: 1,
            }}
          >
            #PhotoBooth Retro
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
}

const fs = require('fs');
const execSync = require('child_process').execSync;

const plugins = [];

// Function to check if npm is available
function checkNpmExists() {
  try {
    execSync('npm -v', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function getGlobalNodeModulesPath() {
  const npmRoot = execSync('npm root -g').toString().trim();
  return npmRoot;
}

// Check if npm exists and if we're in development mode
if (checkNpmExists() && (process.env.TAILWIND_ENV === 'development' || process.env.TAILWIND_ENV === undefined)) {
  // Assuming the plugin is installed locally in the project
  const debugScreensPluginPath = getGlobalNodeModulesPath() + '/tailwindcss-debug-screens';
  // Check if the plugin exists in the local node_modules
  if (fs.existsSync(debugScreensPluginPath)) {
    const debugScreensPlugin = require(debugScreensPluginPath);
    plugins.push(debugScreensPlugin);
  } else {
    console.log('Hint: tailwindcss-debug-screens plugin is not installed, run `npm install -g tailwindcss-debug-screens` to use the debug screens plugin');
  }
} else if (!checkNpmExists()) {
  console.log('Hint: npm is not available, please install npm to use the debug screens plugin');
} else {
  console.log('Hint: in production mode, debug screens plugin is not enabled');
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './html/**/*.html',  // Include all HTML files in the 'html' folder and its nested folders
    './html/style/**/*.css' // Include all CSS files in the 'html/style' folder and its nested folders
  ],
  theme: {
    extend: {
      backgroundColor: {
        'modal-black-50': 'rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        'inherit': 'inherit',
        '5/5': '100%',
      },
      height: {
        'inherit': 'inherit',
      },
      transitionProperty: {
        'height': 'height',
      },
      //add font Montserrat
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        mono: ["monospace"],
      },
      spacing: {
        '80%': '80%',
        '70%': '70%',
        '60%': '60%',
        '50%': '50%',
        '56.25%': '56.25%',//16:9
        '40%': '40%',
        '30%': '30%',
        '20%': '20%',
        '10%': '10%',
        '5%': '5%',
        '4%': '4%',
        '3%': '3%',
        '2%': '2%',
        '1%': '1%',
      },
      minHeight: {
        '128': '32rem',
      }
    },
    colors: {
      website: {
        bg: "#F3F3F3",
      },
      transparent: "transparent",
      primary: {
        hover: "rgba(1, 115, 163, 1)",
      },
      accent: {
        hover: "rgba(58, 142, 177, 1)",
      },
      highcontrast: {
        hover: "rgba(0, 159, 193, 1)",
      },
      quorum: {
        blue: {
          150: "rgba(18, 90, 119, 1)",
          100: "rgba(6, 149, 208, 1)",
          50: "rgba(117, 189, 219, 1)",
          25: "rgba(172, 209, 223, 1)",
          10: "rgba(238, 250, 254, 1)",
        },
      },
      neutral: {
        black: "rgba(0, 0, 0, 1)",
        grey: {
          95: "rgba(32, 32, 32, 1)",
          85: "rgba(43, 43, 43, 1)",
          75: "rgba(54, 54, 55, 1)",
          65: "rgba(64, 64, 64, 1)",
          50: "rgba(101, 101, 101, 1)",
          40: "rgba(114, 114, 114, 1)",
          25: "rgba(215, 215, 215, 1)",
          15: "rgba(229, 230, 230, 1)",
          10: "rgba(246, 246, 247, 1)",
        },
        white: "rgba(255, 255, 255, 1)",
      },
      text: {
        neutral: {
          black: "rgba(0, 0, 0, 1)",
          grey: {
            95: "rgba(32, 32, 32, 1)",
            10: "rgba(246, 246, 247, 1)",
          },
          white: "rgba(255, 255, 255, 1)",
        },
        hico: {
          red: "rgba(190, 11, 0, 1)",
          blue: "rgba(58, 220, 255, 1)",
          yellow: "rgba(255, 230, 0, 1)",
          orange: "rgba(255, 168, 0, 1)",
          green: "rgba(0, 255, 148, 1)",
          pink: "rgba(254, 124, 217, 1)",
          gray: "rgba(229, 230, 230, 1)",
        },
        dark: {
          green: "rgba(175, 254, 217, 1)",
          yellow: "rgba(255, 244, 149, 1)",
          blue: "rgba(172, 209, 223, 1)",
          pink: "rgba(249, 161, 198, 1)",
          orange: "rgba(249, 161, 198, 1)",
          gray: "rgba(173, 173, 173, 1)",
          purple: "rgba(215, 154, 253, 1)",
        },
        light: {
          purple: "rgba(130, 0, 101, 1)",
          blue: "rgba(16, 69, 172, 1)",
          pink: "rgba(204, 5, 55, 1)",
          orange: "rgba(157, 75, 0, 1)",
          green: "rgba(41, 116, 6, 1)",
          red: "rgba(107,0,0,1)",
          gray: "rgba(101, 101, 101, 1)",
        },
      },
      secondary: {
        red: {
          100: "rgba(148, 9, 1, 1)",
          50: "rgba(188, 118, 114, 1)",
        },
        orange: "rgba(255, 136, 17, 1)",
        green: "rgba(5, 134, 45, 1)",
        hover: {
          grey: "rgba(199, 197, 197, 1)",
          red: "rgba(115, 7, 1, 1)",
        },
      },
      attention: {
        red: {
          25: "rgba(255, 116, 116, 1)",
          100: "rgba(255, 0, 0, 1)",
        },
      },
      header: {
        green: {
          100: "rgba(50, 148, 65, 1)",
        },
        purple: {
          100: "rgba(33, 30, 147, 1)",
        },
        yellow: {
          100: "rgba(228, 184, 25)",
        },
      },
    },
  },
  plugins: plugins,
}


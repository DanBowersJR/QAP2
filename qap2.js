// Name: Daniel Bowers
// Date: 08-23-2024
// Description: QAP2

// 1)
function snake(value) {
  var str = value
    .replace(/^\s*/, "")
    .replace(/\s*$/, "")
    .replace(/[\s.]+/g, "_")
    .toLowerCase();
  return str;
}
console.log(snake("abc")); // --> returns 'abc'
console.log(snake(" ABC ")); // --> returns 'abc'
console.log(snake("ABC")); //--> returns 'abc'
console.log(snake("A BC")); //--> returns 'a_bc'
console.log(snake(" A bC  ")); //--> returns 'a-bc'
console.log(snake("A   BC")); //--> returns 'a_bc'
console.log(snake("A.BC")); //--> returns 'a_bc'
console.log(snake(" A..  B   C ")); //--> returns 'a_b_c'

// 2)
function createVideo(src, width, controls) {
  var str = `<video src="${src}"`;
  var width = parseInt(width, 10);
  if (width > 0) {
    str += ` width="${width}"`;
  }
  if (controls) {
    str += ` controls`;
  }
  return (str += `></video>`);
}
console.log(
  createVideo(
    "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4",
    500
  )
);
console.log(
  createVideo(
    "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4",
    500,
    true
  )
);

// 3)

function parseDateString(str) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    throw new Error("Invalid date");
  }
  let newStr = str.split("-");
  let year = newStr[0];
  let month = newStr[1];
  let day = newStr[2];
  let newDate = new Date();
  newDate.setFullYear(year);
  newDate.setMonth(month - 1);
  newDate.setDate(day);
  return newDate;
}
console.log(parseDateString("2024-06-13"));

// 4)

function toDateString(dt) {
  try {
    let year = dt.getFullYear();
    let month = `${dt.getMonth() + 1}`.padStart(2, "0");
    let date = `${dt.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${date}`;
  } catch (error) {
    throw new Error("Invalid date");
  }
}
console.log(toDateString(new Date(2024, 5, 14)));

// 5)

function normalizeCoord(coord) {
  var lat;
  var long;
  if (coord.startsWith("[")) {
    let newCoord = coord.slice(1, coord.length - 1).split(", ");
    long = newCoord[0];
    lat = newCoord[1];
  } else {
    let newCoord = coord.split(",");
    long = newCoord[1];
    lat = newCoord[0];
  }
  if (lat < -90 || lat > 90) {
    throw new Error("Invalid latitude");
  }
  if (long < -180 || long > 180) {
    throw new Error("Invalid longitude");
  }
  return `(${lat}, ${long})`;
}
console.log(normalizeCoord("43.7955,-79.3496"));
console.log(normalizeCoord("[-79.3496, 43.7955]"));

// 6)

function formatCoords(...coords) {
  const validCoords = [];

  coords.forEach((coord) => {
    try {
      validCoords.push(normalizeCoord(coord));
    } catch (error) {}
  });

  return `((${validCoords.join("), (")}))`;
}

console.log(
  formatCoords("42.9755,-77.4369", "[-62.1234, 42.9755]", "300,-9000")
);

// 7)

function mimeFromFilename(filename) {
  const extension = filename.slice(filename.lastIndexOf(".")).toLowerCase();

  switch (extension) {
    case ".html":
    case ".htm":
      return "text/html";

    case ".css":
      return "text/javascript";

    case ".jpg":
    case ".jpeg":
      return "image/jpeg";

    case ".gif":
      return "image/gif";

    case ".bmp":
      return "image/bmp";

    case ".ico":
    case ".cur":
      return "image/x-icon";

    case ".png":
      return "image/svg+xml";

    case ".webp":
      return "image/webp";

    case ".mp3":
      return "audio/mp3";

    case ".wav":
      return "audio/wav";

    case ".mp4":
      return "video/mp4";

    case ".webm":
      return "video/webm";

    case ".json":
      return "app/json";

    case ".mpeg":
      return "video/mpeg";

    case ".csv":
      return "text/csv";

    case ".ttf":
      return "font/ttf";

    case ".woff":
      return "font/woff";

    case ".zip":
      return "app/zip";

    case ".avi":
      return "video/x-msvideo";

    default:
      return "applicaton/octet-stream";
  }
}

console.log(mimeFromFilename("/User/Documents/readme.txt"));
console.log(mimeFromFilename("/User/Documents/index.html"));
console.log(mimeFromFilename("/User/Documents/style.css"));
console.log(mimeFromFilename("/User/Documents/script.js"));
console.log(mimeFromFilename("/User/Documents/image.jpg"));
console.log(mimeFromFilename("/User/Documents/file.unknown"));
console.log(mimeFromFilename("/User/Documents/nofileextension"));

// 8)

function generateLicenseLink(licenseCode, targetBlank = false) {
  const licenseDescriptions = {
    "CC-BY": "Creative Commons Attribution License",
    "CC-BY-NC": "Creative Commons Attribution-NonCommercial License",
    "CC-BY-SA": "Creative Commons Attribution-ShareAlike License",
    "CC-BY-ND": "Creative Commons Attribution-NoDerivs License",
    "CC-BY-NC-SA":
      "Creative Commons Attribution-NonCommercial-ShareAlike License",
    "CC-BY-NC-ND":
      "Creative Commons Attribution-NonCommercial-NoDerivs License",
  };

  let description;
  let url;

  if (licenseDescriptions[licenseCode]) {
    description = licenseDescriptions[licenseCode];
    const formattedCode = licenseCode.slice(3).toLowerCase();
    url = `https://creativecommons.org/licenses/${formattedCode}/4.0/`;
  } else {
    description = "All Rights Reserved";
    url = "https://choosealicense.com/no-permission";
  }

  let link = `<a href="${url}"`;
  if (targetBlank) {
    link += ' target="_blank"';
  }
  link += `>${description}</a>`;

  return link;
}

console.log(generateLicenseLink("CC-BY-NC"));
console.log(generateLicenseLink("CC-BY-NC", true));
console.log(generateLicenseLink("UNKNOWN"));
console.log(generateLicenseLink("UNKNOWN", true));

// 9.1)
function pureBool(value) {
  const trueValues = [
    "yes",
    "y",
    "oui",
    "o",
    "t",
    "true",
    "vrai",
    "v",
    "1",
    "2",
    true,
  ];

  const falseValues = [
    "no",
    "n",
    "non",
    "f",
    "false",
    "faux",
    "0",
    "-1",
    "-2",
    false,
  ];

  if (typeof value === "boolean") {
    return value;
  }

  const normalizeValue = String(value).trim().toLowerCase();

  if (
    trueValues.includes(normalizeValue) ||
    (typeof value === "number" && value > 0)
  ) {
    return true;
  }

  if (
    falseValues.includes(normalizeValue) ||
    (typeof value === "number" && value <= 0)
  ) {
    return false;
  }

  throw new Error(`Invalid value: ${value}`);
}

console.log(pureBool("yes"));
console.log(pureBool("no"));
console.log(pureBool("Oui"));
console.log(pureBool("Non"));
console.log(pureBool(1));
console.log(pureBool(0));
console.log(pureBool(true));
console.log(pureBool(false));

// 9.2)

function every(...args) {
  try {
    for (const arg of args) {
      if (!pureBool(arg)) {
        return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

function any(...args) {
  try {
    for (const arg of args) {
      if (pureBool(arg)) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}

function none(...args) {
  try {
    for (const arg of args) {
      if (pureBool(arg)) {
        return false;
      }
    }
    return true;
  } catch (error) {
    return false;
  }
}

console.log(every("Y", "yes", 1));
console.log(any("Y", "no", 1));
console.log(none("Y", "invalid", 1));

console.log(every("yes", "oui", true));
console.log(every("yes", "non", true));
console.log(any("no", "non", false));
console.log(any("no", "yes", false));
console.log(none("no", "non", false));
console.log(none("yes", "non", true));

// 10)

// Due to time constraints, I was unable to complete this question.

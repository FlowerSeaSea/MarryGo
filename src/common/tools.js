
// 获取区间内随机整数，包含边界
export const randomNum = (lowerValue, upperValue) => {
     return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    }

/**
  获取随机头像配置
  [ face, nose, mouth, eyes, eyebrows, glasses, hair, accessories, details, beard ]
  [ 11, 11, 11, 11, 11, 11, 31, 11, 11, 11 ]
**/
export const getRandomAvatarConfig = () => {
  return [11, 11, 11, 11, 11, 11, 31, 11, 11, 11].map((num) => {
    return randomNum(0, num - 1);
  });
};

// 根据配置生成头像svg
export const generateNotionAvatar = async (config) => {
  const types = [
    "face",
    "nose",
    "mouth",
    "eyes",
    "eyebrows",
    "glasses",
    "hair",
    "accessories",
    "details",
    "beard",
  ];
  const groups = await Promise.all(
    config.map(async (idx, i) => {
      const svgRaw = (
        await require(`!!raw-loader!/public/avatarMaker/avatarMaker/preview/${types[i]}/${idx}.svg`)
      ).default;
      return `\n<g 
  id="notion-avatar-${types[i]}" 
  ${types[i] === "face" ? 'fill="#ffffff"' : ""}
 >\n
  ${svgRaw.replace(/<svg.*(?=>)>/, "").replace("</svg>", "")}
  \n</g>\n`;
    })
  );

  return `<svg viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
  <filter id="filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="linearRGB">
  <feMorphology operator="dilate" radius="20 20" in="SourceAlpha" result="morphology"/>
  <feFlood flood-color="#ffffff" flood-opacity="1" result="flood"/>
  <feComposite in="flood" in2="morphology" operator="in" result="composite"/>
  <feMerge result="merge">
  <feMergeNode in="composite" result="mergeNode"/>
  <feMergeNode in="SourceGraphic" result="mergeNode1"/>
  </feMerge>
  </filter>
  </defs>
  <g id="notion-avatar" filter="url(#filter)">
  ${groups.join("\n\n")}
  </g>
  </svg>`.trim();
};

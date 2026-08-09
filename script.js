// ====== SETUP: fill these in once you make your GitHub repo ======
const GH_USER = "telluricpiquant";
const GH_REPO = "babasite";
const GH_BRANCH = "main";
// ===================================================================

const RAW_BASE = `https://raw.githubusercontent.com/${GH_USER}/${GH_REPO}/${GH_BRANCH}/`;

// For MUSIC: filename (minus extension) becomes the title automatically.
// "Title -- caption text.mp3" splits into title + caption.
function parseMusicName(filename){
  const noExt = filename.replace(/\.[^/.]+$/, "");
  const parts = noExt.split("--");
  const title = parts[0].trim();
  const caption = parts.length > 1 ? parts.slice(1).join("--").trim() : "";
  return { title, caption };
}

// For PHOTOS/VIDEOS: no title by default (so random phone filenames
// like IMG_4821.jpg don't show up as a title). Only shows a title if you
// name the file "Title -- caption.jpg" (or just "Title --.jpg" for a
// title with no caption).
function parseMediaName(filename){
  const noExt = filename.replace(/\.[^/.]+$/, "");
  if(!noExt.includes("--")) return { title: "", caption: "" };
  const parts = noExt.split("--");
  const title = parts[0].trim();
  const caption = parts.slice(1).join("--").trim();
  return { title, caption };
}

async function listFolder(folder){
  const res = await fetch(`https://api.github.com/repos/${GH_USER}/${GH_REPO}/contents/${folder}?ref=${GH_BRANCH}`);
  if(!res.ok) return [];
  const data = await res.json();
  if(!Array.isArray(data)) return [];
  return data.filter(f => f.type === "file" && !f.name.startsWith("."));
}

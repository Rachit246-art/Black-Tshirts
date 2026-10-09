const fs = require('fs');
let c = fs.readFileSync('src/pages/Studio.tsx', 'utf8');
c = c.replace(/setLightboxPiece\(piece\)/g, 'navigate(`/studio/${piece.id}`)');
c = c.replace(/setLightboxPiece\(allGalleryPieces\[vaultActiveIndex\]\)/g, 'navigate(`/studio/${allGalleryPieces[vaultActiveIndex].id}`)');
c = c.replace(/setLightboxPiece\(allGalleryPieces\[nextIdx\]\)/g, 'navigate(`/studio/${allGalleryPieces[nextIdx].id}`)');
c = c.replace(/setLightboxPiece\(allGalleryPieces\[prevIdx\]\)/g, 'navigate(`/studio/${allGalleryPieces[prevIdx].id}`)');
fs.writeFileSync('src/pages/Studio.tsx', c);

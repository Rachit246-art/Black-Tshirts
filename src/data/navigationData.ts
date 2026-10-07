export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" }
];

export const footerData = {
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/jjettas2/" },
    { label: "X", href: "https://twitter.com/JJettas2" },
    { label: "YouTube", href: "https://www.youtube.com/@justinjefferson" },
    { label: "TikTok", href: "https://www.tiktok.com/@justinjefferson" }
  ],
  credits: [
    { label: "An Assemble Project", href: "https://www.instagram.com/atassemble/" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Site by LayerTwo", href: "https://layertwo.design" }
  ]
};

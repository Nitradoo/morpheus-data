export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Morpheus Dashboard",
  description: "Overview",
  mainNav: [
    {
      title: "Home",
      href: "/",
      target: "",
    },
    {
      title: "Docs",
      href: "https://github.com/MorpheusAIs/Docs",
      target: "_blank",
    },
    {
      title: "Twitter",
      href: "https://twitter.com/MorpheusAIs",
      target: "_blank",
    },
  ],
}

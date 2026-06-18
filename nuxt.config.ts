// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    baseURL: "/tupc/",
    head: {
      htmlAttrs: {
        lang: "zh-CN",
      },
      title: "Token 用量价格计算",
      meta: [
        {
          name: "description",
          content: "Token 用量价格计算",
        },
        {
          name: "keywords",
          content: "Token, 用量, 价格, 计算",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
    },
  },
});

import { g, auth, config } from "@grafbase/sdk";
//@ts-ignore
const User = g.model("User", {
  name: g.string().length({ min: 2, max: 20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.relation(() => Projects).list().optional(),
}).auth((rules)=> {
  rules.public().read()
});
//@ts-ignore
const Projects = g.model("Projects", {
  tittle: g.string().length({ min: 3 }),
  description: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.string(),
  category: g.string().search(),
  createbBy: g.relation(() => User)
}).auth((rules)=> {
  rules.public().read(),
  rules.private().create().delete().update()
})

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET')
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  }
});

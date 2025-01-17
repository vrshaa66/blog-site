import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
let blogs=[];


app.get("/",(req,res)=>{
    res.render("index.ejs");
  });

  app.get("/create",(req,res)=>{
    res.render("createblog.ejs")
  })
  
  app.post("/create", (req, res) => {
    const { title, content } = req.body;
    const id= Date.now();
    blogs.push({ id,title, content });
    res.redirect("/view");
});

app.get("/view",(req,res)=>{
    console.log(blogs);
    res.render("viewblog.ejs", {blogs});
  });

  app.get("/edit/:id", (req, res) => {
    const blog = blogs.find(b => b.id === Number(req.params.id)); 
    if (!blog) return res.status(404).send('Blog not found');
    res.render("editblog.ejs", { blog });
});


app.post("/edit/:id", (req, res) => {
  const { title, content } = req.body; 
  const blogIndex = blogs.findIndex(b => b.id === Number(req.params.id)); 
  if (blogIndex === -1) return res.status(404).send('Blog not found');

  blogs[blogIndex] = { ...blogs[blogIndex], title, content };
  res.redirect("/view");
});


app.post("/delete/:id", (req, res) => {
  const blogIndex = blogs.findIndex(b => b.id === Number(req.params.id)); 
  if (blogIndex === -1) return res.status(404).send('Blog not found');

  blogs.splice(blogIndex, 1);
  res.redirect("/view");
});


  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
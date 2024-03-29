require("dotenv").config();

//framework
const express=require("express");
const mongoose=require("mongoose");
//database
const database=require("./database/index");
//Models
const BookModel=require("./database/book");
const AuthorModel=require("./database/author");
const PublicationModel=require("./database/publication");
//installing express
const shapeAI =express();
//configuration
shapeAI.use(express.json());
//establise database connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>console.log("connection established!!!!!"));

/*
route
description    to get all books
access         public
parameters     none
method         get   
 */
shapeAI.get("/",async(req,res)=>{
    const getAllBooks=await BookModel.find();
    return res.json({books: getAllBooks});
});

/*
route          is
description    to get specific books
access         public
parameters     ISBN
method         get   
 */
shapeAI.get("/is/:isbn",async (req,res)=>{
    const getSpecificBook=await BookModel.findOne({ISBN: req.params.isbn});
            if(!getSpecificBook)
            {
                return res.json({error: `No book found for the ISBN of ${req.params.isbn}`,
            });
            }
            return res.json({book: getSpecificBook});
})

/*
route          /category
description    to get specific books based on category
access         public
parameters     category
method         get   
 */
shapeAI.get("/c/:category",async (req,res)=>{
    const getSpecificBooks=await BookModel.findOne({category: req.params.category,});
            if(!getSpecificBooks)
            {
                return res.json({error: `No book found for the ISBN of ${req.params.category}`,
            });
            }
            return res.json({book: getSpecificBooks});
});
/*
route          /author
description    to get specific books based on authors
access         public
parameters     authors
method         get   
 */
shapeAI.get("/authors/:authorId",(req,res)=>{
    const getSpecificbooks=database.authors.filter((author)=>
    author.id===parseInt(req.params.authorId)
    );
    if(getSpecificbooks===0)
    {
        return res.json({error:`no author found for the book ${parseInt(req.params.authorId)}`,
    });
    }
    return res.json({authors:getSpecificbooks});
});


/*
route          /author
description    to get all authors
access         public
parameters     none
method         get   
 */
shapeAI.get("/author",async(require,res)=>{
    const getAllAuthors=await AuthorModel.find();
    return res.json({authors:getAllAuthors});
});

/*
route          /author
description    to get specific authors
access         public
parameters     none
method         get   
 */
shapeAI.get("/author/:NAME",(req,res)=>{
    const getSpecificauthor=database.authors.filter(
        (author)=>author.name===req.params.NAME
            );
            if(getSpecificauthor.length===0)
            {
                return res.json({error: `No book found for the name of ${req.params.NAME}`,
            });
            }
            return res.json({authors: getSpecificauthor});
})

/*
route          /authors
description    to get all authors based on abook
access         public
parameters     isbn
method         get   
 */

shapeAI.get("/authors/:isbn",(require,res)=>{
    const getSpecificauthors=database.authors.filter((author)=>
    author.books.includes(require.params.isbn)
    );
    if(getSpecificauthors===0)
    {
        return res.json({error:`no author found for the book ${req.params.isbn}`,
    });
    }
    return res.json({authors:getSpecificauthors});
});


/*
route          /publications
description    to get all publications
access         public
parameters     none
method         get   
 */
shapeAI.get("/publications",async(req,res)=>{
    const getAllPublications=await PublicationModel.find();
    return res.json({publications: getAllPublications});
});

/*
route          /s/publication
description    to get specific publication
access         public
parameters     publication
method         get   
 */
shapeAI.get("/s/publications/:NAME",(req,res)=>{
    const getSpecificpublication=database.publications.filter(
        (publication)=>publication.name===req.params.NAME
            );
            if(getSpecificpublication.length===0)
            {
                return res.json({error: `No book found for the publication of ${req.params.NAME}`,
            });
            }
            return res.json({authors: getSpecificpublication});
});


/*
route          /b/publications
description    to get all publications based on abook
access         public
parameters     isbn
method         get   
 */

shapeAI.get("/b/publications/:isbn",(require,res)=>{
    const getSpecificpublications=database.publications.filter((publication)=>
    publication.books.includes(require.params.isbn)
    );
    if(getSpecificpublications===0)
    {
        return res.json({error:`no author found for the book ${req.params.isbn}`,
    });
    }
    return res.json({publications:getSpecificpublications});
})

/*
route          /book/new
description    add new book
access         public
parameters     isbn
method         post  
 */
shapeAI.post("/book/new",async (req,res)=>{
     const {newBook}=req.body;
     const addNewBook=BookModel.create(newBook);
     return res.json({books:addNewBook,message:"book was added!"});
});

/*
route          /author/new
description    add new author
access         public
parameters     none
method         post  
 */
shapeAI.post("/author/new",(req,res)=>{
    const{newAuthor}=req.body;
    const addNewAuthor=AuthorModel.create(newAuthor);
    return res.json({authors:addNewAuthor,message:"author was added!"});
});

/*
route          /author/new
description    add new author
access         public
parameters     none
method         post  
 */
shapeAI.post("/publication/new",(req,res)=>{
    const{newPublication}=req.body;
    database.publications.push(newPublication);
    return res.json({publications:database.publications,message:"publication was added!"});
});

/*
route          /book/update/:isbn
description    update new book
access         public
parameters     isbn
method         put 
 */
//forEach directly modifies the array(use it here)
//map =>new array => replace
shapeAI.put("/book/update/:isbn",(req,res)=>{
    
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn) {
        book.title=req.body.bookTitle;
        return;
    }
    });
    return res.json({books:database.books});
    
});

/*
route          /book/author/update/:isbn
description    update /add new author
access         public
parameters     isbn
method         put 
 */
shapeAI.put("/book/author/update/:isbn", (req, res) => {
    // update the book database
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn)
        return book.authors.push(req.body.newAuthor);
    });
    // update the author database
    database.authors.forEach((author) => {
      if (author.id === req.body.newAuthor)
        return author.books.push(req.params.isbn);
    });
    return res.json({
      books: database.books,
      authors: database.authors,
      message: "New author was added.",
    });
  });
  
  /*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put("/publication/update/book/:isbn", (req, res) => {
    // update the publication database
    database.publications.forEach((publication) => {
      if (publication.id === req.body.pubId) {
        return publication.books.push(req.params.isbn);
      }
    });
    // update the book database
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        book.publication = req.body.pubId;
        return;
      }
    });
    return res.json({
      books: database.books,
      publications: database.publications,
      message: "Successfully updated publication",
    });
  });
 /*
route          /book/delete/:isbn
description    delete a book
access         public
parameters     isbn
method         DELETE
 */
 shapeAI.delete("/book/delete/:isbn", (req,res)=>{
     const updatedBookDatabase=database.books.filter(
         (book)=> book.ISBN!== req.params.isbn);
         database.books=updatedBookDatabase;
         return res.json({books: database.books});
 });
  

  /*
route          /book/delete/author/:isbn
description    delete a author from a book
access         public
parameters     isbn
method         DELETE
 */

 shapeAI.delete("/book/delete/author/:isbn/:authorId", (req,res)=>{
     //update book database 
     database.books.forEach((book)=>{
         if(book.ISBN===req.params.isbn){
             const newAuthorList=book.authors.filter((author)=>author!== parseInt(req.params.authorId)
             );
             book.authors=newAuthorList;
             return; 
         }
     });
     //update author database
     database.authors.forEach((author)=>{
         if(author.id===parseInt(req.params.authorId)){
             const newBooksList=author.books.filter((book)=>book!==req.params.isbn
             );
             author.books=newBooksList;
             return;
         }
     });
     return res.json({book:database.books,author:database.authors,message:"author was deleted!!!"})
 });

 /*
route          /author/delete/:authorId
description    delete a author
access         public
parameters     authorId
method         DELETE
 */
 shapeAI.delete("/author/delete/:authorId", (req,res)=>{
     const updatedauthorDatabase=database.authors.filter(
         (author)=> author.id!== parseInt(req.params.authorId));
         database.authors=updatedauthorDatabase;
         return res.json({authors: database.authors});
 });

 /*
route          /publication/delete/:pubId
description    delete a publication
access         public
parameters     pubId
method         DELETE
 */
  shapeAI.delete("/publication/delete/:pubId", (req,res)=>{
     const updatedPublicationDatabase=database.publications.filter(
         (pub)=> pub.id!== parseInt(req.params.pubId));
         database.publications=updatedPublicationDatabase;
         return res.json({publications: database.publications});
 });

 /*
route          /publication/delete/book
description    delete a book from publication
access         public
parameters     isbn,pubId
method         DELETE
 */
 shapeAI.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{
    //update publication
    database.publications.forEach((publication)=>{
        if(publication.id===parseInt(req.params.pubId)){
            const newBooksList = publication.books.filter(
                (book)=> book!==req.params.isbn
            );
            publication.books=newBooksList;
            return;

        }
    });
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publications=0;
            return;
        }
    });
    return res.json({books:database.books,publications:database.publications,});
 });
shapeAI.listen(3000,()=>console.log("Server is running"));
//mongoDB is schemaless
//mongoose helps you with validation ,relationship with other data.
//mongoose model
//model->document model of mongoDB
//Schema->model->use them
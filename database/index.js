let books=[{
    ISBN:"12345ONE",
    title:"Getting started with MERN",
    authors:[1,2,3],
    language:"en",
    pubDate:"2021-07-07",
    numOfPage:225,
    category:["fiction","programming","tech","web d"],
    publications:1
},
{
    ISBN:"12345TWO",
    title:"Getting started with Python",
    authors:[1,2,3],
    language:"en",
    pubDate:"2021-07-07",
    numOfPage:225,
    category:["fiction","tech","web d"],
    publications:1
},
];

const authors=[
    {
       id:1,
       name:"Jagrati",
       books:["12345ONE"]
},
{
    id:2,
    name:"Arpita",
    books:["12345ONE"]

}];

const publications=[
    {
        id:1,
        name:"Chakra",
        books:["12345ONE"]
    },
    {
        id: 2,
        name: "Vickie Publications",
        books: [],
      },
];
module.exports={books,authors,publications};

export default (dependencies) => {
    const searchcontroller = (req,res) => {
        const { query } = req;
        const searchQuery = query.value;
  
    
        console.log("Search Query:", searchQuery);
  }
  return searchcontroller
 }
MyComponents.book = React.createClass({
 render: function(){
   return (
     
     <div> </div>
     
   );
 }
});

class BookView extends React.Component {
 render(){
   var book = this.props.books.map(function(u, i){
     return <MyComponents.book book={u} key={i} />
   })

     return(
      
              <div>
                {book}
            </div>
            
          
       
     );
 }
}

MyComponents.BookView = BookView
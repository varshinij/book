class App extends React.Component {
  render(){
    return <div>

      <MyComponents.NavBar actions={this.props.actions}/>
      <MyComponents.BookView books={this.props.data.books}/>




    </div>

  }
}

MyComponents.App = App

var App = React.createClass({
   getInitialState : function () {
      return { name : '' };
   },
   
   render : function () {
      return (
         <div>
            <h1>Hello, {this.state.name}</h1>
            <input type="text" onChange={this.onChange} value={this.state.name}/>
         </div>
      );
   },
   
   componentDidMount : function () {
      this.getModel();
   },
   
   getModel : function () {
      var xhr = new XMLHttpRequest();
      xhr.open( 'GET', this.props.model );
      xhr.onload = function () {
         this.setState( JSON.parse( xhr.responseText ) );
      }.bind( this );
      xhr.send();
   },
   
   onChange : function ( e ) {
      this.setState({
         name : e.target.value
      });
   }
});

//ReactDOM.render( <App model={'/data'}/>, document.getElementById( 'app' ) );

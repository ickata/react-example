var express = require( 'express' );
var server  = express();
var fs      = require( 'fs' );

var PORT    = 3000;

// Serve static files
[
   'css',
   'Images',
   'Scripts',
   'JSX'
].forEach( function ( dir ) {
   this.use( '/' + dir, express.static( './web/' + dir ) );
}, server );

// Getting data
server.get( '/data', function ( request, response ) {
   response.end( fs.readFileSync( './data.json' ) );
});

// Process *.html files
server.use( '/', function ( request, response ) {
   var filepath = request.url == '/' ? './web/index.html' : './web' + request.url;
   fs.readFile( filepath, { encoding : 'utf-8' }, function ( error, content ) {
      response.end( content || 'Content not found.' );
   });
});

function extractJSX( html, callback ) {
   var jsx = [];
   (html.match( /<script type="text\/babel".+<\/script>/gi ) || []).forEach( function ( script ) {
      var match = script.match( /<script( src="([^"]+)")? type="text\/babel"( src="([^"]+)")?>(.*?)<\/script>/i );
      var src = match[2] || match[4];
      var code = match[5];
      jsx.push( src ? fs.readFileSync( './web' + src, { encoding : 'utf-8' } ) : code );
   });
   return ReactTools.transform( jsx.join('') );
}

// Start the server
server.listen( PORT );

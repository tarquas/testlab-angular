var TestLab = require( 'testlab' );


//##### Define the PhantomJS client injection patches

var clientFormFillFunctionPatch = TestLab.unmountFunction( function() {
  
    if ( window.angular && angular.element ) {
        var check = true;
        
        switch ( element.tagName ) {
          
            case 'INPUT': switch( element.type.toUpperCase() ) {
              
                case 'CHECKBOX':
                case 'RADIO':
                    check = false;
            }
        }
        
        if ( check ) try {
            angular.element( element ).change();
        } catch ( dummy ) { }
    }
} );


//##### Apply the patches

TestLab
    .WebPage
    .clientFormFillFunctionPatches
    .addApplyChangesPatch(
        clientFormFillFunctionPatch
    );


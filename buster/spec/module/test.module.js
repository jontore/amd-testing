/* 
Tests using the run() syntax 
TODO find reliable way to test that ALL tests were run, none skipped
TODO figure out why a single run() for multiple describes doesn't work
*/


buster.spec.expose();
require.config({
  baseUrl: 'js/' //MUST be the same as the modules you're testing
});

describe('run syntax with no dependencies', function(run) {
  require([], function() {
    run(function() {
      it('should work', function() {
        expect(true).toEqual(true);
      });
    });
  });
});

describe('single dependency', function(run) {
  require(['module-one'], function(moduleOne) {
    run(function() {
      it('should work', function() {
        expect(moduleOne.name).toEqual("Module One");
      });
    });
  });
});

describe('multiple dependencies', function(run) {
  require(['module-one', 'module-three'], function(moduleOne, moduleThree) {
    run(function() {
      it('should work', function() {
        expect(moduleOne.name).toEqual("Module One");
        expect(moduleThree.name).toEqual("Module Three");
      });
    });
  });
});

/* module-two depends on module-one */
describe('module with own dependency', function(run) {
  require(['module-two'], function(moduleTwo) {
    run(function() {
      it('should work', function() {
        expect(moduleTwo.name).toEqual("Module Two");
        expect(moduleTwo.dependencies[0].name).toEqual("Module One");
      });
    });
  });
});

describe('module depending on a submodule using relative path', function(run) {
  require(['level1/level1_module'], function(level1Module) {
    run(function() {
      it('should work', function() {
        expect(level1Module.name).toEqual("Module level one");
        expect(level1Module.dependencies[0].name).toEqual("Module two level two");
      });
    });
  });
});

/* !! TEST BEING OCASSIONALLY SKIPPED FOR SOME REASON !! */
describe('requirejs plugins', function(run) {
  require.config({
    paths: {
      'wrap': 'lib/wrap',
      'text': 'lib/text'
    },
    wrapJS: {
      'pizza': {
        deps: ['cheese'],
        attach: 'pizza'
      }
    }
  });
  require(['wrap!pizza'], function(pizza) {
    run(function() {
      it('should work', function() {
        expect(true).toEqual(true); //sometimes skipped, sometimes not skipped
        expect(pizza.ingredients[0].name).toEqual("cheese");
      });
    });
  });
});

describe('nested requires', function(run) {
  require(['require'], function(require) {
    require(['module-one'], function(moduleOne) {
      run(function(){
        it('should work', function() {
          expect(moduleOne.name).toEqual("Module One");
        });
      });
    });
  })
});
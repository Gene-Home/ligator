'use strict';

describe('Service: geneHiveService', function () {
  var SignUpService;
  var httpBackend;
  var rootScope;
  beforeEach(function() {
      module('ligatorApp');
  });

  beforeEach(inject(function (_SignUpService_,$rootScope,$httpBackend) {
    SignUpService = _SignUpService_;
    httpBackend = $httpBackend;
    rootScope = $rootScope;
  }));


  it('should create a meta-object when i pass it some stuff 


    ')
  it('should return an error (5) when newUser param has no username field', function(){
      var newUser = {};
      newUser.userName = "myname";
      newUser.email = "email";
      var done = false
      SignUpService.signUp(newUser,false).then(
          function(response){
              expect(scope.text).toBe('Hello World!');
          },function(reason){ 
              expect(reason[0]).toBe(geneHiveServices.ERROR.BAD_USER_OBJECT);
              expect(reason[1]).toBe(geneHiveServices.BAD_USER_OBJECT);
              done = true
          }
      );
      try{
        httpBackend.flush();
      }catch(error){
        alert("I flushed and made and exception")
        // I'm expecting an exception if an http call does not get made
        // thats ok because it may not
      }
      waitsFor(function() { return done; });
  });
  it('should return an error (5) when newUser param has no username field', function(){
      var newUser = {};
      var done = false
      SignUpService.signUp(newUser,false).then(
          function(response){
              expect(scope.text).toBe('Hello World!');
          },function(reason){ 
              expect(reason[0]).toBe(geneHiveServices.ERROR.BAD_USER_OBJECT);
              expect(reason[1]).toBeDefined();
              done = true;
          }
      );
      try{
        httpBackend.flush();
      }catch(error){
        alert("I flushed and made and exception")
        // I'm expecting an exception if an http call does not get made
        // thats ok because it may not
      }
      waitsFor(function() { return done; });
  });
});



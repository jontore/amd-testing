define(['module-one', './level1/level1_module'], function(moduleOne, level1Module){
  console.error('level1Module', level1Module);
  return {
    name: "Module Two",
    dependencies: [moduleOne]
  }
});
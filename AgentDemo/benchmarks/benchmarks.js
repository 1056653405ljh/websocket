

// // Buffer With copies of the objectBSON
// var data = new Buffer(objectBSON.length * numberOfObjects);
// var index = 0;
// 
// // Copy the buffer 1000 times to create a strea m of objects
// for(var i = 0; i < numberOfObjects; i++) {
//   // Copy data
//   objectBSON.copy(data, index);
//   // Adjust index
//   index = index + objectBSON.length;
// }
// 
// // console.log("-----------------------------------------------------------------------------------")
// // console.dir(objectBSON)
// 
// var x, start, end, j
// var objectBSON, objectJSON
// 
// // Allocate the return array (avoid concatinating everything)
// var results = new Array(numberOfObjects);
// 
// console.log(COUNT + "x (objectBSON = BSON.serialize(object))")
// start = new Date
// 
// // var objects = BSON.deserializeStream(data, 0, numberOfObjects);
// // console.log("----------------------------------------------------------------------------------- 0")
// // var objects = BSON.deserialize(data);
// // console.log("----------------------------------------------------------------------------------- 1")
// // console.dir(objects)
// 
// for (j=COUNT; --j>=0; ) {  
//   var nextIndex = BSON.deserializeStream(data, 0, numberOfObjects, results, 0);
// }
// 
// end = new Date
// var opsprsecond = COUNT / ((end - start)/1000);
// console.log("bson size (bytes): ", objectBSON.length);
// console.log("time = ", end - start, "ms -", COUNT / ((end - start)/1000), " ops/sec");
// console.log("MB/s = " + ((opsprsecond*objectBSON.length)/1024));
// 
// // console.dir(nextIndex)
// // console.dir(results)



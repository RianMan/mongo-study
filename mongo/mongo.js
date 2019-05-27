let db = connect('school');

let startTime = Date.now();
let arr = [];
for (let index = 0; index < 100; index++) {
    arr.push({_id:index,name:"语文"+index});
    // db.course.insert({_id:index,name:"语文"+index})
}
db.course.insert(arr)

print((Date.now() - startTime)/1000)
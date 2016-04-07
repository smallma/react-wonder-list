import ParseReact from 'parse-react';

export default {
  addItem(addData) {
    console.log('Actions - addItem');
    console.log(addData);
    return ParseReact.Mutation.Create('items', addData).dispatch();
  },
  deleteItem(deleteData) {
    return ParseReact.Mutation.Destroy('items', deleteData).dispatch();
  },
  addImage(itemObj, imageObj) {
    return ParseReact.Mutation.Set(itemObj, {'image': imageObj}).dispatch();
  },
  addRelationClass(itemObj, classObj) {
    return ParseReact.Mutation.Set(itemObj, {'classId': classObj}).dispatch();
  }
}

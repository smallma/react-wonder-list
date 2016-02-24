import ParseReact from 'parse-react';

export default {
  addPost(addItem) {
    return ParseReact.Mutation.Create("items", addItem).dispatch();
  }
}

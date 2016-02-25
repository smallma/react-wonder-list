import ParseReact from 'parse-react';

export default {
  addItem(addItem) {
    return ParseReact.Mutation.Create("items", addItem).dispatch();
  }
}

sw = require('remove-stopwords');

module.exports = {
  simplify(text) {
    const regex = /[\s,\.;:\(\)\-´]/;
    //const regex2 = /[s,.;:()-'+]/g;
    const diacritics = /[\u0300-\u036f]/g; ///[u0300-u036f]/;
    //capitalização, normalização e remoção de stopwords(palavras vazias)
    oldString = text.split(' ');
    const newString = sw.removeStopwords(oldString, 'pt');
    text = newString
      .toString()
      .toUpperCase()
      .normalize('NFD')
      .replace(diacritics, '');
    //separando e removendo repetidos
    const arr = text
      .split(regex)
      .filter((item, pos, self) => self.indexOf(item) == pos);
    console.log(arr);
    //removendo nulls, undefineds e strings vazias
    return arr.filter((item) => item);
  },
};

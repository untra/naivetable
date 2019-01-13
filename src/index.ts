interface TypedTrie<T> {
  value: T;
}

const numberCompareOperation = (x: number, y: number) => x - y;
const stringCompareOperation = (x: string, y: string) => x.localeCompare(y);

function insert<T>(trie: TypedTrie<T>, ...values: T[]): TypedTrie<T> {
  return trie;
}

function remove<T>(trie: TypedTrie<T>, ...values: T[]): TypedTrie<T> {
  return trie;
}

function balance<T>(trie: TypedTrie<T>, ...values: T[]): TypedTrie<T> {
  return trie;
}

function height<T>(trie: TypedTrie<T>): number {
  return 0;
}

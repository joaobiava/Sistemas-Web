import Pessoa from "./Pessoa";

var p1:Pessoa = new Pessoa("jao", 42342344);
var p2:Pessoa = new Pessoa("macaco", 3245);

console.log(p1.nome);
console.log(p2.telefone);
p2.telefone = 234;
console.log(p2.telefone);
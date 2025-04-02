import Cliente from "./Cliente";
import Endereco from "./Endereco";
import Produto from "./Produto";
import Telefone from "./Telefone";
import Venda from "./Venda";

var endereco = new Endereco("macaco", 32, "macaco aranha", "MC");
var telefones = [new Telefone("43", 9834762, "celular"), new Telefone("42", 123456, "fixo")];
var produtos = [new Produto(12345, "sabao macaco", 12.90), new Produto(54321, "mexerica", 9.90)];
var cliente = new Cliente("desaparecido", 123456789, 27032000, "M", endereco, telefones);
var venda = new Venda(123, 11072005, cliente, produtos);

console.log(endereco)
console.log(telefones)
console.log(produtos)
console.log(cliente)
console.log(venda)
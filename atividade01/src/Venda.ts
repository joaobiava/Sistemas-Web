import Cliente from "./Cliente";
import Produto from "./Produto";

export default class Venda{
    private _codigo:number;
    private _data:number;
    private _cliente!:Cliente;
    private _produto!:Produto[];

    constructor(codigo:number, data:number, cliente:Cliente, produto:Produto[]){
        this._codigo = codigo;
        this._data = data;
    }

    public get codigo():number{
        return this._codigo;
    }
    public get data():number{
        return this._data;
    }
    public get cliente():Cliente{
        return this._cliente;
    }
    public get produto():Produto[]{
        return this._produto;
    }

    public set codigo(codigo:number){
        this._codigo = codigo;
    }
    public set data(data:number){
        this._data = data;
    }
    public set cliente(cliente:Cliente){
        this._cliente = cliente;
    }
    public set produto(produto:Produto[]){
        this._produto = produto;
    }

    public calcularTotal(produto:Produto[]):number{
        var valorTotal:number = 0
        for (let index = 0; index < produto.length; index++) {
            valorTotal += produto[index].valor;
        }
        return valorTotal;
    }
}
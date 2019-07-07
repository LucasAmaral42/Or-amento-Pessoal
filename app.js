class Despesa {
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){
        for (let i in this) {
            if (this[i].value === null || this[i] === undefined || this[i] === '') {
                return false;
            }
            else{
                return true;
            }
        }
    }
}

class Bd {

    constructor(){
        let id = localStorage.getItem('id');

        if(id === null){
            localStorage.setItem('id', 0);
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(d){
        let despesa = JSON.stringify(d);
        let id = this.getProximoId();

        localStorage.setItem(id, JSON.stringify(d));

        localStorage.setItem('id', id);
    }

    recuperarTodosRegistros(){

        //Array de despesas
        let despesas = Array();

        let id = localStorage.getItem('id');
        for (; 0 < id; id--) {
            let despesa = JSON.parse(localStorage.getItem(id));
            
            if (despesa !== null) {
                despesa.id = id;
                despesas.push(despesa);
            }
        }
        return despesas;
    }

    pesquisar(despesa){
        let despesasFiltradas = Array();
        despesasFiltradas = this.recuperarTodosRegistros();
        
        // ano
        if (despesa.ano != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        // mes
        if (despesa.mes != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        // dia
        if (despesa.dia != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        // tipo
        if (despesa.tipo != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        // descrição
        if (despesa.descricao != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        // valor
        if (despesa.valor != "") {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas;
    }
}

let bd = new Bd();

function cadastrarDespesa() {
    
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');
    
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    );

    if(despesa.validarDados()){
        bd.gravar(despesa);
        alert("Dados salvos com sucesso");
        //Sucesso
        ano.value = "";
        mes.value = "";
        dia.value = null;
        tipo.value = "";
        descricao.value = null;
        valor.value = null;
    }
    else{
        alert("Preencha todos os dados!");
        //Erro
    }
}

function limparDespesa() {
    ano.value = "";
    mes.value = "";
    dia.value = null;
    tipo.value = "";
    descricao.value = null;
    valor.value = null;
}

function carregaListaDespesas(despesas = Array()){

    if (despesas.length == 0) {
        despesas = bd.recuperarTodosRegistros();
    }
    
    let listaDespesas = document.getElementById('lista-despesas');
    listaDespesas.innerHTML = '';

    /*
        <tr>
            <td>00/00/0000</td>
            <td>Alimentação</td>
            <td>Compras do mês</td>
            <td>444.75</td>
        </tr>
    */

    //Array despesas de forma dinâmica.

    despesas.forEach(function(d){


        //Criando <tr>
        let linha = listaDespesas.insertRow();

        //Criando <td>
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
        switch (d.tipo) {
            case '1':
                d.tipo = 'Alimentação'
                break;
            case '2':
                d.tipo = 'Educação'
                break;
            case '3':
                d.tipo = 'Lazer'
                break;
            case '4':
                d.tipo = 'Saúde'
                break;
            case '5':
                d.tipo = 'Transporte'
                break;

        }
        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;

        //criar o botao

        let btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class = "fas fa-times"></i>'
        btn.onclick = function(){ 

        }
        linha.insertCell(4).append(btn);
    })
}

function pesquisarDespesas(){
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

    let despesas = bd.pesquisar(despesa);

    carregaListaDespesas(despesas);
}
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { DiasDaSemana} from './../dias-da-semana.enum';
import { Produto} from './../Objetos/Produto';
import { ProdutoService} from './../service/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  id: any
  produto: Produto = new Produto(0,'', 0)
  textoBotao: string = 'Salvar'

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private prodService: ProdutoService

 
   ) { }

  ngOnInit(): void {

    this.activatedroute.params.subscribe(parametros =>{
      if(parametros['id']){
        this.textoBotao = 'Editar'
        this.id = parametros['id']
        this.prodService.buscarItemId(this.id).subscribe(prod=>{
            this.produto = prod
        })   
              
        console.log(`Id enviado: ${this.id}` )
      } 
    })
  }

  adicionar = () =>{  
    if(this.textoBotao == 'Salvar') {         
      this.prodService.adicionar(this.produto).subscribe(
        sucess =>  this.navegar('home'),
        error => console.log("Deu ruim"),
        () => console.log("Requisiçao completa"))
        this.router.navigate(['home'])
     }else{
       this.editar()
     }
    }
    editar = () =>{  
      this.prodService.editar(this.produto).subscribe(
        sucess => this.navegar('home'), 
        error => console.log("Deu ruim"),
        () => console.log("Requisiçao completa"))
        
        
      }  
    navegar = (rota: any) =>{
      this.router.navigate([rota])

    }
    
  
  }





/* 
 * Fichero:   Grafo.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Clase para tratar de representar y obtener la entrada del grafo del que se parte
 *           para construir el circuito.
 * 
 * Creado el 8 de diciembre de 2017, 10:50
 */

#include "Grafo.h"

Grafo::Grafo() {
}

Grafo::Grafo(const Grafo& orig) {
    ident = orig.getIdent();
    nodos = orig.getNodos();
    aristas = orig.getAristas();
}

Grafo::~Grafo() {
}

void Grafo::addArista(Arista valor){
    aristas.push_back(valor);
}

void Grafo::addNodo(Nodo valor){
    nodos.push_back(valor);
}

/* Funciones de acceso */
string Grafo::getIdent() const{
    return ident;
}

void Grafo::setIdent(string valor){
    ident = valor;
}

vector<Nodo> Grafo::getNodos() const{
    return nodos;
}

vector<Arista> Grafo::getAristas() const{
    return aristas;
}
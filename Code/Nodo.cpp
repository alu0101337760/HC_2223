/* 
 * Fichero:   Nodo.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Representar los nodos de los diferentes grafos.
 * 
 * Creado el 8 de diciembre de 2017, 11:09
 */

#include "Nodo.h"

Nodo::Nodo() {
}

Nodo::Nodo(const Nodo& orig) {
    id = orig.getId();
}

Nodo::~Nodo() {
}

/* Funciones de acceso */
string Nodo::getId() const{
    return id;
}

void Nodo::setId(string valor){
    id = valor;
}

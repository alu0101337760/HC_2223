/* 
 * Fichero:   Gadget.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Clase para la repserentacion de los subgrafos del circuito hamiltoniano
 * 
 * Creado el 8 de diciembre de 2017, 12:54
 */

#include "Gadget.h"

Gadget::Gadget(string nombre) {
    ident = nombre;
    generarNodos(nombre);
    extLibres.push_back(0);
    extLibres.push_back(5);
    extLibres.push_back(6);
    extLibres.push_back(11);
    generarAristas();
}

Gadget::Gadget(const Gadget& orig) {
    ident = orig.getIdent();
    nodos = orig.getNodos();
    aristas = orig.getAristas();
    extLibres = orig.getExtLibres();
    extOcupados = orig.getExtOcupados();
}

Gadget::~Gadget() {
}

void Gadget::generarNodos(string nombre){
    for(int i = 0;  i < 12;  i++){
        Nodo aux;
        string nodoId = nombre + "_" + to_string(i+1);
        aux.setId(nodoId);
        addNodo(aux);
    }
}

void Gadget::generarAristas(){
    /* Aristas superiores */
    for (int i = 0; i < 5; i++){
        Arista aux; 
        aux.setNodoA(getNodos()[i]);
        aux.setNodoB(getNodos()[i+1]);
        addArista(aux);
    }
    
    /* Aristas inferiores */
    for (int i = 6; i < 11; i++){
        Arista aux;
        aux.setNodoA(getNodos()[i]);
        aux.setNodoB(getNodos()[i+1]);
        addArista(aux);
    }
    
    /* Aristas cruzadas */
    Arista aux;
    aux.setNodoA(getNodos()[0]);
    aux.setNodoB(getNodos()[8]);
    addArista(aux);
    aux.setNodoA(getNodos()[2]);
    aux.setNodoB(getNodos()[6]);
    addArista(aux);
    aux.setNodoA(getNodos()[3]);
    aux.setNodoB(getNodos()[11]);
    addArista(aux);
    aux.setNodoA(getNodos()[5]);
    aux.setNodoB(getNodos()[9]);
    addArista(aux);
}

int Gadget::conectGadgets(){
    int indice = extLibres[0];
    extOcupados.push_back(indice);
    extLibres.erase(extLibres.begin());
    return indice; 
}

/* Funciones de acceso */
void Gadget::setExtLibres(vector<int> valor){
    extLibres = valor;
}

vector<int> Gadget::getExtLibres() const{
    return extLibres;
}

void Gadget::setExtOcupados(vector<int> valor){
    extOcupados = valor;
}

vector<int> Gadget::getExtOcupados() const{
    return extOcupados;
}
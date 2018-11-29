/* 
 * Fichero:   VC.cpp
 * Autor: Cristina Garrido Amador
 * Objetivo: Representacion de una entrada del vertex cover
 * 
 * Creado el 8 de diciembre de 2017, 15:59
 */

#include "VC.h"

VC::VC() {
    ident = "VC";
}

VC::VC(const VC& orig) {
    ident = orig.getIdent();
    nodos = orig.getNodos();
    aristas = orig.getAristas();
}

VC::~VC() {
}

void VC::cargarVC(string nomFichero){
    char cover[256];
    string entrada;
    
    ifstream vc(nomFichero);
    /*Lineas para avanzar en la lectura del fichero*/
    vc.getline(cover,256);
    entrada = cover;
    int numNodos = entrada[0] - '0'; /* Char a entero */ 
    generarNodos(numNodos);   
    
    vc.getline(cover,256);
    entrada = cover;
    for(int i = 0; i < entrada.size()-1; i++){
        int indice = entrada[i] - '1'; 
        addNodCubri(getNodos()[indice]);
        i++;
    }
    
    while(!vc.eof()){
        vc.getline(cover,256);
        entrada = cover;
        Nodo a = getNodos()[entrada[0] - '1'];
        Nodo b = getNodos()[entrada[2] - '1'];
        Arista aux;
        aux.setNodoA(a);
        aux.setNodoB(b);
        addArista(aux);
    }

    vc.close();
}

void VC::generarNodos(int numNodos){
    for(int i = 0; i < numNodos;  i++){
        Nodo aux;
        string nomNodo = "vc_" + to_string(i+1);
        aux.setId(nomNodo);
        addNodo(aux);
    }
}

void VC::addNodCubri(Nodo valor){
    cubrimiento.push_back(valor);
}

/* Funcion para comprobar si un nodo es parte del cubrimiento o no */
bool VC::enCubrimiento(Nodo valor){
    for(int i = 0;  i < getCubrimiento().size(); i++){
        if(getCubrimiento()[i].getId() == valor.getId()){
            return true;
        }
    }
    return false;
}

string VC::imprimir(){
    string salida = "";
    salida = salida + "Numero de nodos: " + to_string(getNodos().size()) + "\nCubrimiento: ";
    for(int i = 0; i < getCubrimiento().size(); i++){
        salida =  salida + getCubrimiento()[i].getId() + " ";
    }
    salida = salida + "\nAristas:\n";
    for(int i = 0; i < getAristas().size(); i++){
        salida = salida + getAristas()[i].imprimir() + "\n";
    }
    return salida;
}

/* Funciones de acceso */
void VC::setCubrimiento(vector<Nodo> valor){
    cubrimiento = valor;
}

vector<Nodo> VC::getCubrimiento(){
    return cubrimiento;
}

